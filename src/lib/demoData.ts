import { DocumentAnalysis } from "@/types/document";

export interface DemoDocument {
  id: string;
  name: string;
  category: string;
  badge: string;
  previewUrl: string;
  base64Data: string;
  mimeType: string;
  fixtureAnalysis: DocumentAnalysis;
  sampleQuestions: string[];
  simpleExplanation: string;
}

// High-fidelity synthetic SVG document 1: College Examination Notice
const collegeNoticeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="800" height="1050" style="background:#ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <rect width="800" height="1050" fill="#ffffff" />
  
  <!-- Header Bar -->
  <rect x="0" y="0" width="800" height="16" fill="#1e3a8a" />
  
  <!-- University Crest & Title -->
  <g transform="translate(60, 45)">
    <circle cx="36" cy="36" r="32" fill="#1e3a8a" opacity="0.1" />
    <path d="M36 14 L18 25 L36 36 L54 25 Z M22 30 L22 45 C22 52 36 58 36 58 C36 58 50 52 50 45 L50 30" fill="#1e3a8a" />
    <text x="90" y="30" font-size="22" font-weight="700" fill="#0f172a" letter-spacing="-0.5">APEX INSTITUTE OF SCIENCE &amp; TECHNOLOGY</text>
    <text x="90" y="50" font-size="12" font-weight="500" fill="#64748b">OFFICE OF THE CONTROLLER OF EXAMINATIONS • NOTIFICATION REF: AIST/COE/2026/089</text>
  </g>

  <line x1="60" y1="120" x2="740" y2="120" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Document Title Box -->
  <rect x="60" y="145" width="680" height="70" rx="6" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
  <text x="400" y="176" text-anchor="middle" font-size="16" font-weight="700" fill="#1e293b" letter-spacing="0.5">OFFICIAL NOTIFICATION: END-SEMESTER EXAMINATION REGISTRATION</text>
  <text x="400" y="198" text-anchor="middle" font-size="13" font-weight="500" fill="#475569">Applicable to all B.Tech / B.E. (Semesters III, V &amp; VII) Regular &amp; Backlog Candidates</text>

  <!-- Meta Info Grid -->
  <g transform="translate(60, 245)">
    <text x="0" y="0" font-size="12" font-weight="600" fill="#64748b">DATE OF ISSUANCE:</text>
    <text x="140" y="0" font-size="13" font-weight="600" fill="#0f172a">02 October 2026</text>
    
    <text x="400" y="0" font-size="12" font-weight="600" fill="#64748b">CIRCULAR LEVEL:</text>
    <text x="520" y="0" font-size="13" font-weight="700" fill="#dc2626">MANDATORY / TIME-SENSITIVE</text>
  </g>

  <!-- Main Body Section -->
  <g transform="translate(60, 280)">
    <text x="0" y="24" font-size="14" line-height="22" fill="#334155">
      <tspan x="0" dy="0">All eligible undergraduate engineering students are hereby informed that the examination portal for the upcoming</tspan>
      <tspan x="0" dy="24">Fall 2026 Regular and Arrear Examinations is active. Students must complete their online registration and clear the</tspan>
      <tspan x="0" dy="24">mandatory examination fee without fail within the stipulated timeframe.</tspan>
    </text>
  </g>

  <!-- Key Action Callout Box -->
  <rect x="60" y="380" width="680" height="150" rx="8" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1.5" />
  <g transform="translate(90, 415)">
    <text x="0" y="0" font-size="13" font-weight="700" fill="#1e40af" letter-spacing="0.5">MANDATORY ACTION SUMMARY</text>
    
    <text x="0" y="32" font-size="14" font-weight="600" fill="#1e293b">Examination Fee Payable:</text>
    <text x="220" y="32" font-size="20" font-weight="800" fill="#0284c7">₹1,850 /-</text>
    <text x="330" y="32" font-size="12" font-weight="500" fill="#64748b">(One thousand eight hundred and fifty only)</text>
    
    <text x="0" y="65" font-size="14" font-weight="600" fill="#1e293b">Final Deadline (Without Fine):</text>
    <text x="220" y="65" font-size="18" font-weight="800" fill="#dc2626">12 October 2026 (11:59 PM IST)</text>
    
    <text x="0" y="98" font-size="14" font-weight="600" fill="#1e293b">Payment Mode:</text>
    <text x="220" y="98" font-size="13" font-weight="500" fill="#0f172a">Student ERP Portal &gt; Examination Module &gt; Online Gateway</text>
  </g>

  <!-- Requirements & Checklist -->
  <g transform="translate(60, 560)">
    <text x="0" y="0" font-size="15" font-weight="700" fill="#0f172a">PREREQUISITE DOCUMENTS &amp; DETAILS REQUIRED:</text>
    
    <rect x="0" y="15" width="680" height="100" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
    
    <text x="20" y="42" font-size="13" font-weight="600" fill="#334155">• Valid Student University Roll Number &amp; ERP Credentials</text>
    <text x="20" y="66" font-size="13" font-weight="600" fill="#334155">• Minimum Academic Attendance Certificate (75% threshold verified by HOD)</text>
    <text x="20" y="90" font-size="13" font-weight="600" fill="#334155">• No-Dues clearance from Departmental Laboratory and University Central Library</text>
  </g>

  <!-- Step-by-Step Procedure -->
  <g transform="translate(60, 695)">
    <text x="0" y="0" font-size="15" font-weight="700" fill="#0f172a">STEP-BY-STEP SUBMISSION PROCEDURE:</text>
    <text x="0" y="26" font-size="13" fill="#334155">1. Log in to https://erp.aist.edu using your Student ID and authenticated Password.</text>
    <text x="0" y="50" font-size="13" fill="#334155">2. Navigate to "Examination Services" and select the listed regular subject codes.</text>
    <text x="0" y="74" font-size="13" fill="#334155">3. Complete the online payment of ₹1,850 via UPI, NetBanking, or Debit/Credit Card.</text>
    <text x="0" y="98" font-size="13" fill="#334155">4. Download the generated e-Receipt and save a digital copy for Hall Ticket generation.</text>
  </g>

  <!-- Caution / Warning Box -->
  <rect x="60" y="825" width="680" height="95" rx="6" fill="#fffbeb" stroke="#fde68a" stroke-width="1.5" />
  <g transform="translate(85, 850)">
    <text x="0" y="0" font-size="13" font-weight="700" fill="#b45309">CRITICAL WARNINGS &amp; PENALTIES:</text>
    <text x="0" y="24" font-size="12" font-weight="600" fill="#78350f">• Late fee of ₹500 will be levied for submissions made between 13 Oct 2026 and 16 Oct 2026.</text>
    <text x="0" y="44" font-size="12" font-weight="600" fill="#78350f">• Under no circumstances will examination forms be accepted after 16 October 2026.</text>
    <text x="0" y="64" font-size="12" font-weight="600" fill="#78350f">• Failure to register will result in debarment from sitting for Fall 2026 Semester Examinations.</text>
  </g>

  <!-- Signatures -->
  <g transform="translate(60, 960)">
    <text x="0" y="20" font-size="12" font-weight="500" fill="#64748b">Issued by Authority:</text>
    <text x="0" y="38" font-size="13" font-weight="700" fill="#0f172a">Prof. Dr. R. K. Sharma</text>
    <text x="0" y="54" font-size="12" fill="#64748b">Controller of Examinations, AIST</text>

    <text x="520" y="20" font-size="12" font-weight="500" fill="#64748b">Official University Seal</text>
    <circle cx="580" cy="45" r="24" stroke="#94a3b8" stroke-dasharray="3,3" fill="none" />
    <text x="580" y="49" text-anchor="middle" font-size="9" fill="#94a3b8">VERIFIED</text>
  </g>

  <!-- Footer -->
  <rect x="0" y="1038" width="800" height="12" fill="#1e293b" />
</svg>`;

// High-fidelity synthetic SVG document 2: Utility Electricity Bill
const utilityNoticeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="800" height="1050" style="background:#ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <rect width="800" height="1050" fill="#ffffff" />
  <rect x="0" y="0" width="800" height="12" fill="#0284c7" />

  <!-- Utility Header -->
  <g transform="translate(60, 45)">
    <text x="0" y="30" font-size="24" font-weight="800" fill="#0369a1" letter-spacing="-0.5">METRO ELECTRIC &amp; POWER CORP</text>
    <text x="0" y="52" font-size="12" font-weight="600" fill="#64748b">RESIDENTIAL ELECTRICITY SERVICE INVOICE • ACCOUNT # 9042-8819-01</text>
  </g>

  <line x1="60" y1="115" x2="740" y2="115" stroke="#e2e8f0" stroke-width="1.5" />

  <!-- Account Summary Grid -->
  <rect x="60" y="135" width="680" height="110" rx="8" fill="#f8fafc" stroke="#e2e8f0" />
  <g transform="translate(85, 170)">
    <text x="0" y="0" font-size="12" fill="#64748b">CUSTOMER NAME:</text>
    <text x="0" y="20" font-size="15" font-weight="700" fill="#0f172a">David M. Miller</text>
    <text x="0" y="42" font-size="13" fill="#475569">442 Pinehurst Road, Apt 4B</text>

    <text x="250" y="0" font-size="12" fill="#64748b">BILLING CYCLE:</text>
    <text x="250" y="20" font-size="14" font-weight="600" fill="#0f172a">Sep 01 - Sep 30, 2026</text>
    <text x="250" y="42" font-size="13" fill="#475569">Meter ID: EM-8920194</text>

    <text x="470" y="0" font-size="12" fill="#64748b">INVOICE NUMBER:</text>
    <text x="470" y="20" font-size="14" font-weight="600" fill="#0f172a">INV-2026-99214</text>
    <text x="470" y="42" font-size="13" fill="#475569">Status: UNPAID</text>
  </g>

  <!-- Big Due Box -->
  <rect x="60" y="270" width="680" height="130" rx="8" fill="#fef2f2" stroke="#fecaca" stroke-width="1.5" />
  <g transform="translate(90, 310)">
    <text x="0" y="0" font-size="13" font-weight="700" fill="#991b1b">TOTAL CURRENT BALANCE DUE</text>
    <text x="0" y="42" font-size="34" font-weight="800" fill="#b91c1c">$142.80</text>

    <text x="320" y="0" font-size="13" font-weight="700" fill="#991b1b">PAYMENT DUE DATE</text>
    <text x="320" y="42" font-size="28" font-weight="800" fill="#b91c1c">October 18, 2026</text>
    <text x="320" y="70" font-size="12" font-weight="600" fill="#7f1d1d">Disconnect Notice will issue 5 days after due date</text>
  </g>

  <!-- Charges breakdown -->
  <g transform="translate(60, 440)">
    <text x="0" y="0" font-size="15" font-weight="700" fill="#0f172a">ITEMIZED CONSUMPTION &amp; CHARGES</text>
    
    <rect x="0" y="15" width="680" height="160" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
    <g transform="translate(20, 45)">
      <text x="0" y="0" font-size="13" fill="#334155">Base Grid Service Facility Fee</text>
      <text x="580" y="0" font-size="13" font-weight="600" fill="#0f172a">$22.50</text>

      <text x="0" y="30" font-size="13" fill="#334155">Electric Energy Consumption (680 kWh @ $0.145/kWh)</text>
      <text x="580" y="30" font-size="13" font-weight="600" fill="#0f172a">$98.60</text>

      <text x="0" y="60" font-size="13" fill="#334155">Clean Energy Environmental Surcharge &amp; Municipal Tax</text>
      <text x="580" y="60" font-size="13" font-weight="600" fill="#0f172a">$21.70</text>

      <line x1="0" y1="80" x2="640" y2="80" stroke="#cbd5e1" />
      <text x="0" y="105" font-size="14" font-weight="700" fill="#0f172a">Total Amount Due on or before Oct 18</text>
      <text x="580" y="105" font-size="16" font-weight="800" fill="#0f172a">$142.80</text>
    </g>
  </g>

  <!-- Action Instructions -->
  <g transform="translate(60, 645)">
    <text x="0" y="0" font-size="15" font-weight="700" fill="#0f172a">HOW TO PAY:</text>
    <text x="0" y="28" font-size="13" fill="#334155">1. Visit www.metropower.com/pay and enter Account ID: 9042-8819-01</text>
    <text x="0" y="52" font-size="13" fill="#334155">2. Or dial Automated Phone Pay at 1-800-555-0199 (available 24/7)</text>
    <text x="0" y="76" font-size="13" fill="#334155">3. Or mail check payable to "Metro Electric" with tear-off stub below</text>
  </g>

  <!-- Warning Box -->
  <rect x="60" y="765" width="680" height="90" rx="6" fill="#fffbeb" stroke="#fde68a" />
  <g transform="translate(85, 795)">
    <text x="0" y="0" font-size="13" font-weight="700" fill="#b45309">DISCONNECTION ADVISORY:</text>
    <text x="0" y="24" font-size="12" fill="#78350f">Payments received after October 18, 2026 are subject to a $15.00 late delinquency fee.</text>
    <text x="0" y="44" font-size="12" fill="#78350f">Failure to remit payment by October 25 will trigger physical utility service disconnection.</text>
  </g>
</svg>`;

// High-fidelity synthetic SVG document 3: Government Property Tax Notice
const govtNoticeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1050" width="800" height="1050" style="background:#ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <rect width="800" height="1050" fill="#ffffff" />
  <rect x="0" y="0" width="800" height="16" fill="#14532d" />

  <g transform="translate(60, 45)">
    <text x="0" y="30" font-size="22" font-weight="800" fill="#14532d">DEPARTMENT OF REVENUE &amp; TAXATION</text>
    <text x="0" y="50" font-size="12" font-weight="600" fill="#64748b">OFFICIAL ASSESSMENT NOTICE • PARCEL ID: TX-449-0182-A</text>
  </g>

  <line x1="60" y1="115" x2="740" y2="115" stroke="#e2e8f0" stroke-width="1.5" />

  <rect x="60" y="140" width="680" height="135" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5" />
  <g transform="translate(90, 180)">
    <text x="0" y="0" font-size="13" font-weight="700" fill="#166534">ANNUAL RESIDENTIAL PROPERTY TAX ASSESSMENT</text>
    <text x="0" y="36" font-size="14" font-weight="600" fill="#0f172a">Net Assessment Payable:</text>
    <text x="210" y="36" font-size="24" font-weight="800" fill="#15803d">$620.00</text>

    <text x="0" y="70" font-size="14" font-weight="600" fill="#0f172a">Statutory Due Date:</text>
    <text x="210" y="70" font-size="20" font-weight="800" fill="#b91c1c">November 05, 2026</text>
    <text x="430" y="70" font-size="12" font-weight="600" fill="#166534">Early Discount: Pay $589 before Oct 20</text>
  </g>

  <g transform="translate(60, 310)">
    <text x="0" y="0" font-size="15" font-weight="700" fill="#0f172a">PROPERTY &amp; OWNER OF RECORD:</text>
    <rect x="0" y="15" width="680" height="90" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
    <g transform="translate(20, 45)">
      <text x="0" y="0" font-size="13" fill="#475569">Assessed Owner: Robert J. Chen &amp; Elena Chen</text>
      <text x="0" y="26" font-size="13" fill="#475569">Physical Property Address: 1204 Oakwood Ridge Boulevard, Ward 4</text>
    </g>
  </g>

  <g transform="translate(60, 440)">
    <text x="0" y="0" font-size="15" font-weight="700" fill="#0f172a">REQUIRED ACTION &amp; FILING INSTRUCTIONS:</text>
    <text x="0" y="28" font-size="13" fill="#334155">1. Verify your property boundary and parcel identification number (TX-449-0182-A).</text>
    <text x="0" y="52" font-size="13" fill="#334155">2. Remit payment of $620.00 via https://tax.gov/revenue/online-pay or city treasurers office.</text>
    <text x="0" y="76" font-size="13" fill="#334155">3. If you believe the valuation is inaccurate, file Form PR-12 Protest before October 25, 2026.</text>
  </g>

  <rect x="60" y="560" width="680" height="90" rx="6" fill="#fffbeb" stroke="#fde68a" />
  <g transform="translate(85, 590)">
    <text x="0" y="0" font-size="13" font-weight="700" fill="#b45309">STATUTORY PENALTY WARNING:</text>
    <text x="0" y="24" font-size="12" fill="#78350f">Taxes unpaid after Nov 05, 2026 will accrue interest at 1.5% per month plus a $50 statutory lien fee.</text>
  </g>
</svg>`;

function svgToBase64(svg: string): string {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(svg).toString("base64");
  }
  return btoa(unescape(encodeURIComponent(svg)));
}

export const DEMO_DOCUMENTS: DemoDocument[] = [
  {
    id: "college-exam-notice",
    name: "College_Exam_Fee_Notice.pdf",
    category: "education",
    badge: "College / Education",
    previewUrl: `data:image/svg+xml;utf8,${encodeURIComponent(collegeNoticeSvg)}`,
    base64Data: svgToBase64(collegeNoticeSvg),
    mimeType: "image/svg+xml",
    fixtureAnalysis: {
      documentType: "College Examination Fee Notification",
      summary: "Official end-semester examination registration notice from Apex Institute of Science & Technology for B.Tech/B.E. students (Semesters III, V & VII).",
      audience: "Undergraduate B.Tech / B.E. Students (Regular and Backlog)",
      urgency: "high",
      actionRequired: "Pay examination fee of ₹1,850 and complete subject registration",
      deadline: "12 October 2026",
      amount: "₹1,850",
      requiredItems: [
        "Student ID and ERP login credentials",
        "75% minimum academic attendance clearance",
        "Laboratory and Central Library No-Dues clearance",
        "Saved copy of generated payment receipt"
      ],
      warnings: [
        "Late fee of ₹500 applies for submissions between 13 Oct 2026 and 16 Oct 2026",
        "Forms strictly rejected after 16 October 2026",
        "Non-registration leads to direct debarment from semester exams"
      ],
      consequences: [
        "₹500 late penalty if missed by 12 October",
        "Debarment from sitting for Fall 2026 examinations if not submitted by 16 October"
      ],
      nextSteps: [
        "01 Verify your subject codes and attendance status on ERP portal",
        "02 Log in to erp.aist.edu using your Student credentials",
        "03 Complete payment of ₹1,850 before 12 October 2026",
        "04 Download and archive the official e-Receipt for Hall Ticket issuance"
      ],
      unclearInformation: [],
      confidenceNotes: ["Clear printed circular with explicit dates, fee amounts, and departmental signatures."]
    },
    sampleQuestions: [
      "What is the exact deadline to pay the exam fee?",
      "How much money do I need to pay?",
      "What happens if I miss the deadline?",
      "What documents do I need to have ready?"
    ],
    simpleExplanation: "In simple words:\nYou need to pay ₹1,850 before October 12 for your semester exams. Make sure your attendance is above 75% and keep your student ID ready to pay on the ERP portal. Download your payment receipt immediately after paying. That's all you need to do right now."
  },
  {
    id: "utility-bill",
    name: "Electricity_Service_Invoice.pdf",
    category: "bill",
    badge: "Bill / Invoice",
    previewUrl: `data:image/svg+xml;utf8,${encodeURIComponent(utilityNoticeSvg)}`,
    base64Data: svgToBase64(utilityNoticeSvg),
    mimeType: "image/svg+xml",
    fixtureAnalysis: {
      documentType: "Residential Electricity Service Invoice",
      summary: "Monthly electricity consumption bill for September 2026 from Metro Electric & Power Corp for Account # 9042-8819-01.",
      audience: "Account Holder (David M. Miller, Apt 4B)",
      urgency: "high",
      actionRequired: "Pay overdue balance of $142.80 to avoid disconnection",
      deadline: "October 18, 2026",
      amount: "$142.80",
      requiredItems: [
        "Account Number: 9042-8819-01",
        "Payment method (Credit/Debit, NetBanking, or Check)",
        "Meter ID: EM-8920194"
      ],
      warnings: [
        "$15.00 late delinquency fee applies after October 18, 2026",
        "Physical service disconnection scheduled on October 25 if unpaid"
      ],
      consequences: [
        "Addition of $15.00 late fee",
        "Interruption and physical disconnection of electricity supply"
      ],
      nextSteps: [
        "01 Go to metropower.com/pay or call 1-800-555-0199",
        "02 Enter Account # 9042-8819-01",
        "03 Pay total current balance of $142.80 before October 18",
        "04 Retain confirmation number as proof of settlement"
      ],
      unclearInformation: [],
      confidenceNotes: ["Invoice contains explicit meter readings, breakdown, and due dates."]
    },
    sampleQuestions: [
      "What is the total amount due?",
      "When is the payment due date?",
      "What is the penalty if I don't pay on time?",
      "How can I make the payment?"
    ],
    simpleExplanation: "In simple words:\nThis is your monthly electricity bill for $142.80, due on October 18. You can pay it online at metropower.com with your account number (9042-8819-01). Pay before the deadline to avoid a $15 late fee or power shutoff. That's all you need to do right now."
  },
  {
    id: "govt-tax-notice",
    name: "Property_Tax_Assessment.pdf",
    category: "government",
    badge: "Government / Tax",
    previewUrl: `data:image/svg+xml;utf8,${encodeURIComponent(govtNoticeSvg)}`,
    base64Data: svgToBase64(govtNoticeSvg),
    mimeType: "image/svg+xml",
    fixtureAnalysis: {
      documentType: "Annual Property Tax Assessment Notice",
      summary: "Official annual statutory property tax assessment from Department of Revenue for Parcel ID: TX-449-0182-A.",
      audience: "Property Owners (Robert J. Chen & Elena Chen)",
      urgency: "medium",
      actionRequired: "Remit tax assessment of $620.00 or file valuation protest",
      deadline: "November 05, 2026",
      amount: "$620.00",
      requiredItems: [
        "Parcel ID: TX-449-0182-A",
        "Tax assessment form and payment voucher",
        "Form PR-12 (only if disputing property valuation before Oct 25)"
      ],
      warnings: [
        "Unpaid taxes accrue 1.5% interest per month plus $50 statutory lien fee",
        "Valuation protest deadline is October 25, 2026"
      ],
      consequences: [
        "1.5% monthly compound penalty and placement of tax lien against property"
      ],
      nextSteps: [
        "01 Verify property description and Parcel ID TX-449-0182-A",
        "02 Check if eligible for early discount ($589 before Oct 20)",
        "03 Pay $620.00 online at tax.gov/revenue/online-pay by November 05, 2026",
        "04 File official receipt with real estate tax records"
      ],
      unclearInformation: [],
      confidenceNotes: ["State assessment notice with clear parcel number and statutory deadlines."]
    },
    sampleQuestions: [
      "How much is the tax amount?",
      "Is there an early payment discount?",
      "When is the final deadline?",
      "What is my Parcel ID?"
    ],
    simpleExplanation: "In simple words:\nThis is your yearly property tax bill for $620.00, due by November 5. If you pay early before October 20, you get a discount and only pay $589. Pay online at tax.gov with your Parcel ID TX-449-0182-A. That's all you need to do right now."
  }
];
