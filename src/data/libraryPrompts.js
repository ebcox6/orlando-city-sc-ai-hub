// ─── Role Prompt Library Data ─────────────────────────────────────────────
// Each prompt object:
//   id         — unique slug
//   division   — one of the six club functional divisions
//   role       — job title / role label
//   task       — short task category label
//   title      — display title for the card
//   when       — "USE WHEN YOU WANT TO..." description
//   tailorFor  — optional customization hints shown at bottom of expanded card
//   fields     — array of { key, placeholder } for FillablePrompt inline fields
//   template   — prompt text; use {fieldKey} as placeholders

export const libraryPrompts = [

  // ──────────────────────────────────────────────────────────────────────────
  // PARTNERSHIPS & BRAND ALLIANCE
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'partnerships-renewal-pressure-test',
    division: 'Partnerships & Brand Alliance',
    role: 'Partnership Development & Brand Alliance',
    task: 'Strategy',
    title: 'Renewal Pressure Test — Stress-test a sponsorship ask before you send it',
    when: 'You have a renewal number or proposal ready and want it challenged before it goes to the sponsor, not after.',
    fields: [
      { key: 'sponsor',   placeholder: 'sponsor / partner name' },
      { key: 'ask',       placeholder: 'the renewal ask (e.g. 15% increase, new asset bundle)' },
      { key: 'rationale', placeholder: 'the data or rationale behind the ask' },
    ],
    template:
`I am preparing a renewal ask for {sponsor}. The ask is: {ask}. My rationale is: {rationale}.

Before I send this, identify the single weakest point in my rationale, the one a sharp procurement or marketing lead would attack first. Then tell me what evidence or reframing would close that gap. Do not validate the ask before stress-testing it. Assume I already understand the partnership and the sponsor relationship — focus on what's actually fragile in the argument.`,
  },

  {
    id: 'partnerships-activation-recap',
    division: 'Partnerships & Brand Alliance',
    role: 'Partnership Development & Brand Alliance',
    task: 'Reporting',
    title: 'Activation ROI Recap — Turn campaign data into a renewal argument',
    when: 'An activation or campaign has wrapped and you need to turn the raw performance data into a narrative that supports renewal or expansion.',
    fields: [
      { key: 'partner', placeholder: 'partner / sponsor name' },
      { key: 'metrics', placeholder: 'key performance metrics from the activation' },
      { key: 'goal',    placeholder: 'what this recap needs to support (renewal, upsell, internal review)' },
    ],
    template:
`{partner}'s activation has wrapped. The performance data: {metrics}. This recap needs to support: {goal}.

Build the recap as a decision-ready narrative, not a data dump. Lead with what the numbers mean for the partner's objectives, not just what happened. Flag any metric that's weaker than it looks on the surface, and tell me how to frame it honestly without undermining the renewal case.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // FINANCE & FP&A
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'finance-variance-narrative',
    division: 'Finance & FP&A',
    role: 'Finance, FP&A & Accounting',
    task: 'Reporting',
    title: 'Variance Narrative — Structure a budget variance for board review',
    when: 'A budget line came in over or under and you need to turn the variance into a clear, board-ready narrative, fast.',
    fields: [
      { key: 'lineItem', placeholder: 'budget line or department' },
      { key: 'variance', placeholder: 'the variance amount or percentage' },
      { key: 'drivers',  placeholder: 'what you believe is driving the variance' },
    ],
    template:
`{lineItem} came in at a variance of {variance}. My read on the drivers: {drivers}.

Structure a variance narrative for board or ownership review. Separate what's controllable from what isn't. Flag if any driver looks likely to recur next period rather than being one-time. Lead with the conclusion, not the walkthrough. Assume the reader understands the budget — they need the story, not a recap of the numbers.`,
  },

  {
    id: 'finance-scenario-stress-test',
    division: 'Finance & FP&A',
    role: 'Finance, FP&A & Accounting',
    task: 'Analysis',
    title: 'Scenario Stress Test — Find the weak assumption in a forecast',
    when: 'You have a forecast or scenario model built and want the underlying assumptions challenged before you present it.',
    fields: [
      { key: 'forecast',   placeholder: 'what the forecast is for' },
      { key: 'assumption', placeholder: 'the key assumption(s) driving the model' },
    ],
    template:
`I've built a forecast for {forecast}. The key assumption(s) driving it: {assumption}.

Identify which assumption is most likely to be wrong, and what the forecast would look like if it were. Don't just list general risks — tell me specifically where this model is most fragile and what would change my conclusion. Treat me as the one who built the model; I don't need the mechanics of forecasting explained back to me.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // STRATEGY & ANALYTICS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'strategy-decision-framing',
    division: 'Strategy & Analytics',
    role: 'Strategy & Analytics',
    task: 'Strategy',
    title: 'Decision Framing — Turn a data finding into a real recommendation',
    when: 'You have a data finding and an instinct about what to do with it, but want to confirm the instinct actually follows from the data.',
    fields: [
      { key: 'finding',  placeholder: 'the data finding' },
      { key: 'instinct', placeholder: 'your current instinct on what to do about it' },
    ],
    template:
`The data shows: {finding}. My instinct is: {instinct}.

Tell me whether my instinct actually follows from the finding, or whether I'm reaching for a familiar fix instead of addressing the real cause. What decision should this data actually be driving? If my instinct holds up, sharpen it into a clear recommendation. If it doesn't, tell me directly and explain why.`,
  },

  {
    id: 'strategy-tradeoff-framing',
    division: 'Strategy & Analytics',
    role: 'Strategy & Analytics',
    task: 'Strategy',
    title: 'Trade-off Framing — Structure a choice between competing priorities',
    when: 'You have two or more strategic priorities competing for the same resources and need the trade-off framed clearly for leadership.',
    fields: [
      { key: 'optionA', placeholder: 'first option / priority' },
      { key: 'optionB', placeholder: 'second option / priority' },
      { key: 'constraint', placeholder: 'the real constraint forcing the choice (budget, time, headcount)' },
    ],
    template:
`I'm weighing {optionA} against {optionB}, constrained by {constraint}.

Frame this as a decision-ready trade-off, not a pros-and-cons list. Identify what each option actually costs the other, and what the real decision criteria should be given the constraint. If there's a way to avoid the trade-off entirely, say so — but don't manufacture a false middle path just to avoid picking a side.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // LEGAL & COMPLIANCE
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'legal-clause-risk-flag',
    division: 'Legal & Compliance',
    role: 'Legal & Compliance',
    task: 'Risk Review',
    title: 'Clause Risk Flag — First-pass review of risky contract language',
    when: 'You have specific contract language you want screened for risk before a full read-through or before it goes external.',
    fields: [
      { key: 'clause',  placeholder: 'paste or describe the clause' },
      { key: 'context', placeholder: 'the type of agreement this is part of' },
    ],
    template:
`Review this clause from a {context}: {clause}.

Identify the specific risk this language creates, not just that it's "worth reviewing." If the language is one-sided, ambiguous, or gives a counterparty discretion that could be abused, say so directly. Tell me what balanced language would look like instead. If this falls outside what you can responsibly assess, say that plainly rather than guessing.`,
  },

  {
    id: 'legal-compliance-exposure-summary',
    division: 'Legal & Compliance',
    role: 'Legal & Compliance',
    task: 'Risk Review',
    title: 'Compliance Exposure Summary — Frame a regulatory risk for stakeholders',
    when: 'You’ve identified a potential compliance gap and need it summarized clearly for stakeholders who aren’t legal specialists.',
    fields: [
      { key: 'issue',       placeholder: 'the compliance issue or gap identified' },
      { key: 'stakeholder', placeholder: 'who this summary is for' },
    ],
    template:
`I've identified a potential compliance issue: {issue}. This summary is for {stakeholder}, who is not a legal specialist.

Summarize the exposure in plain terms: what the risk actually is, what triggers it, and what happens if it isn't addressed. Don't bury the severity in hedged language. If you genuinely can't assess part of this without more information, say what's missing rather than filling the gap with assumption.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // EXECUTIVE & OPERATIONS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'executive-multi-input-synthesis',
    division: 'Executive & Operations',
    role: 'Executive Leadership & Operations',
    task: 'Synthesis',
    title: 'Multi-Input Synthesis — Turn several department updates into one brief',
    when: 'You have updates from multiple departments landing at once and need one coherent brief, not a stack of separate summaries.',
    fields: [
      { key: 'inputs',   placeholder: 'list the updates / inputs, one per department' },
      { key: 'audience', placeholder: 'who this brief is for' },
    ],
    template:
`I have the following updates: {inputs}. This brief is for {audience}.

Synthesize these into one coherent brief, not separate summaries stapled together. Identify whether these inputs are actually connected or compounding each other. Lead with what the reader needs to decide, not a recap of each department. Flag any contradiction between the inputs directly rather than smoothing it over.`,
  },

  {
    id: 'executive-operational-risk-scan',
    division: 'Executive & Operations',
    role: 'Executive Leadership & Operations',
    task: 'Risk Review',
    title: 'Operational Risk Scan — Find what’s being underweighted',
    when: 'You want a second look at an operational plan or update to catch risk you may be too close to see.',
    fields: [
      { key: 'plan', placeholder: 'describe the operational plan or update' },
    ],
    template:
`Here is the current plan or update: {plan}.

Tell me what risk in this plan is most likely being underweighted, the thing that looks fine on paper but tends to go wrong in practice. Don't give me a generic risk checklist — identify the one or two things specific to this plan that deserve more attention before it moves forward.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // IT & TECHNOLOGY
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'it-governance-business-framing',
    division: 'IT & Technology',
    role: 'IT Leadership',
    task: 'Governance',
    title: 'Governance Business Framing — Translate a technical decision for ownership',
    when: 'You have a technical decision or risk that needs to be framed in business terms for a non-technical executive audience.',
    fields: [
      { key: 'decision', placeholder: 'the technical decision or risk' },
      { key: 'audience', placeholder: 'who needs to understand this (ownership, board, front office)' },
    ],
    template:
`I need to communicate this technical decision or risk to {audience}, who are not technical: {decision}.

Frame this entirely in business risk and value terms — no technical jargon unless I ask for a technical appendix. Identify the one assumption an executive sponsor would challenge first, and address it directly. Keep this tight enough for someone with five minutes, not fifty.`,
  },

  {
    id: 'it-vendor-evaluation-criteria',
    division: 'IT & Technology',
    role: 'IT Leadership',
    task: 'Evaluation',
    title: 'Vendor Evaluation Criteria — Structure a technology or AI vendor review',
    when: 'You’re evaluating a new technology or AI vendor and need a structured, risk-aware evaluation framework, not a generic checklist.',
    fields: [
      { key: 'vendorType', placeholder: 'type of vendor / tool being evaluated' },
      { key: 'dataTouch',  placeholder: 'what data this vendor would touch, if any' },
    ],
    template:
`I'm evaluating a {vendorType} vendor. Data it would touch: {dataTouch}.

Build an evaluation framework specific to this vendor type, not a generic procurement checklist. Weight data governance and security appropriately given what it touches. Identify the questions a sharp evaluator would ask that a vendor's own sales materials won't answer.`,
  },
];

// ─── Derived filter options (auto-updated from data) ──────────────────────
export const DIVISIONS = [
  'Partnerships & Brand Alliance',
  'Finance & FP&A',
  'Strategy & Analytics',
  'Legal & Compliance',
  'Executive & Operations',
  'IT & Technology',
];

export const ROLES_BY_DIVISION = DIVISIONS.reduce((acc, d) => {
  acc[d] = [...new Set(libraryPrompts.filter((p) => p.division === d).map((p) => p.role))];
  return acc;
}, {});

export const TASKS_BY_DIVISION = DIVISIONS.reduce((acc, d) => {
  acc[d] = [...new Set(libraryPrompts.filter((p) => p.division === d).map((p) => p.task))];
  return acc;
}, {});

// Placeholder "coming soon" roles per division
export const COMING_SOON = {
  'Partnerships & Brand Alliance': ['Global Partnerships', 'Partnership Solutions & Insights'],
  'Finance & FP&A':                ['Accounting Manager', 'Director of Finance'],
  'Strategy & Analytics':          ['Data & Insights Analyst'],
  'Legal & Compliance':            ['Associate General Counsel'],
  'Executive & Operations':        ['Veteran Sports & Entertainment Executive'],
  'IT & Technology':               ['Senior IT Manager'],
};
