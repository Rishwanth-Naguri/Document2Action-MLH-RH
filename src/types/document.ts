export type Urgency = "low" | "medium" | "high";

export type DocumentContextType =
  | "auto"
  | "education"
  | "government"
  | "finance"
  | "bill"
  | "insurance"
  | "workplace"
  | "legal"
  | "other";

export interface DocumentAnalysis {
  documentType: string;
  summary: string;
  audience: string | null;
  urgency: Urgency;
  actionRequired: string | null;
  deadline: string | null;
  amount: string | null;
  requiredItems: string[];
  warnings: string[];
  consequences: string[];
  nextSteps: string[];
  unclearInformation: string[];
  confidenceNotes: string[];
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export type ProcessingStage =
  | "idle"
  | "received"
  | "reading"
  | "identifying"
  | "extracting"
  | "building"
  | "completed";
