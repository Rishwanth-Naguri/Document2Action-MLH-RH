import { NextRequest, NextResponse } from "next/server";
import { askDocumentQuestion } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, analysis, conversationHistory } = body;

    if (!question || typeof question !== "string") {
      return NextResponse.json(
        { success: false, error: "Please enter a valid question." },
        { status: 400 }
      );
    }

    if (!analysis) {
      return NextResponse.json(
        { success: false, error: "Missing document context." },
        { status: 400 }
      );
    }

    const hasApiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "your_gemini_api_key_here");

    if (hasApiKey) {
      const answer = await askDocumentQuestion(
        question,
        analysis,
        conversationHistory || []
      );
      return NextResponse.json({ success: true, answer });
    }

    // Offline / Demo fallback: intelligent keyword answering for demo fixtures
    const qLower = question.toLowerCase();
    let fallbackAnswer = "";

    if (qLower.includes("deadline") || qLower.includes("due date") || qLower.includes("when")) {
      fallbackAnswer = analysis.deadline && analysis.deadline !== "No deadline detected"
        ? `The deadline is ${analysis.deadline}.`
        : "No deadline detected in this document.";
    } else if (qLower.includes("fee") || qLower.includes("pay") || qLower.includes("amount") || qLower.includes("cost") || qLower.includes("how much")) {
      fallbackAnswer = analysis.amount && analysis.amount !== "No amount detected"
        ? `The amount to pay is ${analysis.amount}.`
        : "No monetary amount was detected in this document.";
    } else if (qLower.includes("miss") || qLower.includes("late") || qLower.includes("consequence") || qLower.includes("penalty")) {
      fallbackAnswer = analysis.warnings.length > 0
        ? `Warning: ${analysis.warnings.join(". ")}`
        : "No specific penalty or consequence was detected.";
    } else if (qLower.includes("document") || qLower.includes("need") || qLower.includes("bring") || qLower.includes("submit") || qLower.includes("required")) {
      fallbackAnswer = analysis.requiredItems.length > 0
        ? `You will need: ${analysis.requiredItems.join(", ")}.`
        : "No specific prerequisite documents are listed.";
    } else if (qLower.includes("who") || qLower.includes("audience") || qLower.includes("for")) {
      fallbackAnswer = analysis.audience
        ? `This document is intended for: ${analysis.audience}.`
        : `This notice is for the recipient mentioned in the ${analysis.documentType}.`;
    } else {
      fallbackAnswer = `According to this ${analysis.documentType}, your primary required action is: "${analysis.actionRequired || "review the notice"}".`;
    }

    return NextResponse.json({ success: true, answer: fallbackAnswer });
  } catch (error: unknown) {
    console.error("API /api/ask error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to answer question about document." },
      { status: 500 }
    );
  }
}
