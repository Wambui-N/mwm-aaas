"use client";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

type ChecklistPdfItem = {
  number: string;
  title: string;
  desc: string;
  howTo: string;
  tools: string;
   guideUrl?: string;
};

type ChecklistPdfOptions = {
  title: string;
  subtitle: string;
  items: ChecklistPdfItem[];
};

// pdf-lib's standard fonts are WinAnsi-encoded and can't handle emojis,
// arrows, or some smart quotes. Normalise to a safe subset.
function sanitize(text: string): string {
  return text
    .replace(/\u2192/g, "->") // → to ->
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[–—]/g, "-")
    // Drop any remaining non-Latin-1 characters (e.g. emojis)
    .replace(/[^\x00-\xFF]/g, "");
}

export async function downloadChecklistPdf(opts: ChecklistPdfOptions) {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595, 842]); // A4 portrait
  const { width, height } = page.getSize();

  const fontTitle = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontBody = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const brandOrange = rgb(0.902, 0.314, 0.196); // #e65032
  const brandBlack = rgb(0.078, 0.063, 0.063); // #141010

  let y = height - 60;

  // Accent stripe across top
  page.drawRectangle({
    x: 0,
    y: height - 14,
    width,
    height: 14,
    color: brandOrange,
  });

  // Title
  page.drawText(sanitize(opts.title), {
    x: 48,
    y,
    size: 20,
    font: fontTitle,
    color: brandBlack,
  });
  y -= 26;

  // Subtitle
  const subtitleLines = splitTextIntoLines(sanitize(opts.subtitle), 82);
  subtitleLines.forEach((line) => {
    page.drawText(line, {
      x: 48,
      y,
      size: 10,
      font: fontBody,
      color: rgb(0.35, 0.35, 0.35),
    });
    y -= 14;
  });
  y -= 14;

  // Items
  for (const item of opts.items) {
    if (y < 90) {
      // new page if we run out of space
      page = pdfDoc.addPage([595, 842]);
      y = height - 60;
      page.drawText(sanitize(opts.title), {
        x: 48,
        y,
        size: 14,
        font: fontTitle,
        color: brandBlack,
      });
      y -= 22;
    }

    // Checkbox
    page.drawRectangle({
      x: 48,
      y: y - 4,
      width: 10,
      height: 10,
      color: rgb(1, 1, 1),
      borderColor: brandBlack,
      borderWidth: 1,
    });

    // Number + title
    page.drawText(`${item.number}. ${item.title}`, {
      x: 66,
      y,
      size: 11,
      font: fontTitle,
      color: brandBlack,
    });
    y -= 14;

    const descLines = splitTextIntoLines(sanitize(item.desc), 92);
    descLines.forEach((line) => {
      page.drawText(line, {
        x: 66,
        y,
        size: 9,
        font: fontBody,
        color: rgb(0.35, 0.35, 0.35),
      });
      y -= 12;
    });
    y -= 6;

    // How to start box
    const howLines = splitTextIntoLines(
      sanitize(`How to start: ${item.howTo}`),
      90
    );
    const boxHeight = howLines.length * 12 + 8;

    page.drawRectangle({
      x: 62,
      y: y - 4,
      width: width - 62 - 40,
      height: boxHeight,
      color: rgb(0.96, 0.96, 0.95),
    });
    // left accent
    page.drawRectangle({
      x: 62,
      y: y - 4,
      width: 4,
      height: boxHeight,
      color: brandOrange,
    });

    let innerY = y + boxHeight - 12;
    howLines.forEach((line, idx) => {
      page.drawText(
        idx === 0 ? line : line.replace("How to start: ", ""),
        {
          x: 70,
          y: innerY,
          size: 9,
          font: fontBody,
          color: brandBlack,
        }
      );
      innerY -= 12;
    });
    y -= boxHeight + 8;

    // Tools pill
    const toolsLabel = sanitize(`Tools: ${item.tools}`);
    page.drawRectangle({
      x: 66,
      y: y - 4,
      width: width - 66 - 60,
      height: 16,
      color: rgb(0.98, 0.93, 0.91),
      borderColor: brandOrange,
      borderWidth: 0.5,
    });
    page.drawText(toolsLabel, {
      x: 72,
      y: y,
      size: 8,
      font: fontBody,
      color: brandBlack,
    });

    // Optional "Read full guide" link text
    if (item.guideUrl) {
      const guideLabel = sanitize(`Read full guide: ${item.guideUrl}`);
      page.drawText(guideLabel, {
        x: 72,
        y: y - 12,
        size: 8,
        font: fontBody,
        color: brandOrange,
      });
      y -= 32;
    } else {
      y -= 24;
    }
  }

  // CTA box at bottom
  const ctaHeight = 56;
  const ctaY = 40;
  page.drawRectangle({
    x: 40,
    y: ctaY,
    width: width - 80,
    height: ctaHeight,
    color: rgb(0.97, 0.96, 0.95),
    borderColor: brandOrange,
    borderWidth: 1,
  });

  page.drawText("Book a free consultation", {
    x: 52,
    y: ctaY + 34,
    size: 11,
    font: fontTitle,
    color: brandBlack,
  });
  page.drawText("madewithmake.com/contact-us", {
    x: 52,
    y: ctaY + 20,
    size: 9,
    font: fontBody,
    color: brandOrange,
  });
  page.drawText("Wambui Ndung’u — Made with Make", {
    x: 52,
    y: ctaY + 8,
    size: 8,
    font: fontBody,
    color: rgb(0.4, 0.4, 0.4),
  });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([new Uint8Array(pdfBytes)], {
    type: "application/pdf",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "10-workflows-to-automate-first.pdf";
  a.click();
  URL.revokeObjectURL(url);
}

function splitTextIntoLines(text: string, maxChars: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars) {
      if (current) lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines;
}

