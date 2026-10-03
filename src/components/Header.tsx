"use strict";
import React from "react";
import { Sparkles, FileText, Plus, Github } from "lucide-react";

interface HeaderProps {
  onNewDocument: () => void;
  onTryDemo: () => void;
  hasDocument: boolean;
}

export function Header({ onNewDocument, onTryDemo, hasDocument }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#27272A] bg-[#09090B]/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={onNewDocument}>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-500/20">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-[#FAFAFA]">
                Document<span className="text-indigo-400">2</span>Action
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2 py-0.5 text-[11px] font-medium text-indigo-300">
                <Sparkles className="h-3 w-3" />
                Gemma 4
              </span>
            </div>
            <p className="text-[11px] font-medium text-[#A1A1AA] hidden sm:block">
              Understand &rarr; Decide &rarr; Act
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onTryDemo}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-[#27272A] bg-[#111113] px-3 py-1.5 text-xs font-semibold text-[#FAFAFA] hover:bg-[#18181B] hover:border-[#3F3F46] transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            Try Live Demo
          </button>

          {hasDocument && (
            <button
              type="button"
              onClick={onNewDocument}
              className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 active:scale-95 transition-all"
            >
              <Plus className="h-3.5 w-3.5" />
              New Document
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
