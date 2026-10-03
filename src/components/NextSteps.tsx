"use strict";
import React, { useState } from "react";
import { ListOrdered, CheckCircle2, Circle, Copy, Check } from "lucide-react";

interface NextStepsProps {
  steps: string[];
}

export function NextSteps({ steps }: NextStepsProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  if (!steps || steps.length === 0) {
    return null;
  }

  const toggleStep = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleCopyPlan = () => {
    const text = steps
      .map((step, idx) => `${String(idx + 1).padStart(2, "0")}. ${step}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-indigo-500/30 bg-[#111113] p-5 sm:p-6 space-y-5 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <ListOrdered className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#FAFAFA] tracking-wide">
              Action Plan — Next Steps
            </h3>
            <p className="text-[11px] text-[#A1A1AA]">
              Numbered execution sequence derived from document obligations
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyPlan}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#27272A] bg-[#18181B] px-2.5 py-1 text-xs font-medium text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#3F3F46] transition-colors"
          title="Copy action plan to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Steps List */}
      <div className="space-y-3">
        {steps.map((rawStep, idx) => {
          // Normalize step text (strip leading '01', '1.', etc. if already present)
          const cleanText = rawStep.replace(/^0?\d+[\s.:-]+/, "").trim();
          const stepNumber = String(idx + 1).padStart(2, "0");
          const isDone = completedSteps.includes(idx);

          return (
            <div
              key={idx}
              onClick={() => toggleStep(idx)}
              className={`group flex items-start gap-4 rounded-xl p-4 border transition-all cursor-pointer select-none ${
                isDone
                  ? "border-emerald-500/30 bg-emerald-950/10 text-[#71717A]"
                  : "border-[#27272A] bg-[#18181B] hover:border-indigo-500/40 hover:bg-[#1c1c20]"
              }`}
            >
              {/* Number Badge */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-mono font-bold flex-shrink-0 transition-colors ${
                  isDone
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 group-hover:border-indigo-500 group-hover:text-indigo-200"
                }`}
              >
                {stepNumber}
              </div>

              {/* Step Content */}
              <div className="flex-1 min-w-0 pt-0.5">
                <p
                  className={`text-xs sm:text-sm font-medium leading-relaxed ${
                    isDone ? "line-through text-[#71717A]" : "text-[#FAFAFA]"
                  }`}
                >
                  {cleanText}
                </p>
              </div>

              {/* Checkmark icon */}
              <div className="pt-0.5 text-indigo-400 flex-shrink-0">
                {isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 animate-fade-in" />
                ) : (
                  <Circle className="h-4 w-4 text-[#3F3F46] group-hover:text-[#71717A]" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 flex items-center justify-between text-[11px] text-[#71717A]">
        <span>Click any step to mark as complete</span>
        <span className="font-mono">
          {completedSteps.length}/{steps.length} completed
        </span>
      </div>
    </div>
  );
}
