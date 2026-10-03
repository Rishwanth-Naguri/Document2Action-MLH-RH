import { NextRequest, NextResponse } from "next/server";
import { analyzeDocumentWithGemma } from "@/lib/gemini";
import { DEMO_DOCUMENTS } from "@/lib/demoData";

export const maxDuration = 60; // Allow sufficient time for multimodal AI processing

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileBase64, mimeType, contextHint, isDemo, demoId } = body;

    // Fast-path for demo document if explicit demo flag is requested or if API key is missing
    const hasApiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here");

    if (isDemo && demoId) {
      const demoDoc = DEMO_DOCUMENTS.find((d) => d.id === demoId);
      if (demoDoc) {
        // If API key is available, run live AI on the demo document so judges see real live analysis!
        if (hasApiKey) {
          try {
            const liveResult = await analyzeDocumentWithGemma(
              demoDoc.base64Data,
              demoDoc.mimeType,
              contextHint || demoDoc.category
            );
            return NextResponse.json({
              success: true,
              analysis: liveResult.analysis,
              modelUsed: liveResult.modelUsed,
              isLiveAI: true,
            });
          } catch (liveErr) {
            console.warn("Live analysis on demo fallback triggered:", liveErr);
            // Fall back to fixture if AI quota/temporary error occurs
            return NextResponse.json({
              success: true,
              analysis: demoDoc.fixtureAnalysis,
              modelUsed: "demo-fixture",
              isLiveAI: false,
              note: "Loaded verified demo fixture (AI temporarily unavailable)",
            });
          }
        } else {
          // No API key configured: return verified fixture
          return NextResponse.json({
            success: true,
            analysis: demoDoc.fixtureAnalysis,
            modelUsed: "demo-fixture",
            isLiveAI: false,
            note: "Demo mode: Add GEMINI_API_KEY in .env.local for live custom uploads.",
          });
        }
      }
    }

    if (!fileBase64) {
      return NextResponse.json(
        { success: false, error: "Please upload a document first." },
        { status: 400 }
      );
    }

    // Check payload size (~10MB limit in base64 is ~13.5MB string)
    if (fileBase64.length > 15 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "This document is too large. Please upload a file under 10MB." },
        { status: 413 }
      );
    }

    // Supported MIME types
    const validMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "application/pdf",
    ];

    const normalizedMime = mimeType?.toLowerCase() || "image/png";
    if (!validMimes.includes(normalizedMime)) {
      return NextResponse.json(
        {
          success: false,
          error: "This file type isn't supported yet. Try JPG, PNG, or PDF.",
        },
        { status: 415 }
      );
    }

    if (!hasApiKey) {
      return NextResponse.json(
        {
          success: false,
          error:
            "GEMINI_API_KEY is not configured on the server. Please add your GEMINI_API_KEY in .env.local to enable live AI analysis, or click 'Try Live Demo' to explore demo documents.",
        },
        { status: 503 }
      );
    }

    // Clean base64 string if data URL prefix was included
    let cleanBase64 = fileBase64;
    if (cleanBase64.includes(",")) {
      cleanBase64 = cleanBase64.split(",")[1];
    }

    const { analysis, modelUsed } = await analyzeDocumentWithGemma(
      cleanBase64,
      normalizedMime,
      contextHint
    );

    return NextResponse.json({
      success: true,
      analysis,
      modelUsed,
      isLiveAI: true,
    });
  } catch (error: unknown) {
    console.error("API /api/analyze error:", error);
    const message = error instanceof Error ? error.message : "Failed to analyze document.";
    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 500 }
    );
  }
}
