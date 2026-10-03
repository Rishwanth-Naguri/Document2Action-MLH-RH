# Document2Action

> **Turn confusing documents into clear actions.**  
> Powered by **Gemma 4** multimodal intelligence via the Google Gemini API.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Google Gen AI](https://img.shields.io/badge/Google_Gen_AI-Gemma_4-4285F4?logo=google)](https://ai.google.dev/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

---

## Problem

Every day, students, families, small business owners, and working professionals receive official notices, examination circulars, utility bills, tax letters, and legal notices written in dense, bureaucratic legalese. 

When people receive these documents, they struggle with fundamental questions:
1. **What does this document actually mean?**
2. **What do I urgently need to do?**
3. **When is the absolute deadline?**
4. **How much money is involved?**
5. **What documents do I need to prepare?**
6. **What catastrophic penalty or consequence occurs if I miss it?**

Most document AI tools simply summarize paragraphs of text. But reading a summary still leaves the user wondering: *"Okay, but what is my next step?"*

---

## Solution

**Document2Action** is NOT just a document summarizer. 

It is an **action-extraction engine**:
> **Upload a document &rarr; Understand structure &rarr; Extract obligations &rarr; Identify deadlines &rarr; Execute a prioritized action plan.**

Using **Gemma 4 multimodal intelligence**, Document2Action reads both visual layout (official seals, callout boxes, stamps, headers, tables) and textual nuances to translate confusing paperwork into an immediate, checkable checklist.

---

## User Experience Flow

```text
LANDING / DASHBOARD
        ↓
UPLOAD DOCUMENT (Dropzone or Sample Fixture)
        ↓
DOCUMENT PREVIEW & CONTEXT HINT (Auto Detect / Category)
        ↓
ANALYZE WITH GEMMA 4
        ↓
PROGRESSIVE INTELLIGENCE ANIMATION
        ↓
ACTION DASHBOARD
        ↓
[ ACTION SUMMARY ]  [ NEXT STEPS 01..04 ]  [ EXPLAIN SIMPLY ]  [ ASK THIS DOCUMENT ]
```

---

## Key Features

- **Multimodal Visual Understanding**: Analyzes complex layouts, stamps, dates, fee boxes, and tables from JPG, PNG, and PDF documents.
- **Top-Level Action Summary**: Instant clarity on **Action Required**, **Deadline**, **Urgency (Low / Medium / High)**, and **Amount Due**.
- **Numbered Next Steps Action Sequence**: Signature sequential action plan (e.g. `01`, `02`, `03`) with interactive click-to-complete tracking.
- **Prerequisite Checklist**: Identifies ID cards, certificates, attendance requirements, and portal URLs needed before acting.
- **Warnings & Penalties Radar**: Highlights critical late fees, disconnections, debarments, or statutory liens before it's too late.
- **"Explain Simply"**: One-click transformation of bureaucratic jargon into clear, reassuring plain English (`"In simple words: ..."`).
- **"Ask This Document" (Grounded Q&A)**: Document-specific chat with suggested question pills. The AI answers strictly from the document layout and text without hallucinating.
- **One-Click Demo Fixtures**: Ready-to-evaluate synthetic test cases (College Exam Notice, Electricity Bill, Government Property Tax Notice) for instant hackathon evaluation.
- **Sleek Minimalist Dark UI**: Inspired by Linear and Google AI aesthetics (`#09090B` background, `#111113` surface, `#27272A` borders, `#FAFAFA` typography).

---

## Why Gemma 4 Matters

Traditional text-only language models miss spatial relationships in real-world paperwork—such as fine print buried in footers, deadline callout boxes highlighted in red borders, or fee amounts positioned opposite customer account numbers in tabular invoices.

**Gemma 4 multimodal reasoning** bridges this gap:
1. **Spatial & Visual Layout Comprehension**: Understands whether a date is a date of issuance or an immovable submission deadline based on visual positioning.
2. **Dense Document Grounding**: Prevents hallucinations by strictly grounding obligations on visible document evidence.
3. **Low Latency & High Precision**: Rapidly extracts structured JSON fields without sluggish processing times.

---

## Architecture

```text
┌───────────────────────────────────────────────────────────┐
│                    Next.js Client UI                      │
│   (UploadZone • DocumentPreview • NextSteps • Chat)       │
└─────────────────────────────┬─────────────────────────────┘
                              │ JSON payload (Base64 file / context)
                              ▼
┌───────────────────────────────────────────────────────────┐
│                 Server API Routes (Next.js)               │
│        /api/analyze  •  /api/explain  •  /api/ask         │
│   • Validates payload size (10MB limit) & MIME types      │
│   • Protects GEMINI_API_KEY server-side                   │
│   • Defensively validates & sanitizes JSON schemas        │
└─────────────────────────────┬─────────────────────────────┘
                              │ Official Google Gen AI SDK
                              ▼
┌───────────────────────────────────────────────────────────┐
│                 Google Gemini API Service                 │
│         Gemma 4 Multimodal Model (gemma-4-31b-it)          │
│       (with robust failover to Gemini 2.5 / 1.5 Flash)    │
└───────────────────────────────────────────────────────────┘
```

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript (Strict mode)
- **Styling**: Tailwind CSS with custom dark mode tokens
- **Icons**: Lucide React
- **AI SDK**: Official `@google/genai` & `@google/generative-ai`
- **Model**: `gemma-4-31b-it` (configurable via `GEMMA_MODEL`)

---

## Getting Started

### Prerequisites

- Node.js 18.18+ or 20+ (Node 22 recommended)
- A Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone & Install

```bash
git clone <repository-url>
cd document2action
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Google Gemini API Key (Kept strictly server-side)
GEMINI_API_KEY=your_gemini_api_key_here

# Gemma 4 multimodal model (fallback to gemini-2.5-flash if needed)
GEMMA_MODEL=gemma-4-31b-it
```

> **Note**: For hackathon judging or local evaluation, Document2Action includes interactive synthetic demo fixtures that can be explored immediately even before configuring an API key.

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment (Vercel)

Document2Action is built to deploy seamlessly to **Vercel**:

1. Push your repository to GitHub.
2. Import the project in the [Vercel Dashboard](https://vercel.com).
3. Add the Environment Variable in Vercel Project Settings:
   - `GEMINI_API_KEY` = `your_gemini_api_key`
   - `GEMMA_MODEL` = `gemma-4-31b-it`
4. Deploy!

---

## Security & Privacy

- **Server-Side Credentials**: `GEMINI_API_KEY` is strictly accessed in server API routes and never exposed to the client.
- **Zero Persistent Storage**: Files are processed in-memory for the active session without database persistence.
- **Defensive Parsing**: System sanitizes and validates all model responses to guard against schema injection.

---

## Future Improvements

- Multi-page document aggregation and comparison.
- Calendar integration (one-click export to Google Calendar / Apple Reminders with alerts).
- SMS / WhatsApp deadline notification bot.
- Multi-language translation into 20+ regional languages.

---

## License

MIT License. Built for the Google Gen AI Hackathon.
