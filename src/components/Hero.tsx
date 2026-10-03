"use strict";
import React from "react";
import { ArrowDown, Sparkles, UploadCloud, ShieldCheck, Zap } from "lucide-react";

interface HeroProps {
  onScrollToUpload: () => void;
  onTryDemo: () => void;
}

export function Hero({ onScrollToUpload, onTryDemo }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 text-center">
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        {/* Hackathon badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-300 mb-6">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          Powered by Gemma 4 Multimodal Intelligence
        </div>

        {/* Hero headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#FAFAFA] leading-[1.15]">
          Turn confusing documents <br className="hidden sm:inline" />
          into <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-indigo-200 bg-clip-text text-transparent">clear actions.</span>
        </h1>

        {/* Subheading */}
        <p className="mt-5 text-base sm:text-lg text-[#A1A1AA] max-w-2xl mx-auto leading-relaxed">
          Upload a document and instantly discover what it means, what you need to do, and when you need to do it.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onScrollToUpload}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-500 active:scale-98 transition-all"
          >
            <UploadCloud className="h-4 w-4" />
            Upload document
          </button>

          <button
            type="button"
            onClick={onTryDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#27272A] bg-[#111113] px-6 py-3.5 text-sm font-semibold text-[#FAFAFA] hover:bg-[#18181B] hover:border-[#3F3F46] active:scale-98 transition-all"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            Try a sample
          </button>
        </div>

        {/* Visual Pipeline: UNDERSTAND -> EXTRACT -> ACT */}
        <div className="mt-12 pt-8 border-t border-[#27272A]/60 flex items-center justify-center gap-4 sm:gap-8 text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">
          <div className="flex items-center gap-2 text-indigo-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[10px]">1</span>
            Understand
          </div>
          <span className="text-[#3F3F46]">&rarr;</span>
          <div className="flex items-center gap-2 text-indigo-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-[10px]">2</span>
            Extract
          </div>
          <span className="text-[#3F3F46]">&rarr;</span>
          <div className="flex items-center gap-2 text-emerald-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-[10px]">3</span>
            Act
          </div>
        </div>

        {/* Trust Notice */}
        <p className="mt-6 text-[12px] text-[#71717A] flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-indigo-400" />
          Your document is processed for analysis. Avoid uploading highly sensitive information you don&apos;t need to analyze.
        </p>
      </div>
    </section>
  );
}
