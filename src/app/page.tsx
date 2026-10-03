"use client";

import React, { useState, useRef } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { UploadZone } from "@/components/UploadZone";
import { DocumentPreview } from "@/components/DocumentPreview";
import { AnalysisProgress } from "@/components/AnalysisProgress";
import { ActionSummary } from "@/components/ActionSummary";
import { InformationCard } from "@/components/InformationCard";
import { RequiredItems } from "@/components/RequiredItems";
import { NextSteps } from "@/components/NextSteps";
import { WarningCard } from "@/components/WarningCard";
import { ExplainSimply } from "@/components/ExplainSimply";
import { DocumentChat } from "@/components/DocumentChat";
import { QuickActions } from "@/components/QuickActions";
import { EmptyState } from "@/components/EmptyState";
import { DEMO_DOCUMENTS, DemoDocument } from "@/lib/demoData";
import { DocumentAnalysis, DocumentContextType } from "@/types/document";
import { AlertCircle, RefreshCw, Sparkles } from "lucide-react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [fileMime, setFileMime] = useState<string>("image/png");
  const [activeDemoId, setActiveDemoId] = useState<string | null>(null);

  const [contextHint, setContextHint] = useState<DocumentContextType>("auto");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [modelUsed, setModelUsed] = useState<string>("gemma-4-31b-it");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isExplainOpen, setIsExplainOpen] = useState(false);

  const chatSectionRef = useRef<HTMLDivElement>(null);
  const uploadSectionRef = useRef<HTMLDivElement>(null);

  const handleFileSelect = (
    file: File | null,
    base64: string,
    preview: string
  ) => {
    setSelectedFile(file);
    setFileBase64(base64);
    setPreviewUrl(preview);
    setFileName(file ? file.name : null);
    setFileSize(file ? file.size : null);
    setFileMime(file ? file.type : "image/png");
    setActiveDemoId(null);
    setAnalysis(null);
    setErrorMessage(null);
  };

  const handleSelectDemo = (demo: DemoDocument, autoAnalyze = false) => {
    setSelectedFile(null);
    setFileBase64(demo.base64Data);
    setPreviewUrl(demo.previewUrl);
    setFileName(demo.name);
    setFileSize(42800);
    setFileMime(demo.mimeType);
    setActiveDemoId(demo.id);
    setContextHint(demo.category as DocumentContextType);
    setErrorMessage(null);

    if (autoAnalyze) {
      triggerAnalysis(demo.base64Data, demo.mimeType, demo.category, true, demo.id);
    } else {
      setAnalysis(null);
      // Smooth scroll to upload area
      document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const triggerAnalysis = async (
    b64: string,
    mime: string,
    hint: string,
    isDemo: boolean,
    demoId: string | null
  ) => {
    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileBase64: b64,
          mimeType: mime,
          contextHint: hint,
          isDemo,
          demoId,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to analyze document.");
      }

      setAnalysis(data.analysis);
      setModelUsed(data.modelUsed || "gemma-4-31b-it");
    } catch (err: unknown) {
      console.error("Analysis error:", err);
      const msg = err instanceof Error ? err.message : "We couldn't analyze this document. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleAnalyzeClick = () => {
    if (!fileBase64) {
      setErrorMessage("Please upload a document first.");
      return;
    }
    triggerAnalysis(fileBase64, fileMime, contextHint, Boolean(activeDemoId), activeDemoId);
  };

  const handleNewDocument = () => {
    setSelectedFile(null);
    setFileBase64("");
    setPreviewUrl(null);
    setFileName(null);
    setFileSize(null);
    setActiveDemoId(null);
    setAnalysis(null);
    setErrorMessage(null);
    setContextHint("auto");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToChat = () => {
    chatSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToUpload = () => {
    document.getElementById("upload-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const currentDemo = activeDemoId
    ? DEMO_DOCUMENTS.find((d) => d.id === activeDemoId)
    : null;

  return (
    <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] flex flex-col font-sans">
      <Header
        onNewDocument={handleNewDocument}
        onTryDemo={() => handleSelectDemo(DEMO_DOCUMENTS[0], true)}
        hasDocument={Boolean(previewUrl || analysis)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        {/* Error Banner */}
        {errorMessage && (
          <div className="rounded-2xl border border-rose-500/40 bg-rose-950/20 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-rose-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-rose-200">{errorMessage}</p>
                <p className="text-[11px] text-rose-300/70 mt-0.5">
                  Check server configuration or try using our sample demo documents.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleAnalyzeClick}
                className="inline-flex items-center gap-1.5 rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-500 transition-colors"
              >
                <RefreshCw className="h-3 w-3" />
                Retry
              </button>
              <button
                type="button"
                onClick={() => handleSelectDemo(DEMO_DOCUMENTS[0], true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#27272A] bg-[#18181B] px-3 py-1.5 text-xs font-semibold text-[#FAFAFA] hover:bg-[#27272A] transition-colors"
              >
                <Sparkles className="h-3 w-3 text-indigo-400" />
                Try Sample
              </button>
            </div>
          </div>
        )}

        {/* State 1: No Analysis Yet (Landing & Upload) */}
        {!analysis && !isAnalyzing && (
          <div className="space-y-10">
            <Hero
              onScrollToUpload={handleScrollToUpload}
              onTryDemo={() => handleSelectDemo(DEMO_DOCUMENTS[0], true)}
            />

            <UploadZone
              onFileSelect={handleFileSelect}
              onSelectDemo={(demo) => handleSelectDemo(demo, false)}
              onAnalyze={handleAnalyzeClick}
              selectedFile={selectedFile}
              previewUrl={previewUrl}
              fileName={fileName}
              fileSize={fileSize}
              contextHint={contextHint}
              onContextChange={setContextHint}
              isAnalyzing={isAnalyzing}
              activeDemoId={activeDemoId}
            />

            {!previewUrl && (
              <EmptyState
                onUploadClick={handleScrollToUpload}
                onSelectDemo={(demo) => handleSelectDemo(demo, true)}
              />
            )}
          </div>
        )}

        {/* State 2: Progressively Analyzing with Gemma 4 */}
        {isAnalyzing && (
          <div className="py-16 sm:py-24">
            <AnalysisProgress isDone={false} />
          </div>
        )}

        {/* State 3: Active Action Dashboard */}
        {analysis && !isAnalyzing && (
          <div className="space-y-6 animate-fade-in">
            {/* Action Summary Banner */}
            <ActionSummary
              actionRequired={analysis.actionRequired}
              deadline={analysis.deadline}
              urgency={analysis.urgency}
              amount={analysis.amount}
              modelUsed={modelUsed}
            />

            {/* Quick Actions Bar */}
            <div className="py-1 border-y border-[#27272A]/80">
              <QuickActions
                onExplainSimply={() => setIsExplainOpen(true)}
                onScrollToChat={handleScrollToChat}
                onReanalyze={handleAnalyzeClick}
                onNewDocument={handleNewDocument}
                analysis={analysis}
              />
            </div>

            {/* Main Result Workspace: Desktop Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Document Preview */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-20">
                <DocumentPreview
                  previewUrl={previewUrl}
                  fileName={fileName}
                  documentType={analysis.documentType}
                  onReplace={handleNewDocument}
                  onReanalyze={handleAnalyzeClick}
                  isAnalyzing={isAnalyzing}
                />
              </div>

              {/* Right Column: Obligations, Checklist, Next Steps, Chat */}
              <div className="lg:col-span-7 space-y-5">
                {/* What is this & Audience */}
                <InformationCard
                  documentType={analysis.documentType}
                  summary={analysis.summary}
                  audience={analysis.audience}
                />

                {/* Next Steps (Signature Action Plan) */}
                <NextSteps steps={analysis.nextSteps} />

                {/* Required Items Checklist */}
                <RequiredItems items={analysis.requiredItems} />

                {/* Warnings & Consequences */}
                <WarningCard
                  warnings={analysis.warnings}
                  consequences={analysis.consequences}
                />

                {/* Ask This Document (Grounding Chat) */}
                <div ref={chatSectionRef} id="chat-section">
                  <DocumentChat
                    analysis={analysis}
                    suggestedQuestions={currentDemo?.sampleQuestions}
                    demoId={activeDemoId}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Explain Simply Modal */}
      {analysis && (
        <ExplainSimply
          analysis={analysis}
          demoId={activeDemoId}
          isOpen={isExplainOpen}
          onClose={() => setIsExplainOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-[#27272A] py-6 mt-12 bg-[#09090B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#FAFAFA]">Document2Action</span>
            <span>• Turn confusing documents into clear actions.</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by Gemma 4 Multimodal AI</span>
            <span>•</span>
            <span>Google Gen AI Hackathon MVP</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
