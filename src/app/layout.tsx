import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Document2Action — Turn Confusing Documents Into Clear Actions",
  description:
    "Gemma 4 multimodal intelligence that transforms complex letters, bills, examination notices, and government forms into a prioritized action plan.",
  keywords: [
    "document analysis",
    "Gemma 4",
    "Google Gemini",
    "action plan",
    "deadline tracker",
    "bill explanation",
  ],
  authors: [{ name: "Document2Action Team" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090B] text-[#FAFAFA] min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
