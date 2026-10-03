"use strict";
import React from "react";
import { DocumentContextType } from "@/types/document";
import {
  Sparkles,
  GraduationCap,
  Landmark,
  Building2,
  Receipt,
  Shield,
  Briefcase,
  Scale,
  FileQuestion,
} from "lucide-react";

interface ContextSelectorProps {
  selectedContext: DocumentContextType;
  onChange: (context: DocumentContextType) => void;
  disabled?: boolean;
}

const CONTEXT_OPTIONS: {
  id: DocumentContextType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "auto", label: "Auto Detect", icon: Sparkles },
  { id: "education", label: "College / Education", icon: GraduationCap },
  { id: "government", label: "Government", icon: Landmark },
  { id: "finance", label: "Bank / Finance", icon: Building2 },
  { id: "bill", label: "Bill / Invoice", icon: Receipt },
  { id: "insurance", label: "Insurance", icon: Shield },
  { id: "workplace", label: "Workplace", icon: Briefcase },
  { id: "legal", label: "Legal / Agreement", icon: Scale },
  { id: "other", label: "Other", icon: FileQuestion },
];

export function ContextSelector({
  selectedContext,
  onChange,
  disabled = false,
}: ContextSelectorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
          Document Category Hint <span className="text-[#71717A] lowercase font-normal">(optional)</span>
        </label>
        <span className="text-[11px] text-indigo-400 font-medium">
          Context hint for Gemma 4
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {CONTEXT_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedContext === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(opt.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                isSelected
                  ? "bg-indigo-600/20 border border-indigo-500/80 text-indigo-200 shadow-sm shadow-indigo-500/10"
                  : "bg-[#18181B] border border-[#27272A] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#3F3F46]"
              } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-indigo-400" : "text-[#71717A]"}`} />
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
