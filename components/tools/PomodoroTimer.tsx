"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, Pause, RotateCcw, Settings, X } from "lucide-react";

type Phase = "work" | "shortBreak" | "longBreak";

const PHASE_LABELS: Record<Phase, string> = {
  work: "Focus",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const DEFAULT_SETTINGS = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
  sessionsBeforeLongBreak: 4,
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Generates a very short beep using the Web Audio API — no file needed. */
function playBeep() {
  try {
    const ctx = new (window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
  } catch {
    // silently fail if AudioContext isn't available
  }
}

export default function PomodoroTimer() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);
  const [draftSettings, setDraftSettings] = useState(DEFAULT_SETTINGS);

  const [phase, setPhase] = useState<Phase>("work");
  const [secondsLeft, setSecondsLeft] = useState(
    DEFAULT_SETTINGS.workMinutes * 60
  );
  const [running, setRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(0);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds =
    phase === "work"
      ? settings.workMinutes * 60
      : phase === "shortBreak"
        ? settings.shortBreakMinutes * 60
        : settings.longBreakMinutes * 60;

  const progress = 1 - secondsLeft / totalSeconds;

  const advancePhase = useCallback(() => {
    playBeep();
    setRunning(false);

    setCompletedSessions((prev) => {
      const next = prev + (phase === "work" ? 1 : 0);
      if (phase === "work") {
        if (next % settings.sessionsBeforeLongBreak === 0) {
          setPhase("longBreak");
          setSecondsLeft(settings.longBreakMinutes * 60);
        } else {
          setPhase("shortBreak");
          setSecondsLeft(settings.shortBreakMinutes * 60);
        }
      } else {
        setPhase("work");
        setSecondsLeft(settings.workMinutes * 60);
      }
      return next;
    });
  }, [phase, settings]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            advancePhase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, advancePhase]);

  function reset() {
    setRunning(false);
    setPhase("work");
    setSecondsLeft(settings.workMinutes * 60);
    setCompletedSessions(0);
  }

  function applySettings() {
    setSettings(draftSettings);
    setRunning(false);
    setPhase("work");
    setSecondsLeft(draftSettings.workMinutes * 60);
    setCompletedSessions(0);
    setShowSettings(false);
  }

  const phaseColor =
    phase === "work"
      ? "text-brand-orange"
      : phase === "shortBreak"
        ? "text-brand-black"
        : "text-brand-black";

  const ringColor =
    phase === "work" ? "#e65032" : phase === "shortBreak" ? "#c5d6d0" : "#141010";

  const circumference = 2 * Math.PI * 88;

  return (
    <div className="w-full max-w-md mx-auto select-none">
      {/* Phase tabs */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {(["work", "shortBreak", "longBreak"] as Phase[]).map((p) => (
          <button
            key={p}
            onClick={() => {
              if (running) return;
              setPhase(p);
              setSecondsLeft(
                p === "work"
                  ? settings.workMinutes * 60
                  : p === "shortBreak"
                    ? settings.shortBreakMinutes * 60
                    : settings.longBreakMinutes * 60
              );
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              phase === p
                ? "bg-brand-black text-white"
                : "text-gray-400 hover:text-brand-black"
            } ${running ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          >
            {PHASE_LABELS[p]}
          </button>
        ))}
      </div>

      {/* Circular progress */}
      <div className="relative flex items-center justify-center mb-8">
        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="-rotate-90"
        >
          {/* Track */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="8"
          />
          {/* Progress */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke={ringColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            style={{ transition: "stroke-dashoffset 0.8s linear, stroke 0.4s" }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className={`text-5xl font-mono font-bold ${phaseColor}`}>
            {pad(Math.floor(secondsLeft / 60))}:{pad(secondsLeft % 60)}
          </span>
          <span className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
            {PHASE_LABELS[phase]}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-8">
        <button
          onClick={reset}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Reset"
        >
          <RotateCcw className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={() => setRunning((r) => !r)}
          className="w-16 h-16 rounded-full bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center justify-center transition-colors shadow-md"
          aria-label={running ? "Pause" : "Start"}
        >
          {running ? (
            <Pause className="w-7 h-7" />
          ) : (
            <Play className="w-7 h-7 ml-0.5" />
          )}
        </button>
        <button
          onClick={() => {
            setDraftSettings(settings);
            setShowSettings(true);
          }}
          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Session counter */}
      <div className="flex items-center justify-center gap-2">
        {Array.from({ length: settings.sessionsBeforeLongBreak }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i < completedSessions % settings.sessionsBeforeLongBreak
                ? "bg-brand-orange"
                : "bg-gray-200"
            }`}
          />
        ))}
        <span className="text-xs text-gray-400 ml-2">
          {completedSessions} session{completedSessions !== 1 ? "s" : ""}{" "}
          completed
        </span>
      </div>

      {/* Settings modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-display font-semibold text-brand-black">
                Timer Settings
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-brand-black transition-colors"
                aria-label="Close settings"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-5">
              {(
                [
                  {
                    key: "workMinutes",
                    label: "Focus (minutes)",
                    min: 1,
                    max: 120,
                  },
                  {
                    key: "shortBreakMinutes",
                    label: "Short Break (minutes)",
                    min: 1,
                    max: 30,
                  },
                  {
                    key: "longBreakMinutes",
                    label: "Long Break (minutes)",
                    min: 1,
                    max: 60,
                  },
                  {
                    key: "sessionsBeforeLongBreak",
                    label: "Sessions before long break",
                    min: 1,
                    max: 10,
                  },
                ] as Array<{
                  key: keyof typeof DEFAULT_SETTINGS;
                  label: string;
                  min: number;
                  max: number;
                }>
              ).map(({ key, label, min, max }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                  </label>
                  <input
                    type="number"
                    min={min}
                    max={max}
                    value={draftSettings[key]}
                    onChange={(e) =>
                      setDraftSettings((prev) => ({
                        ...prev,
                        [key]: Math.max(
                          min,
                          Math.min(max, Number(e.target.value))
                        ),
                      }))
                    }
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-8">
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={applySettings}
                className="flex-1 py-2.5 bg-brand-orange text-white rounded-lg text-sm font-medium hover:bg-brand-orange/90 transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
