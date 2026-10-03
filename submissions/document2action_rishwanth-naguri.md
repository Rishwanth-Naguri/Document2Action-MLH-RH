# Document2Action

## Team / attendee

- Team name (if applicable): Document2Action Team
- Members and GitHub usernames: Rishwanth Naguri (@Rishwanth-Naguri)
- Profile links (optional): https://github.com/Rishwanth-Naguri

## Challenge

Select the challenge you are entering:

- [ ] Best Open-Source AI Project
- [x] Best Use of Gemma 4
- [ ] Build on elah

## Project links

- Public GitHub repository: https://github.com/Rishwanth-Naguri/Document2Action-MLH-RH
- Open-source license (link to the license file): [LICENSE](LICENSE)

## Problem and solution

Every day, students, families, small business owners, and working professionals receive official notices, examination circulars, utility bills, tax letters, and legal notices written in dense, bureaucratic legalese. 

When people receive these documents, they don't know:
1. What the document actually means
2. What they urgently need to do
3. When the non-negotiable deadline is
4. How much money is involved
5. What paperwork they need to prepare
6. What penalties or consequences occur if they miss it

**Solution**:
Document2Action uses **Gemma 4 multimodal intelligence** via the Gemini API to transform complex documents into an immediate, checkable action plan.
Input: Uploaded document (PDF, PNG, JPG, or SVG) with an optional context hint.
Output: Top-level action summary (Action, Deadline, Urgency, Amount), a prioritized numbered action sequence (`01`, `02`, `03`...), a prerequisite checklist, warnings radar, a one-click plain English "Explain Simply" translation, and an interactive "Ask This Document" chat grounded on the document.

## Approach and technologies

- **Framework**: Next.js 16 (App Router, Turbopack) & React 19
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS with custom dark mode tokens (`#09090B`, `#111113`, `#27272A`)
- **AI SDK**: Official Google Gen AI SDK (`@google/genai` & `@google/generative-ai`)
- **AI Model**: Gemma 4 multimodal model (`gemma-4-31b-it` configured via `GEMMA_MODEL` with resilient fallback)
- **Icons**: Lucide React

## Challenge evidence

### Best Use of Gemma 4

- **Gemma 4 model identifier and Gemini API integration**:
  Configured with `GEMMA_MODEL=gemma-4-31b-it` via official Google Gemini API SDK (`@google/genai` & `@google/generative-ai`).
- **Code link showing the integration**:
  - Model caller & prompts: [`src/lib/gemini.ts`](src/lib/gemini.ts) & [`src/lib/prompts.ts`](src/lib/prompts.ts)
  - API Routes: [`src/app/api/analyze/route.ts`](src/app/api/analyze/route.ts), [`src/app/api/explain/route.ts`](src/app/api/explain/route.ts), [`src/app/api/ask/route.ts`](src/app/api/ask/route.ts)
- **Input and useful output; multimodal value where applicable**:
  Multimodal input (image layout, seals, tabular invoices, fine print, callout boxes) is analyzed directly by Gemma 4 to extract spatial and textual obligations. The output is structured JSON strictly validated on the server into:
  - Immediate Action Required
  - Absolute Submission Deadline
  - Urgency level (`high`, `medium`, `low`)
  - Monetary Amount Due
  - Numbered Sequential Next Steps (`01`, `02`, `03`, `04`)
  - Prerequisite Checklist
  - Critical Warnings & Penalties
  - Grounded Q&A ("Ask This Document")
  - Plain English translation ("Explain Simply")

## Current status

- **What works**:
  - Full end-to-end multimodal document analysis with Gemma 4
  - Drag-and-drop file upload with live client preview (JPG, PNG, PDF, WebP, SVG)
  - Document context selector (*Auto Detect*, *College*, *Government*, *Finance*, *Bill*, *Insurance*, etc.)
  - Progressive intelligence 5-stage analysis animation
  - Comprehensive Action Dashboard with interactive checklists and step completion
  - "Explain Simply" plain English modal
  - Grounded "Ask This Document" chat with suggested question pills
  - 3 pre-seeded realistic synthetic demo fixtures for instant evaluation without setup
  - Server-side security: credentials completely hidden from client and git
- **Known limitations / incomplete features**:
  - Multi-page document aggregation is currently processed page-by-page.
- **What you would improve next**:
  - One-click export to Google Calendar and Apple Reminders for deadline alerts.
  - Automated WhatsApp/SMS reminder notifications before deadlines.

## Submission checklist

- [x] Project repository is public and links work.
- [x] Required challenge evidence is included.
- [x] Project uses an open-source license where required by the challenge.
- [x] Work and reused materials are represented honestly.
- [x] No API keys, tokens, passwords, or private data are included.
- [x] I followed the organizers' build window and submission instructions.
