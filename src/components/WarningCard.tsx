"use strict";
import React from "react";
import { AlertTriangle, ShieldAlert } from "lucide-react";

interface WarningCardProps {
  warnings: string[];
  consequences: string[];
}

export function WarningCard({ warnings, consequences }: WarningCardProps) {
  const allAlerts = [
    ...warnings,
    ...consequences.filter((c) => !warnings.includes(c)),
  ];

  if (allAlerts.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-950/10 p-5 sm:p-6 space-y-3">
      <div className="flex items-center gap-2 text-amber-400">
        <AlertTriangle className="h-4 w-4" />
        <h3 className="text-xs font-bold uppercase tracking-wider">
          Warnings &amp; Consequences Detected
        </h3>
      </div>

      <div className="space-y-2">
        {allAlerts.map((warning, idx) => (
          <div
            key={idx}
            className="flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed"
          >
            <span className="text-amber-400 font-bold">•</span>
            <span>{warning}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
