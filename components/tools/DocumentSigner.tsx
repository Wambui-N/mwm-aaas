"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { PDFDocument } from "pdf-lib";
import {
  Upload,
  Download,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  FileText,
  Check,
  X,
  Loader2,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4;
type SigMode = "draw" | "type";
interface PageDim {
  width: number;
  height: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PREVIEW_MAX_W = 580;

const SIG_FONTS: { label: string; value: string }[] = [
  { label: "Elegant", value: "Georgia, 'Times New Roman', serif" },
  { label: "Script", value: "'Comic Sans MS', 'Brush Script MT', cursive" },
  { label: "Modern", value: "'Helvetica Neue', Arial, sans-serif" },
];

const STEPS = ["Upload", "Sign", "Place", "Download"] as const;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCanvasPos(
  e:
    | React.MouseEvent<HTMLCanvasElement>
    | React.TouchEvent<HTMLCanvasElement>,
  canvas: HTMLCanvasElement
): { x: number; y: number } {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  if ("touches" in e) {
    return {
      x: (e.touches[0].clientX - rect.left) * scaleX,
      y: (e.touches[0].clientY - rect.top) * scaleY,
    };
  }
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}

function typedSigToDataUrl(text: string, font: string): string {
  const canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 120;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = `italic 58px ${font}`;
  ctx.fillStyle = "#141010";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 14, 60);
  return canvas.toDataURL("image/png");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function DocumentSigner() {
  const [step, setStep] = useState<Step>(1);

  // PDF state
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<ArrayBuffer | null>(null);
  const [pages, setPages] = useState<PageDim[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Signature state
  const [sigMode, setSigMode] = useState<SigMode>("draw");
  const [typedText, setTypedText] = useState("");
  const [sigFont, setSigFont] = useState(SIG_FONTS[0].value);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [sigError, setSigError] = useState<string | null>(null);

  // Canvas drawing
  const drawCanvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const lastPt = useRef<{ x: number; y: number } | null>(null);
  const hasDrawn = useRef(false);

  // PDF preview canvas
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfRendering, setPdfRendering] = useState(false);
  const [pdfRenderError, setPdfRenderError] = useState(false);
  // Cache the loaded pdfjs document so the ArrayBuffer is only consumed once
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfjsDocRef = useRef<any>(null);

  // Placement (relative 0–1 within page)
  const [sigX, setSigX] = useState(0.1);
  const [sigY, setSigY] = useState(0.68);
  const [sigW, setSigW] = useState(0.35);
  const [sigH, setSigH] = useState(0.09);

  const previewRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const dragOffset = useRef({ dx: 0, dy: 0 });

  // Download state
  const [downloading, setDownloading] = useState(false);
  const [done, setDone] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // ── Initialise canvas stroke style when step 2 mounts ──────────────────

  useEffect(() => {
    if (step !== 2) return;
    hasDrawn.current = false;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = "#141010";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [step]);

  // ── Render PDF page via pdfjs-dist when step 3 is active ───────────────

  useEffect(() => {
    if (step !== 3 || !pdfBytes) return;

    let cancelled = false;
    setPdfRendering(true);
    setPdfRenderError(false);

    async function renderPdfPage() {
      try {
        // Lazy-load pdfjs-dist only when needed
        const PDFJS = await import("pdfjs-dist");

        // pdfjs-dist 3.x CJS — worker is a plain .js file available on cdnjs
        PDFJS.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

        // Load the document only once — pdfjs detaches the ArrayBuffer on first
        // load, so we must reuse the cached document for subsequent page renders.
        if (!pdfjsDocRef.current) {
          const loadingTask = PDFJS.getDocument({
            // .slice(0) copies the buffer so pdf-lib's copy stays intact for signing
            data: new Uint8Array(pdfBytes!.slice(0)),
          });
          pdfjsDocRef.current = await loadingTask.promise;
        }
        const pdf = pdfjsDocRef.current;
        if (cancelled) return;

        const page = await pdf.getPage(currentPage);
        if (cancelled) return;

        const canvas = pdfCanvasRef.current;
        if (!canvas) return;

        // Scale so the page fits PREVIEW_MAX_W
        const nativeViewport = page.getViewport({ scale: 1 });
        const containerWidth = Math.min(
          PREVIEW_MAX_W,
          previewRef.current?.clientWidth || PREVIEW_MAX_W
        );
        const scale = containerWidth / nativeViewport.width;
        const scaledViewport = page.getViewport({ scale });

        canvas.width = Math.round(scaledViewport.width);
        canvas.height = Math.round(scaledViewport.height);

        const ctx = canvas.getContext("2d")!;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        await page.render({ canvasContext: ctx, viewport: scaledViewport })
          .promise;

        if (!cancelled) setPdfRendering(false);
      } catch (err) {
        console.error("PDF render error:", err);
        if (!cancelled) {
          setPdfRendering(false);
          setPdfRenderError(true);
        }
      }
    }

    renderPdfPage();
    return () => {
      cancelled = true;
    };
  }, [step, currentPage, pdfBytes]);

  // ── File Upload ─────────────────────────────────────────────────────────

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.includes("pdf")) return;
    setPdfFile(file);
    pdfjsDocRef.current = null; // clear any previously cached document
    const buf = await file.arrayBuffer();
    setPdfBytes(buf);
    try {
      const pdfDoc = await PDFDocument.load(buf);
      const pageDims = pdfDoc.getPages().map((p) => {
        const { width, height } = p.getSize();
        return { width, height };
      });
      setPages(pageDims);
    } catch {
      setPages([{ width: 595, height: 842 }]);
    }
    setCurrentPage(1);
    setStep(2);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  // ── Drawing ─────────────────────────────────────────────────────────────

  const startDraw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    drawing.current = true;
    hasDrawn.current = true;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const pos = getCanvasPos(e, canvas);
    lastPt.current = pos;
    const ctx = canvas.getContext("2d")!;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  };

  const continueDraw = (
    e:
      | React.MouseEvent<HTMLCanvasElement>
      | React.TouchEvent<HTMLCanvasElement>
  ) => {
    e.preventDefault();
    if (!drawing.current) return;
    const canvas = drawCanvasRef.current;
    if (!canvas || !lastPt.current) return;
    const ctx = canvas.getContext("2d")!;
    const pos = getCanvasPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPt.current.x, lastPt.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPt.current = pos;
  };

  const endDraw = () => {
    drawing.current = false;
    lastPt.current = null;
  };

  const clearDrawCanvas = () => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d")!.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn.current = false;
  };

  const captureSignature = () => {
    setSigError(null);
    if (sigMode === "draw") {
      if (!hasDrawn.current) {
        setSigError("Please draw your signature first.");
        return;
      }
      const canvas = drawCanvasRef.current;
      if (!canvas) return;
      setSignatureUrl(canvas.toDataURL("image/png"));
    } else {
      if (!typedText.trim()) {
        setSigError("Please type your name.");
        return;
      }
      setSignatureUrl(typedSigToDataUrl(typedText, sigFont));
    }
    setStep(3);
  };

  // ── Placement helpers ────────────────────────────────────────────────────

  // Fallback dimensions before PDF renders (uses pdf-lib page size)
  const previewDim = () => {
    const pg = pages[currentPage - 1];
    if (!pg) return { w: PREVIEW_MAX_W, h: Math.round(PREVIEW_MAX_W * 1.414) };
    const ratio = pg.height / pg.width;
    return { w: PREVIEW_MAX_W, h: Math.round(PREVIEW_MAX_W * ratio) };
  };

  // Returns the rendered dimensions of the preview container
  const getRenderedDim = () => {
    const el = previewRef.current;
    if (el) return { w: el.clientWidth, h: el.clientHeight };
    return previewDim();
  };

  // ── Placement drag (mouse) ───────────────────────────────────────────────

  const onSigMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    const pr = previewRef.current!.getBoundingClientRect();
    const { w, h } = getRenderedDim();
    dragOffset.current = {
      dx: e.clientX - pr.left - sigX * w,
      dy: e.clientY - pr.top - sigY * h,
    };
  };

  const onPreviewMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const pr = previewRef.current!.getBoundingClientRect();
    const { w, h } = getRenderedDim();
    setSigX(
      Math.max(
        0,
        Math.min(1 - sigW, (e.clientX - pr.left - dragOffset.current.dx) / w)
      )
    );
    setSigY(
      Math.max(
        0,
        Math.min(1 - sigH, (e.clientY - pr.top - dragOffset.current.dy) / h)
      )
    );
  };

  const onPreviewMouseUp = () => {
    dragging.current = false;
  };

  // ── Placement drag (touch) ───────────────────────────────────────────────

  const onSigTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    dragging.current = true;
    const pr = previewRef.current!.getBoundingClientRect();
    const { w, h } = getRenderedDim();
    dragOffset.current = {
      dx: e.touches[0].clientX - pr.left - sigX * w,
      dy: e.touches[0].clientY - pr.top - sigY * h,
    };
  };

  const onPreviewTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    e.preventDefault();
    const pr = previewRef.current!.getBoundingClientRect();
    const { w, h } = getRenderedDim();
    setSigX(
      Math.max(
        0,
        Math.min(
          1 - sigW,
          (e.touches[0].clientX - pr.left - dragOffset.current.dx) / w
        )
      )
    );
    setSigY(
      Math.max(
        0,
        Math.min(
          1 - sigH,
          (e.touches[0].clientY - pr.top - dragOffset.current.dy) / h
        )
      )
    );
  };

  // ── Download ─────────────────────────────────────────────────────────────

  const handleDownload = async () => {
    if (!pdfBytes || !signatureUrl) return;
    setDownloading(true);
    try {
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const base64 = signatureUrl.split(",")[1];
      const imgBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
      const pngImage = await pdfDoc.embedPng(imgBytes);
      const page = pdfDoc.getPage(currentPage - 1);
      const { width: pdfW, height: pdfH } = page.getSize();

      // PDF coords: origin bottom-left, Y increases upward
      const x = sigX * pdfW;
      const y = pdfH - (sigY + sigH) * pdfH;
      const w = sigW * pdfW;
      const h = sigH * pdfH;

      page.drawImage(pngImage, { x, y, width: w, height: h });

      const signedBytes = await pdfDoc.save();
      const blob = new Blob([signedBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFile ? `signed-${pdfFile.name}` : "signed-document.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setDone(true);
    } finally {
      setDownloading(false);
    }
  };

  // ── Reset ─────────────────────────────────────────────────────────────────

  const reset = () => {
    setStep(1);
    setPdfFile(null);
    setPdfBytes(null);
    setPages([]);
    setSignatureUrl(null);
    setTypedText("");
    setSigError(null);
    setDone(false);
    setCurrentPage(1);
    setSigX(0.1);
    setSigY(0.68);
    setSigW(0.35);
    setSigH(0.09);
    setPdfRenderError(false);
    pdfjsDocRef.current = null;
    clearDrawCanvas();
  };

  const { w: previewW, h: previewH } = previewDim();
  const previewAspect = `${previewW} / ${previewH}`;

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-display font-semibold text-brand-black">
            Document Signer
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Sign a PDF in your browser. No data leaves your device.
          </p>
        </div>
        {step > 1 && (
          <button
            onClick={reset}
            className="text-xs text-gray-400 hover:text-brand-black flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Start over
          </button>
        )}
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-1">
        {STEPS.map((label, i) => {
          const n = (i + 1) as Step;
          const isActive = step === n;
          const isDone = step > n;
          return (
            <React.Fragment key={label}>
              <div
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                  isActive
                    ? "bg-brand-orange text-white"
                    : isDone
                    ? "bg-brand-grey/30 text-brand-black"
                    : "bg-gray-50 text-gray-400"
                }`}
              >
                {isDone ? (
                  <Check className="w-3 h-3 flex-shrink-0" />
                ) : (
                  <span>{n}</span>
                )}
                {label}
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-px bg-gray-100 min-w-[8px]" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── STEP 1: Upload ─────────────────────────────────────────────────── */}
      {step === 1 && (
        <div
          onDrop={onDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onClick={() => document.getElementById("doc-signer-input")?.click()}
          className={`border-2 border-dashed rounded-xl p-12 flex flex-col items-center justify-center gap-4 transition-colors cursor-pointer group ${
            dragOver
              ? "border-brand-orange/60 bg-brand-orange/5"
              : "border-brand-grey/60 hover:border-brand-orange/50"
          }`}
        >
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
              dragOver
                ? "bg-brand-orange/15"
                : "bg-brand-grey/20 group-hover:bg-brand-orange/10"
            }`}
          >
            <Upload className="w-6 h-6 text-brand-black/60" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-brand-black">
              Drop a PDF here or click to upload
            </p>
            <p className="text-xs text-gray-400 mt-1">PDF files only</p>
          </div>
          <input
            id="doc-signer-input"
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
            }}
          />
        </div>
      )}

      {/* ── STEP 2: Signature capture ───────────────────────────────────────── */}
      {step === 2 && (
        <div>
          <p className="text-sm text-gray-500 mb-5">
            <span className="font-medium text-brand-black">{pdfFile?.name}</span>
            <span className="ml-2 text-gray-400">
              ({pages.length} page{pages.length !== 1 ? "s" : ""})
            </span>
          </p>

          {/* Mode tabs */}
          <div className="flex gap-2 mb-5">
            {(["draw", "type"] as SigMode[]).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setSigMode(m);
                  setSigError(null);
                }}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  sigMode === m
                    ? "bg-brand-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {m === "draw" ? "Draw" : "Type"}
              </button>
            ))}
          </div>

          {sigMode === "draw" ? (
            <div>
              <div
                className="border border-gray-200 rounded-xl bg-gray-50/60 relative"
                style={{ touchAction: "none" }}
              >
                <canvas
                  ref={drawCanvasRef}
                  width={560}
                  height={180}
                  className="w-full rounded-xl cursor-crosshair"
                  onMouseDown={startDraw}
                  onMouseMove={continueDraw}
                  onMouseUp={endDraw}
                  onMouseLeave={endDraw}
                  onTouchStart={startDraw}
                  onTouchMove={continueDraw}
                  onTouchEnd={endDraw}
                />
                <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-gray-300 pointer-events-none select-none">
                  Sign here
                </p>
              </div>
              <button
                onClick={clearDrawCanvas}
                className="mt-2 text-xs text-gray-400 hover:text-brand-black flex items-center gap-1 transition-colors"
              >
                <X className="w-3 h-3" /> Clear
              </button>
            </div>
          ) : (
            <div>
              <input
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="Your full name"
                className="w-full border border-gray-200 rounded-lg px-4 py-4 text-3xl focus:outline-none focus:border-brand-orange transition-colors"
                style={{ fontFamily: sigFont, fontStyle: "italic" }}
              />
              <div className="flex gap-2 mt-3 flex-wrap">
                {SIG_FONTS.map((f) => (
                  <button
                    key={f.label}
                    onClick={() => setSigFont(f.value)}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                      sigFont === f.value
                        ? "bg-brand-black text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                    style={{ fontFamily: f.value, fontStyle: "italic" }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {sigError && (
            <p className="mt-3 text-sm text-red-500">{sigError}</p>
          )}

          <button
            onClick={captureSignature}
            className="mt-6 w-full py-3 bg-brand-orange text-white font-medium rounded-lg hover:bg-brand-orange/90 transition-colors"
          >
            Use this signature →
          </button>
        </div>
      )}

      {/* ── STEP 3: Placement with live PDF preview ─────────────────────────── */}
      {step === 3 && signatureUrl && (
        <div>
          <p className="text-sm text-gray-500 mb-1">
            Drag the signature to position it on the page.
          </p>
          {pdfRendering ? (
            <p className="text-xs text-gray-400 mb-4">
              Loading PDF preview…
            </p>
          ) : pdfRenderError ? (
            <p className="text-xs text-amber-600 mb-4">
              PDF preview unavailable — placement still works; sliders below set position.
            </p>
          ) : (
            <p className="text-xs text-gray-400 mb-4">
              You are viewing the actual PDF. Drag the signature to the correct spot.
            </p>
          )}

          {/* Page navigation */}
          {pages.length > 1 && (
            <div className="flex items-center gap-2 mb-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-sm text-gray-600">
                Page {currentPage} of {pages.length}
              </span>
              <button
                disabled={currentPage === pages.length}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="p-1.5 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Preview container — aspect-ratio keeps proportions on any screen size */}
          <div
            ref={previewRef}
            className="relative rounded-xl shadow-sm border border-gray-200 overflow-hidden select-none mx-auto bg-white"
            style={{
              maxWidth: PREVIEW_MAX_W,
              width: "100%",
              aspectRatio: previewAspect,
              cursor: "default",
            }}
            onMouseMove={onPreviewMouseMove}
            onMouseUp={onPreviewMouseUp}
            onMouseLeave={onPreviewMouseUp}
            onTouchMove={onPreviewTouchMove}
            onTouchEnd={() => {
              dragging.current = false;
            }}
          >
            {/* Actual PDF rendered by pdfjs */}
            <canvas
              ref={pdfCanvasRef}
              className="absolute inset-0 w-full h-full"
              style={{ display: pdfRenderError ? "none" : "block" }}
            />

            {/* Loading spinner overlay */}
            {pdfRendering && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50/90 z-10">
                <Loader2 className="w-6 h-6 text-brand-orange animate-spin" />
              </div>
            )}

            {/* Fallback grey page when pdfjs fails */}
            {pdfRenderError && (
              <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-white">
                {Array.from({ length: 20 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute left-8 right-8 border-t border-gray-100"
                    style={{ top: `${((i + 1) / 21) * 100}%` }}
                  />
                ))}
                <div className="absolute top-2 left-3 text-xs text-gray-300 font-mono select-none">
                  Page {currentPage}
                </div>
              </div>
            )}

            {/* Draggable signature overlay */}
            {!pdfRendering && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={signatureUrl}
                alt="Signature"
                draggable={false}
                className="absolute cursor-move z-20"
                style={{
                  left: `${sigX * 100}%`,
                  top: `${sigY * 100}%`,
                  width: `${sigW * 100}%`,
                  height: `${sigH * 100}%`,
                  objectFit: "contain",
                  objectPosition: "left center",
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
                  outline: "1.5px solid rgba(230,80,50,0.5)",
                  outlineOffset: "1px",
                  borderRadius: "2px",
                }}
                onMouseDown={onSigMouseDown}
                onTouchStart={onSigTouchStart}
              />
            )}
          </div>

          {/* Size sliders */}
          <div className="mt-5 grid grid-cols-2 gap-5">
            <label className="block text-xs text-gray-500">
              Width:{" "}
              <span className="text-brand-black font-medium">
                {Math.round(sigW * 100)}%
              </span>
              <input
                type="range"
                min={5}
                max={80}
                value={Math.round(sigW * 100)}
                onChange={(e) => setSigW(Number(e.target.value) / 100)}
                className="w-full mt-1.5 accent-brand-orange"
              />
            </label>
            <label className="block text-xs text-gray-500">
              Height:{" "}
              <span className="text-brand-black font-medium">
                {Math.round(sigH * 100)}%
              </span>
              <input
                type="range"
                min={2}
                max={25}
                value={Math.round(sigH * 100)}
                onChange={(e) => setSigH(Number(e.target.value) / 100)}
                className="w-full mt-1.5 accent-brand-orange"
              />
            </label>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setStep(2)}
              className="flex-1 py-2.5 border border-gray-200 text-gray-600 font-medium rounded-lg hover:border-brand-grey hover:text-brand-black transition-colors text-sm"
            >
              ← Change signature
            </button>
            <button
              onClick={() => setStep(4)}
              className="flex-1 py-2.5 bg-brand-orange text-white font-medium rounded-lg hover:bg-brand-orange/90 transition-colors text-sm"
            >
              Looks good →
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: Download ───────────────────────────────────────────────── */}
      {step === 4 && (
        <div className="text-center py-4">
          {done ? (
            <>
              <div className="w-16 h-16 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-lg font-semibold text-brand-black mb-2">
                Download started!
              </h4>
              <p className="text-sm text-gray-500 mb-6">
                Check your Downloads folder for{" "}
                <strong>signed-{pdfFile?.name}</strong>.
              </p>
              <button
                onClick={reset}
                className="px-6 py-2.5 border border-brand-grey rounded-lg text-sm text-brand-black hover:border-brand-black transition-colors"
              >
                Sign another document
              </button>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-brand-grey/20 border border-brand-grey/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-brand-black/60" />
              </div>
              <h4 className="text-lg font-semibold text-brand-black mb-2">
                Ready to download
              </h4>
              <p className="text-sm text-gray-400 mb-1">{pdfFile?.name}</p>
              <p className="text-xs text-gray-400 mb-6">
                Signature on page {currentPage} at position (
                {Math.round(sigX * 100)}%, {Math.round(sigY * 100)}%)
              </p>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center gap-2 px-8 py-3 bg-brand-orange text-white font-medium rounded-lg hover:bg-brand-orange/90 disabled:opacity-60 transition-colors"
              >
                <Download className="w-4 h-4" />
                {downloading ? "Generating PDF…" : "Download Signed PDF"}
              </button>
              <button
                onClick={() => setStep(3)}
                className="block mx-auto mt-3 text-sm text-gray-400 hover:text-brand-black transition-colors"
              >
                ← Adjust placement
              </button>
            </>
          )}
        </div>
      )}

      {/* Legal notice */}
      <div className="mt-8 flex items-start gap-2.5 p-3.5 bg-amber-50 border border-amber-100 rounded-xl">
        <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          This tool adds a visual signature to a PDF for convenience only. It
          does not provide cryptographic signing, audit trails, or legal
          e-signature guarantees. For legally binding contracts, use a certified
          provider such as DocuSign or Adobe Sign.
        </p>
      </div>
    </div>
  );
}
