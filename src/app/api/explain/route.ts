import { NextRequest, NextResponse } from "next/server";
import { explainDocumentSimply } from "@/lib/gemini";
import { DEMO_DOCUMENTS } from "@/lib/demoData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { analysis, demoId } = body;

    if (!analysis) {
      return NextResponse.json(
        { success: false, error: "Missing document analysis." },
        { status: 400 }
      );
    }

    const hasApiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here");

    if (hasApiKey) {
      try {
        const explanation = await explainDocumentSimply(analysis);
        return NextResponse.json({ success: true, explanation });
      } catch (err) {
        console.warn("explainDocumentSimply fallback:", err);
      }
    }

    // Fallback to demo fixture explanation if demoId provided
    if (demoId) {
      const demo = DEMO_DOCUMENTS.find((d) => d.id === demoId);
      if (demo) {
        return NextResponse.json({ success: true, explanation: demo.simpleExplanation });
      }
    }

    // Default template fallback
    const fallbackText = `In simple words:\nThis is a ${analysis.documentType}. You need to ${analysis.actionRequired || "review the details"}${analysis.deadline ? ` by ${analysis.deadline}` : ""}.${analysis.amount && analysis.amount !== "No amount detected" ? ` The amount payable is ${analysis.amount}.` : ""} Make sure you keep your required documents ready. That's all you need to do right now.`;

    return NextResponse.json({ success: true, explanation: fallbackText });
  } catch (error: unknown) {
    console.error("API /api/explain error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate simple explanation." },
      { status: 500 }
    );
  }
}
