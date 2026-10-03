"use strict";
import React from "react";
import { HelpCircle, Users, FileText, CheckCircle2 } from "lucide-react";

interface InformationCardProps {
  documentType: string;
  summary: string;
  audience: string | null;
}

export function InformationCard({
  documentType,
  summary,
  audience,
}: InformationCardProps) {
  return (
    <div className="rounded-2xl border border-[#27272A] bg-[#111113] p-5 sm:p-6 space-y-4">
      {/* What is this? */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <HelpCircle className="h-4 w-4 text-indigo-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA]">
            What is this?
          </h3>
        </div>
        <p className="text-base font-semibold text-[#FAFAFA]">{documentType}</p>
        <p className="mt-1 text-sm text-[#A1A1AA] leading-relaxed">{summary}</p>
      </div>

      {/* Target Audience */}
      {audience && (
        <div className="pt-3 border-t border-[#27272A]/70 flex items-start gap-2.5 text-xs text-[#A1A1AA]">
          <Users className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#FAFAFA]">Target Audience: </span>
            <span>{audience}</span>
          </div>
        </div>
      )}
    </div>
  );
}
