"use strict";
import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, CornerDownLeft, Loader2, HelpCircle } from "lucide-react";
import { DocumentAnalysis, ChatMessage } from "@/types/document";

interface DocumentChatProps {
  analysis: DocumentAnalysis;
  suggestedQuestions?: string[];
  demoId?: string | null;
}

const DEFAULT_SUGGESTIONS = [
  "What is the final deadline?",
  "How much do I need to pay?",
  "What happens if I miss the date?",
  "What documents do I need to prepare?",
];

export function DocumentChat({
  analysis,
  suggestedQuestions = DEFAULT_SUGGESTIONS,
  demoId,
}: DocumentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-welcome",
      role: "assistant",
      content: `I've analyzed your ${analysis.documentType}. Ask me any specific question about dates, fees, required paperwork, or rules mentioned in this document.`,
      timestamp: Date.now(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = (queryText || inputValue).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: textToSend,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: textToSend,
          analysis,
          conversationHistory: messages,
          demoId,
        }),
      });

      const data = await res.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "assistant",
        content: data.success && data.answer
          ? data.answer
          : "I couldn't find that information in the document.",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${Date.now()}`,
          role: "assistant",
          content: "I couldn't find that information in the document.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="rounded-2xl border border-[#27272A] bg-[#111113] overflow-hidden flex flex-col h-[520px]">
      {/* Chat Header */}
      <div className="px-5 py-3.5 border-b border-[#27272A] bg-[#18181B]/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
            <HelpCircle className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#FAFAFA]">
              Ask This Document
            </h3>
            <p className="text-[10px] text-[#A1A1AA]">
              Answers strictly grounded on the uploaded text &amp; layout
            </p>
          </div>
        </div>

        <span className="text-[11px] font-medium text-indigo-400 flex items-center gap-1">
          <Sparkles className="h-3 w-3" />
          Gemma 4 Grounded
        </span>
      </div>

      {/* Suggested Questions Pills */}
      <div className="px-4 py-2.5 bg-[#141416] border-b border-[#27272A]/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <span className="text-[10px] uppercase font-bold text-[#71717A] flex-shrink-0 mr-1">
          Quick:
        </span>
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(q)}
            disabled={isLoading}
            className="flex-shrink-0 text-left rounded-full border border-[#27272A] bg-[#18181B] px-2.5 py-1 text-[11px] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-indigo-500/50 hover:bg-indigo-950/20 transition-all disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-lg flex-shrink-0 text-xs ${
                  isUser
                    ? "bg-indigo-600 text-white"
                    : "bg-[#18181B] border border-[#27272A] text-indigo-400"
                }`}
              >
                {isUser ? <User className="h-3.5 w-3.5" /> : <Bot className="h-3.5 w-3.5" />}
              </div>

              <div
                className={`rounded-2xl px-4 py-2.5 max-w-[85%] text-xs leading-relaxed ${
                  isUser
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-[#18181B] border border-[#27272A] text-[#FAFAFA] rounded-tl-none shadow-sm"
                }`}
              >
                {m.content}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#18181B] border border-[#27272A] text-indigo-400 flex-shrink-0">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="rounded-2xl rounded-tl-none border border-[#27272A] bg-[#18181B] px-4 py-2.5 text-xs text-[#A1A1AA] flex items-center gap-2">
              <Loader2 className="h-3.5 w-3.5 text-indigo-400 animate-spin" />
              <span>Verifying document evidence...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-[#27272A] bg-[#18181B]/50">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Ask anything about this document..."
            className="w-full rounded-xl border border-[#27272A] bg-[#111113] px-3.5 py-2.5 text-xs text-[#FAFAFA] placeholder-[#71717A] focus:border-indigo-500 focus:outline-none pr-10"
          />
          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-1.5 p-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
