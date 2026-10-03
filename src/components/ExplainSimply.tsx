"use strict";
import React, { useState } from "react";
import { MessageSquareText, Sparkles, X, Copy, Check, Loader2 } from "lucide-react";
import { DocumentAnalysis } from "@/types/document";

interface ExplainSimplyProps {
  analysis: DocumentAnalysis;
  demoId?: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ExplainSimply({
  analysis,
  demoId,
  isOpen,
  onClose,
}: ExplainSimplyProps) {
  const [explanation, setExplanation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  React.useEffect(() => {
    if (isOpen && !explanation && !loading) {
      setLoading(true);
      fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ analysis, demoId }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.explanation) {
            setExplanation(data.explanation);
          } else {
            setExplanation(
              `In simple words:\nThis is a ${analysis.documentType}. You need to ${
                analysis.actionRequired || "review the contents"
              }${analysis.deadline ? ` before ${analysis.deadline}` : ""}.${
                analysis.amount && analysis.amount !== "No amount detected"
                  ? ` The amount involved is ${analysis.amount}.`
                  : ""
              } Keep your required documents ready. That's all you need to do right now.`
            );
          }
        })
        .catch(() => {
          setExplanation(
            `In simple words:\nThis is a ${analysis.documentType}. You need to ${
              analysis.actionRequired || "review this document"
            }${analysis.deadline ? ` before ${analysis.deadline}` : ""}. That's all you need to do right now.`
          );
        })
        .finally(() => setLoading(false));
    }
  }, [isOpen, analysis, demoId, explanation, loading]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (!explanation) return;
    navigator.clipboard.writeText(explanation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl border border-indigo-500/40 bg-[#111113] p-6 shadow-2xl relative animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#27272A]">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#FAFAFA]">
                Explain This Simply
              </h3>
              <p className="text-[11px] text-[#A1A1AA]">
                Plain English breakdown with zero technical jargon
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-3">
              <Loader2 className="h-6 w-6 text-indigo-400 animate-spin" />
              <p className="text-xs text-[#A1A1AA]">
                Translating legal &amp; bureaucratic notice into plain words...
              </p>
            </div>
          ) : (
            <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-5">
              <p className="text-sm text-[#FAFAFA] whitespace-pre-line leading-relaxed font-normal">
                {explanation}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[#27272A]">
          <span className="text-[11px] text-[#71717A]">
            Gemma 4 Plain English Translation
          </span>
          <div className="flex items-center gap-2">
            {explanation && (
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs font-medium text-[#FAFAFA] hover:bg-[#27272A] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
