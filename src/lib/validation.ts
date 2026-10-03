import { DocumentAnalysis, Urgency } from "@/types/document";

export function cleanJsonString(raw: string): string {
  let cleaned = raw.trim();
  // Strip markdown code fences if present (```json ... ``` or ``` ...)
  if (cleaned.startsWith("```")) {
    const lines = cleaned.split("\n");
    // Remove first line (e.g. ```json)
    lines.shift();
    // Remove last line if it is ```
    if (lines.length > 0 && lines[lines.length - 1].trim().startsWith("```")) {
      lines.pop();
    }
    cleaned = lines.join("\n").trim();
  }

  // Find first { and last } to discard any preamble or trailing comments
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  return cleaned;
}

export function validateAndNormalizeAnalysis(rawJson: unknown): DocumentAnalysis {
  if (typeof rawJson !== "object" || rawJson === null) {
    throw new Error("Invalid response format: expected a JSON object");
  }

  const obj = rawJson as Record<string, unknown>;

  const validUrgencies: Urgency[] = ["low", "medium", "high"];
  let urgency: Urgency = "medium";
  if (typeof obj.urgency === "string") {
    const lower = obj.urgency.toLowerCase().trim();
    if (validUrgencies.includes(lower as Urgency)) {
      urgency = lower as Urgency;
    }
  }

  const toStringOrNull = (val: unknown): string | null => {
    if (typeof val === "string" && val.trim().length > 0) {
      const trimmed = val.trim();
      if (trimmed.toLowerCase() === "null" || trimmed.toLowerCase() === "none") return null;
      return trimmed;
    }
    return null;
  };

  const toStringArray = (val: unknown): string[] => {
    if (Array.isArray(val)) {
      return val
        .map((item) => (typeof item === "string" ? item.trim() : String(item).trim()))
        .filter((item) => item.length > 0);
    }
    if (typeof val === "string" && val.trim().length > 0) {
      return [val.trim()];
    }
    return [];
  };

  const analysis: DocumentAnalysis = {
    documentType: typeof obj.documentType === "string" && obj.documentType.trim() ? obj.documentType.trim() : "Official Document",
    summary: typeof obj.summary === "string" && obj.summary.trim() ? obj.summary.trim() : "Document parsed with actionable guidance below.",
    audience: toStringOrNull(obj.audience),
    urgency,
    actionRequired: toStringOrNull(obj.actionRequired) || "Review document details and follow indicated instructions.",
    deadline: toStringOrNull(obj.deadline) || "No deadline detected",
    amount: toStringOrNull(obj.amount) || "No amount detected",
    requiredItems: toStringArray(obj.requiredItems),
    warnings: toStringArray(obj.warnings),
    consequences: toStringArray(obj.consequences),
    nextSteps: toStringArray(obj.nextSteps),
    unclearInformation: toStringArray(obj.unclearInformation),
    confidenceNotes: toStringArray(obj.confidenceNotes),
  };

  // Ensure nextSteps has at least one step if actionRequired is present
  if (analysis.nextSteps.length === 0 && analysis.actionRequired) {
    analysis.nextSteps = [analysis.actionRequired];
  }

  return analysis;
}
