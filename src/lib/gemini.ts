import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  SYSTEM_ANALYSIS_PROMPT,
  SYSTEM_EXPLAIN_PROMPT,
  SYSTEM_CHAT_PROMPT,
} from "./prompts";
import { cleanJsonString, validateAndNormalizeAnalysis } from "./validation";
import { DocumentAnalysis, ChatMessage } from "@/types/document";

const API_KEY = process.env.GEMINI_API_KEY;
const DEFAULT_MODEL = process.env.GEMMA_MODEL || "gemma-4-31b-it";
// Reliable fallback models in case the specific Gemma 4 checkpoint identifier differs in the user's region/tier
const FALLBACK_MODELS = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-1.5-pro"];

function getGenAI(): GoogleGenerativeAI {
  if (!API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not configured in the server environment. Please set GEMINI_API_KEY in your .env.local file."
    );
  }
  return new GoogleGenerativeAI(API_KEY);
}

export async function analyzeDocumentWithGemma(
  base64Data: string,
  mimeType: string,
  contextHint?: string
): Promise<{ analysis: DocumentAnalysis; modelUsed: string }> {
  const genAI = getGenAI();

  const userContextPrompt = contextHint && contextHint !== "auto"
    ? `\n\n[USER PROVIDED HINT]: The user specified that this document category is: "${contextHint.toUpperCase()}". Factor this into your interpretation.`
    : "";

  const prompt = `${SYSTEM_ANALYSIS_PROMPT}${userContextPrompt}`;

  const imagePart = {
    inlineData: {
      data: base64Data,
      mimeType: mimeType,
    },
  };

  const modelsToTry = [DEFAULT_MODEL, ...FALLBACK_MODELS.filter((m) => m !== DEFAULT_MODEL)];
  let lastError: Error | null = null;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          temperature: 0.1,
          responseMimeType: "application/json",
        },
      });

      const result = await model.generateContent([imagePart, prompt]);
      const response = await result.response;
      const text = response.text();

      const cleaned = cleanJsonString(text);
      const parsed = JSON.parse(cleaned);
      const normalized = validateAndNormalizeAnalysis(parsed);

      return {
        analysis: normalized,
        modelUsed: modelName,
      };
    } catch (err: unknown) {
      console.warn(`Model ${modelName} attempt failed or model not available:`, (err as Error).message);
      lastError = err as Error;
      // If error is JSON parse error from response, don't necessarily skip model unless it returned invalid format
    }
  }

  throw new Error(
    `Failed to analyze document with AI models (${modelsToTry.join(", ")}): ${lastError?.message || "Unknown error"}`
  );
}

export async function explainDocumentSimply(
  analysis: DocumentAnalysis
): Promise<string> {
  const genAI = getGenAI();
  const modelsToTry = [DEFAULT_MODEL, ...FALLBACK_MODELS.filter((m) => m !== DEFAULT_MODEL)];

  const prompt = `${SYSTEM_EXPLAIN_PROMPT}

Document Information:
- Type: ${analysis.documentType}
- Summary: ${analysis.summary}
- Audience: ${analysis.audience || "General recipient"}
- Required Action: ${analysis.actionRequired || "None"}
- Deadline: ${analysis.deadline || "No deadline"}
- Amount: ${analysis.amount || "None"}
- Required Items: ${analysis.requiredItems.join(", ") || "None"}
- Next Steps: ${analysis.nextSteps.join(" -> ")}
- Warnings: ${analysis.warnings.join("; ") || "None"}`;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { temperature: 0.2 },
      });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (err) {
      console.warn(`Model ${modelName} failed for explain simply:`, (err as Error).message);
    }
  }

  // Graceful deterministic fallback if AI is rate limited
  return `In simple words:\nThis is a ${analysis.documentType}. You need to ${analysis.actionRequired || "review this document"}${analysis.deadline ? ` before ${analysis.deadline}` : ""}.${analysis.amount && analysis.amount !== "No amount detected" ? ` The amount involved is ${analysis.amount}.` : ""} Keep your documents ready. That's all you need to do right now.`;
}

export async function askDocumentQuestion(
  question: string,
  analysis: DocumentAnalysis,
  conversationHistory: ChatMessage[] = []
): Promise<string> {
  const genAI = getGenAI();
  const modelsToTry = [DEFAULT_MODEL, ...FALLBACK_MODELS.filter((m) => m !== DEFAULT_MODEL)];

  const historyContext = conversationHistory
    .slice(-4)
    .map((m) => `${m.role === "user" ? "User" : "Document2Action"}: ${m.content}`)
    .join("\n");

  const prompt = `${SYSTEM_CHAT_PROMPT}

Document Context:
- Document Type: ${analysis.documentType}
- Summary: ${analysis.summary}
- Target Audience: ${analysis.audience || "Not specified"}
- Primary Action Required: ${analysis.actionRequired || "None specified"}
- Deadline: ${analysis.deadline || "No deadline detected"}
- Amount: ${analysis.amount || "No amount detected"}
- Required Items: ${JSON.stringify(analysis.requiredItems)}
- Important Warnings: ${JSON.stringify(analysis.warnings)}
- Consequences: ${JSON.stringify(analysis.consequences)}
- Next Steps: ${JSON.stringify(analysis.nextSteps)}
- Unclear Info: ${JSON.stringify(analysis.unclearInformation)}

${historyContext ? `Recent Chat History:\n${historyContext}\n` : ""}
User Question: "${question}"

Provide a direct, concise, factual answer based strictly on the document context above.`;

  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { temperature: 0.1 },
      });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text().trim();
    } catch (err) {
      console.warn(`Model ${modelName} failed for ask question:`, (err as Error).message);
    }
  }

  return "I couldn't find that information in the document.";
}
