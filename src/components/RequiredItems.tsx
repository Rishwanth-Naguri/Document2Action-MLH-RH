"use strict";
import React, { useState } from "react";
import { CheckSquare, Square, CheckCircle2, ClipboardList } from "lucide-react";

interface RequiredItemsProps {
  items: string[];
}

export function RequiredItems({ items }: RequiredItemsProps) {
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);

  if (!items || items.length === 0) {
    return null;
  }

  const toggleItem = (idx: number) => {
    setCompletedIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="rounded-2xl border border-[#27272A] bg-[#111113] p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-4 w-4 text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">
            Required Items &amp; Prerequisites
          </h3>
        </div>
        <span className="text-[11px] font-mono text-[#71717A]">
          {completedIndices.length}/{items.length} Ready
        </span>
      </div>

      <div className="space-y-2">
        {items.map((item, idx) => {
          const isDone = completedIndices.includes(idx);
          return (
            <div
              key={idx}
              onClick={() => toggleItem(idx)}
              className={`flex items-start gap-3 rounded-xl p-3 border transition-all cursor-pointer select-none ${
                isDone
                  ? "border-emerald-500/30 bg-emerald-950/10 text-emerald-200"
                  : "border-[#27272A] bg-[#18181B] text-[#FAFAFA] hover:border-[#3F3F46]"
              }`}
            >
              <button
                type="button"
                className="mt-0.5 flex-shrink-0 text-indigo-400 hover:text-indigo-300"
              >
                {isDone ? (
                  <CheckSquare className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Square className="h-4 w-4 text-[#71717A]" />
                )}
              </button>
              <span
                className={`text-xs leading-relaxed ${
                  isDone ? "line-through text-[#71717A]" : "text-[#FAFAFA]"
                }`}
              >
                {item}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
