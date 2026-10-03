"use strict";
import React from "react";
import { UploadCloud, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { DEMO_DOCUMENTS, DemoDocument } from "@/lib/demoData";

interface EmptyStateProps {
  onUploadClick: () => void;
  onSelectDemo: (demo: DemoDocument) => void;
}

export function EmptyState({ onUploadClick, onSelectDemo }: EmptyStateProps) {
  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      {/* 3 Steps Feature Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="rounded-2xl border border-[#27272A] bg-[#111113] p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-3 font-bold text-xs">
            01
          </div>
          <h4 className="text-sm font-bold text-[#FAFAFA]">Understand</h4>
          <p className="mt-1 text-xs text-[#A1A1AA] leading-relaxed">
            Multimodal Gemma 4 decodes bureaucratic language, terms, and context instantly.
          </p>
        </div>

        <div className="rounded-2xl border border-[#27272A] bg-[#111113] p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-3 font-bold text-xs">
            02
          </div>
          <h4 className="text-sm font-bold text-[#FAFAFA]">Extract</h4>
          <p className="mt-1 text-xs text-[#A1A1AA] leading-relaxed">
            Identifies non-negotiable deadlines, exact fee amounts, penalties, and required papers.
          </p>
        </div>

        <div className="rounded-2xl border border-[#27272A] bg-[#111113] p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 mb-3 font-bold text-xs">
            03
          </div>
          <h4 className="text-sm font-bold text-[#FAFAFA]">Act</h4>
          <p className="mt-1 text-xs text-[#A1A1AA] leading-relaxed">
            Delivers a prioritized, checkable numbered action sequence so you never miss an obligation.
          </p>
        </div>
      </div>
    </div>
  );
}
