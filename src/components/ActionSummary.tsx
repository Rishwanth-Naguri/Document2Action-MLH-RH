"use strict";
import React from "react";
import { Urgency } from "@/types/document";
import { AlertTriangle, Clock, Banknote, ShieldAlert, CheckCircle } from "lucide-react";

interface ActionSummaryProps {
  actionRequired: string | null;
  deadline: string | null;
  urgency: Urgency;
  amount: string | null;
  modelUsed?: string;
}

export function ActionSummary({
  actionRequired,
  deadline,
  urgency,
  amount,
  modelUsed,
}: ActionSummaryProps) {
  const urgencyStyles = {
    high: {
      badge: "border-rose-500/40 bg-rose-500/10 text-rose-300",
      glow: "border-rose-500/30 bg-gradient-to-b from-rose-950/20 to-transparent",
      icon: AlertTriangle,
      label: "HIGH URGENCY",
    },
    medium: {
      badge: "border-amber-500/40 bg-amber-500/10 text-amber-300",
      glow: "border-amber-500/30 bg-gradient-to-b from-amber-950/20 to-transparent",
      icon: Clock,
      label: "MEDIUM URGENCY",
    },
    low: {
      badge: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
      glow: "border-emerald-500/30 bg-gradient-to-b from-emerald-950/20 to-transparent",
      icon: CheckCircle,
      label: "LOW URGENCY",
    },
  }[urgency];

  const UrgencyIcon = urgencyStyles.icon;

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 transition-all shadow-xl ${urgencyStyles.glow}`}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#27272A]">
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-wider ${urgencyStyles.badge}`}
          >
            <UrgencyIcon className="h-3.5 w-3.5" />
            {urgencyStyles.label}
          </span>
          {modelUsed && (
            <span className="text-[11px] font-mono text-[#71717A] hidden sm:inline">
              Model: {modelUsed}
            </span>
          )}
        </div>

        {amount && amount !== "No amount detected" && (
          <div className="inline-flex items-center gap-1.5 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300">
            <Banknote className="h-3.5 w-3.5" />
            <span>Amount: {amount}</span>
          </div>
        )}
      </div>

      {/* Main Focus: ACTION REQUIRED */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-1.5">
          <span className="text-[11px] font-bold uppercase tracking-widest text-indigo-400">
            Primary Action Required
          </span>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FAFAFA] leading-snug">
            {actionRequired || "Review this document and follow indicated steps."}
          </h2>
        </div>

        {/* Deadline Column */}
        <div className="md:col-span-4 rounded-xl border border-[#27272A] bg-[#18181B]/80 p-3.5 flex flex-col justify-center">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#A1A1AA] flex items-center gap-1">
            <Clock className="h-3 w-3 text-indigo-400" />
            Deadline
          </span>
          <span
            className={`text-lg sm:text-xl font-extrabold mt-1 tracking-tight ${
              deadline && deadline !== "No deadline detected"
                ? "text-rose-400"
                : "text-[#A1A1AA]"
            }`}
          >
            {deadline || "No deadline detected"}
          </span>
        </div>
      </div>
    </div>
  );
}
