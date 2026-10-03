"use strict";
import React, { useState } from "react";
import {
  Sparkles,
  MessageSquare,
  Copy,
  Check,
  RefreshCw,
  Plus,
  Download,
} from "lucide-react";
import { DocumentAnalysis } from "@/types/document";

interface QuickActionsProps {
  onExplainSimply: () => void;
  onScrollToChat: () => void;
  onReanalyze: () => void;
  onNewDocument: () => void;
  analysis: DocumentAnalysis;
}

export function QuickActions({
  onExplainSimply,
  onScrollToChat,
  onReanalyze,
  onNewDocument,
  analysis,
}: QuickActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyActionPlan = () => {
    const lines = [
      `DOCUMENT2ACTION — ACTION PLAN`,
      `Document: ${analysis.documentType}`,
      `Action Required: ${analysis.actionRequired}`,
      `Deadline: ${analysis.deadline}`,
      `Urgency: ${analysis.urgency.toUpperCase()}`,
      `Amount: ${analysis.amount}`,
      ``,
      `NEXT STEPS:`,
      ...analysis.nextSteps.map((s, idx) => `${String(idx + 1).padStart(2, "0")}. ${s}`),
      ``,
      ...(analysis.requiredItems.length > 0
        ? [`REQUIRED ITEMS:`, ...analysis.requiredItems.map((item) => `• ${item}`), ``]
        : []),
      ...(analysis.warnings.length > 0
        ? [`WARNINGS:`, ...analysis.warnings.map((w) => `⚠ ${w}`)]
        : []),
    ];

    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportText = () => {
    const lines = [
      `DOCUMENT2ACTION — ACTION PLAN`,
      `Document: ${analysis.documentType}`,
      `Action Required: ${analysis.actionRequired}`,
      `Deadline: ${analysis.deadline}`,
      `Urgency: ${analysis.urgency.toUpperCase()}`,
      `Amount: ${analysis.amount}`,
      ``,
      `NEXT STEPS:`,
      ...analysis.nextSteps.map((s, idx) => `${String(idx + 1).padStart(2, "0")}. ${s}`),
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Action_Plan_${analysis.documentType.replace(/[^a-zA-Z0-9]/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onExplainSimply}
        className="inline-flex items-center gap-1.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-500/20 active:scale-98 transition-all"
      >
        <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
        Explain Simply
      </button>

      <button
        type="button"
        onClick={onScrollToChat}
        className="inline-flex items-center gap-1.5 rounded-xl border border-[#27272A] bg-[#18181B] px-3.5 py-2 text-xs font-semibold text-[#FAFAFA] hover:bg-[#27272A] active:scale-98 transition-all"
      >
        <MessageSquare className="h-3.5 w-3.5 text-indigo-400" />
        Ask Document
      </button>

      <button
        type="button"
        onClick={handleCopyActionPlan}
        className="inline-flex items-center gap-1.5 rounded-xl border border-[#27272A] bg-[#18181B] px-3.5 py-2 text-xs font-semibold text-[#FAFAFA] hover:bg-[#27272A] active:scale-98 transition-all"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-emerald-400">Copied Plan</span>
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5 text-[#A1A1AA]" />
            <span>Copy Plan</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handleExportText}
        className="inline-flex items-center gap-1.5 rounded-xl border border-[#27272A] bg-[#18181B] px-3 py-2 text-xs font-semibold text-[#FAFAFA] hover:bg-[#27272A] active:scale-98 transition-all"
        title="Download text action plan"
      >
        <Download className="h-3.5 w-3.5 text-[#A1A1AA]" />
        Export
      </button>

      <button
        type="button"
        onClick={onReanalyze}
        className="inline-flex items-center gap-1.5 rounded-xl border border-[#27272A] bg-[#18181B] px-3 py-2 text-xs font-semibold text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] active:scale-98 transition-all"
        title="Re-run AI analysis"
      >
        <RefreshCw className="h-3 w-3" />
        Analyze Again
      </button>

      <button
        type="button"
        onClick={onNewDocument}
        className="inline-flex items-center gap-1.5 rounded-xl border border-[#27272A] bg-[#18181B] px-3.5 py-2 text-xs font-semibold text-[#FAFAFA] hover:bg-[#27272A] active:scale-98 transition-all ml-auto"
      >
        <Plus className="h-3.5 w-3.5" />
        New Document
      </button>
    </div>
  );
}
