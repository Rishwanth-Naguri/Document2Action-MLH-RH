"use strict";
import React, { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  FileText,
  RefreshCw,
  Sparkles,
} from "lucide-react";

interface DocumentPreviewProps {
  previewUrl: string | null;
  fileName: string | null;
  documentType: string;
  onReplace: () => void;
  onReanalyze: () => void;
  isAnalyzing: boolean;
}

export function DocumentPreview({
  previewUrl,
  fileName,
  documentType,
  onReplace,
  onReanalyze,
  isAnalyzing,
}: DocumentPreviewProps) {
  const [zoom, setZoom] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.6));
  const handleResetZoom = () => setZoom(1);

  if (!previewUrl) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-[#27272A] bg-[#111113] p-6 text-center text-xs text-[#A1A1AA]">
        No document preview available
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border border-[#27272A] bg-[#111113] overflow-hidden flex flex-col transition-all ${
        isFullScreen
          ? "fixed inset-4 z-50 shadow-2xl bg-[#09090B] border-[#3F3F46]"
          : "h-full min-h-[500px]"
      }`}
    >
      {/* Viewer Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#27272A] bg-[#18181B]/50">
        <div className="flex items-center gap-2 truncate max-w-[200px] sm:max-w-xs">
          <FileText className="h-4 w-4 text-indigo-400 flex-shrink-0" />
          <span className="text-xs font-semibold text-[#FAFAFA] truncate">
            {fileName || documentType}
          </span>
        </div>

        {/* Zoom & View Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1 rounded-md text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </button>
          <span className="text-[10px] font-mono text-[#71717A] w-9 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1 rounded-md text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleResetZoom}
            className="p-1 rounded-md text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] transition-colors"
            title="Reset zoom"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <div className="h-3 w-[1px] bg-[#27272A] mx-1" />
          <button
            type="button"
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-1 rounded-md text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] transition-colors"
            title={isFullScreen ? "Exit full screen" : "Full screen"}
          >
            {isFullScreen ? (
              <Minimize2 className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Document Viewport */}
      <div className="flex-1 overflow-auto bg-[#09090B] p-4 flex items-center justify-center relative select-none">
        <div
          className="transition-transform duration-150 ease-out origin-center max-w-full"
          style={{ transform: `scale(${zoom})` }}
        >
          {previewUrl.startsWith("data:image/svg+xml") ||
          previewUrl.startsWith("data:image/") ||
          previewUrl.startsWith("blob:") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Uploaded document preview"
              className="max-h-[620px] w-auto rounded-lg shadow-lg border border-[#27272A] object-contain bg-white"
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <FileText className="h-12 w-12 text-indigo-400 mb-3" />
              <p className="text-sm font-semibold text-[#FAFAFA]">{fileName}</p>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Document loaded and verified for Gemma 4 processing.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Viewer Footer Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#27272A] bg-[#18181B]/50">
        <button
          type="button"
          onClick={onReplace}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
        >
          <RefreshCw className="h-3 w-3" />
          Replace document
        </button>

        <button
          type="button"
          onClick={onReanalyze}
          disabled={isAnalyzing}
          className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 text-xs font-medium text-indigo-300 hover:bg-indigo-500/20 disabled:opacity-50 transition-colors"
        >
          <Sparkles className="h-3 w-3" />
          Analyze again
        </button>
      </div>
    </div>
  );
}
