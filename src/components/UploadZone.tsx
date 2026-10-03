"use strict";
import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import {
  UploadCloud,
  FileText,
  X,
  RefreshCw,
  Sparkles,
  AlertCircle,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { DocumentContextType } from "@/types/document";
import { ContextSelector } from "./ContextSelector";
import { DEMO_DOCUMENTS, DemoDocument } from "@/lib/demoData";

interface UploadZoneProps {
  onFileSelect: (file: File | null, base64: string, previewUrl: string) => void;
  onSelectDemo: (demo: DemoDocument) => void;
  onAnalyze: () => void;
  selectedFile: File | null;
  previewUrl: string | null;
  fileName: string | null;
  fileSize: number | null;
  contextHint: DocumentContextType;
  onContextChange: (ctx: DocumentContextType) => void;
  isAnalyzing: boolean;
  activeDemoId: string | null;
}

export function UploadZone({
  onFileSelect,
  onSelectDemo,
  onAnalyze,
  selectedFile,
  previewUrl,
  fileName,
  fileSize,
  contextHint,
  onContextChange,
  isAnalyzing,
  activeDemoId,
}: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const processFile = (file: File) => {
    setErrorMessage(null);

    // Validate size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("This document is too large. Please upload a file under 10MB.");
      return;
    }

    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "application/pdf",
    ];

    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMessage("This file type isn't supported yet. Try JPG, PNG, or PDF.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      const preview = URL.createObjectURL(file);
      onFileSelect(file, base64, preview);
    };
    reader.onerror = () => {
      setErrorMessage("Failed to read document. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null, "", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleTriggerPicker = () => {
    fileInputRef.current?.click();
  };

  return (
    <div id="upload-section" className="w-full max-w-4xl mx-auto space-y-6">
      {/* Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!previewUrl ? handleTriggerPicker : undefined}
        className={`relative rounded-2xl border-2 transition-all p-6 sm:p-8 ${
          isDragOver
            ? "border-indigo-500 bg-indigo-950/20 shadow-xl shadow-indigo-500/10 scale-[1.005]"
            : previewUrl
            ? "border-[#27272A] bg-[#111113]"
            : "border-dashed border-[#27272A] hover:border-indigo-500/50 bg-[#111113] cursor-pointer"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.webp,.svg,.pdf"
          onChange={handleFileChange}
          className="hidden"
          id="document-upload-input"
        />

        {previewUrl ? (
          /* Ready / Selected State */
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#27272A]">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  <FileCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#FAFAFA] truncate max-w-xs sm:max-w-md">
                      {fileName || "Document ready for analysis"}
                    </h3>
                    {activeDemoId && (
                      <span className="rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
                        Demo Fixture
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#A1A1AA]">
                    {fileSize ? formatFileSize(fileSize) : "Verified ready"} • Ready for Gemma 4
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  type="button"
                  onClick={handleTriggerPicker}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs font-medium text-[#FAFAFA] hover:bg-[#27272A] transition-colors"
                >
                  <RefreshCw className="h-3 w-3" />
                  Replace
                </button>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="inline-flex items-center gap-1 rounded-lg border border-[#27272A] bg-[#18181B] px-2.5 py-1.5 text-xs font-medium text-rose-400 hover:bg-rose-950/20 hover:border-rose-900 transition-colors"
                  title="Remove file"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Document Context Selector */}
            <ContextSelector
              selectedContext={contextHint}
              onChange={onContextChange}
              disabled={isAnalyzing}
            />

            {/* Action Button */}
            <div className="pt-2">
              <button
                type="button"
                id="analyze-document-button"
                onClick={onAnalyze}
                disabled={isAnalyzing}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:to-indigo-500 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Sparkles className="h-4 w-4" />
                Analyze Document with Gemma 4
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        ) : (
          /* Empty / Drop Zone State */
          <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4 transition-transform group-hover:scale-105">
              <UploadCloud className="h-7 w-7" />
            </div>

            <p className="text-base font-semibold text-[#FAFAFA]">
              Drop your document here
            </p>
            <p className="mt-1 text-xs text-[#A1A1AA]">
              or click to browse from your device
            </p>
            <p className="mt-2 text-[11px] font-medium text-[#71717A]">
              JPG • PNG • PDF • Max 10MB
            </p>

            <button
              type="button"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-600/10 px-4 py-2 text-xs font-semibold text-indigo-300 hover:bg-indigo-600/20 transition-all"
            >
              <FileText className="h-3.5 w-3.5" />
              Choose document
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-950/20 p-3 text-xs text-rose-300">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Try Demo Quick Selector */}
      <div className="rounded-xl border border-[#27272A] bg-[#111113]/60 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA] flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            Or try a sample document for instant evaluation:
          </span>
          <span className="text-[11px] text-[#71717A] hidden sm:inline">
            One-click test fixtures
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {DEMO_DOCUMENTS.map((demo) => {
            const isCurrent = activeDemoId === demo.id;
            return (
              <button
                key={demo.id}
                type="button"
                onClick={() => onSelectDemo(demo)}
                className={`text-left rounded-xl p-3 border transition-all ${
                  isCurrent
                    ? "border-indigo-500/80 bg-indigo-950/30 shadow-md shadow-indigo-500/10"
                    : "border-[#27272A] bg-[#18181B] hover:border-[#3F3F46] hover:bg-[#18181B]/80"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">
                    {demo.badge}
                  </span>
                  {isCurrent && (
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  )}
                </div>
                <h4 className="mt-1 text-xs font-semibold text-[#FAFAFA] truncate">
                  {demo.fixtureAnalysis.documentType}
                </h4>
                <p className="mt-1 text-[11px] text-[#A1A1AA] line-clamp-1">
                  Due: {demo.fixtureAnalysis.deadline} • {demo.fixtureAnalysis.amount}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
