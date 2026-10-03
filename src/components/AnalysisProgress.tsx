"use strict";
import React, { useEffect, useState } from "react";
import { Sparkles, CheckCircle2, Loader2, Circle } from "lucide-react";

interface AnalysisProgressProps {
  isDone: boolean;
}

interface Step {
  id: number;
  label: string;
}

const STEPS: Step[] = [
  { id: 1, label: "Document received and validated" },
  { id: 2, label: "Reading visual structure and text layout" },
  { id: 3, label: "Identifying authority, sender, and key clauses" },
  { id: 4, label: "Extracting obligations, amounts, and deadlines" },
  { id: 5, label: "Synthesizing prioritized action plan with Gemma 4" },
];

export function AnalysisProgress({ isDone }: AnalysisProgressProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (isDone) {
      setCurrentStepIndex(STEPS.length);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, [isDone]);

  const progressPercent = Math.min(
    100,
    Math.round(((currentStepIndex + (isDone ? 1 : 0.5)) / STEPS.length) * 100)
  );

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-[#27272A] bg-[#111113] p-6 sm:p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 animate-pulse">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-[#FAFAFA]">
            Analyzing your document...
          </h3>
          <p className="text-xs text-[#A1A1AA]">
            Gemma 4 multimodal model is extracting your obligations
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#18181B] h-1.5 rounded-full overflow-hidden mb-6">
        <div
          className="bg-gradient-to-r from-indigo-500 to-indigo-400 h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Steps List */}
      <div className="space-y-3.5">
        {STEPS.map((step, idx) => {
          const isFinished = idx < currentStepIndex || isDone;
          const isCurrent = idx === currentStepIndex && !isDone;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                isFinished
                  ? "text-[#FAFAFA]"
                  : isCurrent
                  ? "text-indigo-300 font-medium"
                  : "text-[#71717A] opacity-50"
              }`}
            >
              {isFinished ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 flex-shrink-0 animate-fade-in" />
              ) : isCurrent ? (
                <Loader2 className="h-4 w-4 text-indigo-400 flex-shrink-0 animate-spin" />
              ) : (
                <Circle className="h-4 w-4 text-[#3F3F46] flex-shrink-0" />
              )}
              <span className="text-xs tracking-wide">{step.label}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-[#27272A]/70 flex items-center justify-between text-[11px] text-[#71717A]">
        <span>Processing session</span>
        <span className="font-mono text-indigo-400">{progressPercent}%</span>
      </div>
    </div>
  );
}
