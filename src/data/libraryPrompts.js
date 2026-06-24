// ─── Role Prompt Library Data ─────────────────────────────────────────────
// Each prompt object:
//   id         — unique slug
//   division   — 'MSP' | 'ERP' | 'Corporate'
//   role       — job title / role label
//   task       — short task category label
//   title      — display title for the card
//   when       — "USE WHEN YOU WANT TO..." description
//   tailorFor  — optional customization hints shown at bottom of expanded card
//   fields     — array of { key, placeholder } for FillablePrompt inline fields
//   template   — prompt text; use {fieldKey} as placeholders

export const libraryPrompts = [

  // ──────────────────────────────────────────────────────────────────────────
  // MSP — ORIGINAL PLACEHOLDER PROMPTS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'msp-escalation-summary',
    division: 'MSP',
    role: 'Service Desk',
    task: 'Documentation',
    title: 'Escalation Summary — Escalate a ticket with full context',
    when: 'You need to escalate a support ticket to Tier 2 or a senior engineer and want to hand off all relevant context clearly.',
    fields: [
      { key: 'client', placeholder: 'client name' },
      { key: 'issue',  placeholder: 'describe the issue' },
      { key: 'steps',  placeholder: 'list troubleshooting steps taken' },
      { key: 'impact', placeholder: 'business impact / urgency level' },
    ],
    template:
`You are an expert IT support documentation specialist. Write a professional ticket escalation summary for the following situation.

CLIENT: {client}
ISSUE DESCRIPTION: {issue}
TROUBLESHOOTING STEPS ALREADY TAKEN: {steps}
BUSINESS IMPACT / URGENCY: {impact}

Structure your escalation summary with these sections:
1. Situation Overview (2–3 sentences)
2. Steps Already Taken (bulleted)
3. Current Status & What Is Still Unknown
4. Recommended Next Steps for the receiving engineer
5. Urgency Classification with justification

Keep the tone professional and precise. The output will be read by a senior engineer who needs to act immediately.`,
  },

  {
    id: 'msp-client-update-email',
    division: 'MSP',
    role: 'Account Manager',
    task: 'Client Facing',
    title: 'Incident Update Email — Keep clients informed during outages',
    when: 'An incident is ongoing or has just been resolved and you need to send a clear, calm update to a client without alarming them.',
    fields: [
      { key: 'client',   placeholder: 'client name' },
      { key: 'incident', placeholder: 'brief description of the incident' },
      { key: 'status',   placeholder: 'current status (ongoing / resolved)' },
      { key: 'eta',      placeholder: 'estimated resolution time or "resolved at [time]"' },
    ],
    template:
`You are a seasoned MSP account manager known for clear, reassuring client communication. Draft a professional incident update email for the following:

CLIENT: {client}
INCIDENT: {incident}
CURRENT STATUS: {status}
ETA / RESOLUTION: {eta}

The email should:
- Open with a brief, empathetic acknowledgment of the disruption
- Clearly explain what happened in plain language (no jargon)
- State what has been done or is being done
- Give a realistic timeline or confirm resolution
- Close with next steps and a direct point of contact

Tone: calm, transparent, and confident. Length: 150–200 words.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // MSP — NEW PROMPTS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'msp-qbr-agenda',
    division: 'MSP',
    role: 'Account Manager',
    task: 'Client Facing',
    title: 'QBR Agenda & Talking Points',
    when: 'You need to prepare for a Quarterly Business Review and want a structured agenda with talking points tailored to the client relationship.',
    tailorFor: 'New client vs. long-term relationship / at-risk client who needs confidence rebuilt / renewal conversation vs. standard review',
    fields: [
      { key: 'client',       placeholder: 'client name' },
      { key: 'bizType',      placeholder: 'describe business type' },
      { key: 'tenure',       placeholder: 'length of time as a client' },
      { key: 'topics',       placeholder: 'e.g. service performance, upcoming renewal, new service recommendation' },
      { key: 'relationship', placeholder: 'new / growing / at-risk / long-term stable' },
    ],
    template:
`CONTEXT: I am preparing for a Quarterly Business Review with {client}. They are a {bizType} client who has been with us for {tenure}. Key topics I need to cover: {topics}.

ROLE: Act as a senior vCIO and client success strategist with expertise in managed IT services and executive-level business reviews.

TASK: Build a QBR agenda with talking points for each section. Include: service performance summary, open issues and resolutions, strategic recommendations, upcoming projects or renewals, and next steps with owners and target dates.

FORMAT: Structured agenda with time allocations (60-minute meeting). Bullet talking points under each section. Professional, confident tone. Executive-ready — no technical jargon unless the client is technical.

TARGET AUDIENCE: Business owner or C-level client contact. Relationship priority: {relationship}.`,
  },

  {
    id: 'msp-difficult-client-email',
    division: 'MSP',
    role: 'Customer Success',
    task: 'Client Facing',
    title: 'Difficult Client Conversation Email',
    when: 'You need to respond to a client situation that requires careful handling — a missed SLA, recurring issue, complaint, or billing dispute.',
    tailorFor: 'SLA miss vs. billing issue vs. recurring technical problem / executive contact vs. day-to-day contact / first incident vs. pattern of issues',
    fields: [
      { key: 'client',      placeholder: 'client name' },
      { key: 'situation',   placeholder: 'e.g. missed SLA, recurring issue, billing dispute' },
      { key: 'relStatus',   placeholder: 'e.g. long-term, recent onboarding, at-risk' },
      { key: 'contactRole', placeholder: 'their role' },
      { key: 'tone',        placeholder: 'empathetic / solution-focused / relationship-rebuilding' },
    ],
    template:
`CONTEXT: I need to respond to a client situation that requires careful handling. Client name: {client}. The situation is: {situation}. Our relationship with this client is: {relStatus}.

ROLE: Act as a senior client success manager with expertise in difficult client communication, relationship recovery, and managed services.

TASK: Draft a professional, empathetic email that acknowledges the situation without over-apologizing, explains what happened and what we are doing about it, and reestablishes confidence in the relationship. Do not make promises we cannot keep.

FORMAT: Professional email. Empathetic but confident tone — not defensive, not groveling. Under 250 words. End with one clear next step or call to action.

TARGET AUDIENCE: {client}, {contactRole}. Tone priority: {tone}.`,
  },

  {
    id: 'msp-renewal-proposal',
    division: 'MSP',
    role: 'Account Manager',
    task: 'Client Facing',
    title: 'Service Renewal Proposal Email',
    when: 'A client agreement is approaching expiration and you want to frame the renewal conversation around the value delivered.',
    tailorFor: 'Straight renewal vs. renewal with upsell / long-term loyal client vs. newer client / email only vs. email ahead of a renewal call',
    fields: [
      { key: 'client',      placeholder: 'client name' },
      { key: 'expiry',      placeholder: 'agreement expiry date or timeframe' },
      { key: 'value',       placeholder: 'e.g. uptime achieved, issues resolved, projects completed' },
      { key: 'upsell',      placeholder: 'describe new service or write "none at this time"' },
      { key: 'contactRole', placeholder: 'their role' },
      { key: 'tenure',      placeholder: 'X years/months' },
      { key: 'priority',    placeholder: 'retention only / retention + upsell' },
    ],
    template:
`CONTEXT: I am preparing a renewal communication for {client}. Their current agreement expires {expiry}. Key value we have delivered: {value}. New services or upgrades to propose: {upsell}.

ROLE: Act as a senior account manager at a managed services company with expertise in client retention and value-based communication.

TASK: Draft a renewal email that reinforces the value we have delivered, frames the renewal as a natural next step, and — if applicable — introduces the new service or upgrade as an enhancement to what is already working.

FORMAT: Professional email. Warm but confident tone — this is a conversation, not a sales pitch. Under 200 words. Subject line included. End with a soft ask for a call or meeting to discuss.

TARGET AUDIENCE: {client}, {contactRole}. Relationship length: {tenure}. Priority: {priority}.`,
  },

  {
    id: 'msp-new-service-announcement',
    division: 'MSP',
    role: 'Account Manager',
    task: 'Client Facing',
    title: 'New Service Offering Announcement',
    when: 'You need to introduce a new service or product to an existing client in a way that feels like a trusted recommendation, not a mass marketing email.',
    tailorFor: 'Security service vs. cloud vs. Microsoft 365 / technical decision-maker vs. business owner / proactive outreach vs. follow-up to a conversation',
    fields: [
      { key: 'service',     placeholder: 'service name and one-sentence description' },
      { key: 'benefit',     placeholder: 'why this matters specifically to this client' },
      { key: 'client',      placeholder: 'client name' },
      { key: 'existing',    placeholder: 'brief description of their current services with us' },
      { key: 'contactRole', placeholder: 'their role' },
      { key: 'techLevel',   placeholder: 'technical / non-technical / mixed' },
    ],
    template:
`CONTEXT: I need to communicate a new service to an existing client. The service is: {service}. The primary benefit for this client is: {benefit}. Client name: {client}. Their current services: {existing}.

ROLE: Act as a senior account manager with expertise in client communication and managed services — someone who leads with value, not features.

TASK: Draft a personalized announcement email that introduces the new service, connects it to this client's specific situation, and invites them to learn more. It should feel like a relevant recommendation from a trusted advisor, not a mass marketing email.

FORMAT: Professional email. Consultative tone — advisory, not promotional. Under 180 words. Subject line included. One clear call to action at the end.

TARGET AUDIENCE: {client}, {contactRole}. Familiarity with technology: {techLevel}.`,
  },

  {
    id: 'msp-shift-handoff',
    division: 'MSP',
    role: 'Service Desk',
    task: 'Documentation',
    title: 'NOC / Shift Handoff Summary',
    when: 'You are ending a shift and need to give the incoming team a clean, complete picture of everything open, resolved, and priority.',
    tailorFor: 'Overnight handoff vs. day shift / high-volume incident shift vs. quiet shift / single site vs. multi-client environment',
    fields: [
      { key: 'shift',     placeholder: 'date and hours (e.g. Mon 04/28, 22:00–06:00)' },
      { key: 'openItems', placeholder: 'list open issues with client name and brief description' },
      { key: 'resolved',  placeholder: 'list what was closed this shift' },
      { key: 'priority',  placeholder: 'list anything the incoming team needs to act on first' },
      { key: 'comms',     placeholder: 'client comms sent this shift, or "none"' },
    ],
    template:
`CONTEXT: I am writing an end-of-shift handoff summary for the incoming team. Shift period: {shift}. Active alerts or open issues: {openItems}. Items resolved this shift: {resolved}. Items requiring immediate attention: {priority}. Client communications sent this shift: {comms}.

ROLE: Act as a senior NOC analyst with expertise in shift documentation and internal technical communication.

TASK: Write a clean, structured shift handoff summary that gives the incoming team everything they need to hit the ground running. No context should be lost between shifts.

FORMAT: Structured internal document with labeled sections: Active Issues, Resolved This Shift, Priority Items for Incoming Team, Client Comms Sent, Notes. Concise, technical, no fluff. Bullet points throughout.

TARGET AUDIENCE: Incoming NOC or Service Desk team. Assume technical knowledge — no need to explain basic concepts.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ERP — ORIGINAL PLACEHOLDER PROMPT
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'erp-change-request-doc',
    division: 'ERP',
    role: 'Functional Consulting',
    task: 'Documentation',
    title: 'Change Request Document — Draft a formal ERP change request',
    when: 'A client wants to modify their ERP configuration, workflow, or integration and you need a formal change request document for approval.',
    fields: [
      { key: 'client', placeholder: 'client / organization name' },
      { key: 'module', placeholder: 'ERP module or area (e.g. Accounts Payable, Inventory)' },
      { key: 'change', placeholder: 'describe the requested change' },
      { key: 'reason', placeholder: 'business reason for the change' },
    ],
    template:
`You are a senior ERP implementation consultant with 20+ years of experience in enterprise change management. Draft a formal Change Request document for the following:

CLIENT: {client}
ERP MODULE / AREA: {module}
REQUESTED CHANGE: {change}
BUSINESS JUSTIFICATION: {reason}

Structure the document with these sections:
1. Change Request Summary
2. Business Justification
3. Scope of Change (what IS and IS NOT included)
4. Risk Assessment (Low / Medium / High with explanation)
5. Testing & Validation Plan
6. Rollback Plan
7. Approval Sign-Off Block (placeholder names and roles)

Use formal business language appropriate for executive review. Be specific about scope to prevent scope creep.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // ERP — NEW PROMPTS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'erp-weekly-status-report',
    division: 'ERP',
    role: 'Project Management',
    task: 'Communication',
    title: 'Weekly Project Status Report',
    when: 'You need to send a structured weekly update to the client sponsor and want it to be clear, professional, and honest about risks.',
    tailorFor: 'On-track project vs. delayed project / technical sponsor vs. business sponsor / early phase vs. approaching go-live',
    fields: [
      { key: 'client', placeholder: 'client name' },
      { key: 'phase',  placeholder: 'current phase name' },
      { key: 'done',   placeholder: 'list accomplishments this week' },
      { key: 'risks',  placeholder: 'describe any risks or blockers, or "none"' },
      { key: 'budget', placeholder: 'on track / minor variance / flag needed' },
      { key: 'goLive', placeholder: 'go-live target date' },
    ],
    template:
`CONTEXT: I am managing an ERP implementation project for {client}. Current phase: {phase}. This week we completed: {done}. Current risks or blockers: {risks}. Budget status: {budget}. Go-live target: {goLive}.

ROLE: Act as a senior ERP project manager with expertise in client communication, risk management, and implementation reporting.

TASK: Write a weekly project status report that covers: accomplishments this week, planned work next week, risks and mitigations, budget status, and action items with owners and due dates.

FORMAT: Structured report with labeled sections. Professional tone. Under 350 words. Use bullet points for action items in owner / task / due date format. Flag any at-risk items clearly — do not soften risks.

TARGET AUDIENCE: Client project sponsor or steering committee. May be non-technical — frame everything in business impact terms, not technical detail.`,
  },

  {
    id: 'erp-discovery-questions',
    division: 'ERP',
    role: 'Functional Consulting',
    task: 'Planning',
    title: 'Discovery Question Framework',
    when: 'You are preparing for a requirements gathering session and want a structured set of questions that uncover what the client actually needs.',
    tailorFor: 'Finance vs. distribution vs. manufacturing / first discovery session vs. follow-up deep dive / technical IT contact vs. business process owner',
    fields: [
      { key: 'client',     placeholder: 'client name' },
      { key: 'industry',   placeholder: 'client industry' },
      { key: 'modules',    placeholder: 'e.g. Finance, Purchasing, Inventory' },
      { key: 'knownPains', placeholder: 'known pain points, or "none confirmed yet"' },
    ],
    template:
`CONTEXT: I am preparing for a discovery session with {client}. Their industry is {industry}. The modules or business areas we are covering in this session: {modules}. Known pain points or priorities the client has mentioned: {knownPains}.

ROLE: Act as a senior ERP functional consultant with expertise in requirements gathering, business process analysis, and solution design.

TASK: Build a structured discovery question framework for this session. Organize questions by business process area. Include questions that uncover current-state pain points, volume and complexity, integration requirements, reporting needs, and user roles. Flag any questions that are particularly important to ask early.

FORMAT: Numbered questions grouped by category. 10-15 questions per module area. Include a brief note after each high-priority question explaining why it matters. Plain language — avoid ERP jargon that the client may not know.

TARGET AUDIENCE: Client operations, finance, or IT leaders. Assume they know their business well but may not know ERP terminology.`,
  },

  {
    id: 'erp-golive-readiness',
    division: 'ERP',
    role: 'Project Management',
    task: 'Client Facing',
    title: 'Go-Live Readiness Summary',
    when: 'You are approaching go-live and need to give the client a clear, honest picture of readiness status and a formal recommendation.',
    tailorFor: 'Clean go-live vs. go-live with known risks / full confidence vs. recommending delay / first go-live vs. phased rollout',
    fields: [
      { key: 'client',     placeholder: 'client name' },
      { key: 'goLiveDate', placeholder: 'go-live date' },
      { key: 'training',   placeholder: 'complete / in progress / at risk' },
      { key: 'dataMig',    placeholder: 'complete / in progress / at risk' },
      { key: 'uat',        placeholder: 'complete / in progress / at risk' },
      { key: 'techSetup',  placeholder: 'complete / in progress / at risk' },
      { key: 'openIssues', placeholder: 'list unresolved items, or "none"' },
      { key: 'confidence', placeholder: 'high / medium / needs discussion' },
    ],
    template:
`CONTEXT: We are approaching go-live for {client}. Go-live date: {goLiveDate}. Current readiness status — Training: {training}. Data migration: {dataMig}. UAT sign-off: {uat}. Technical setup: {techSetup}. Open issues: {openIssues}. Overall confidence level: {confidence}.

ROLE: Act as a senior ERP project manager with expertise in go-live planning, risk assessment, and executive communication.

TASK: Write a go-live readiness summary that gives the client a clear, honest picture of where things stand. Confirm what is ready, flag what is not, state the recommendation clearly — proceed, delay, or proceed with conditions — and outline next steps with owners and dates.

FORMAT: Structured executive summary. Professional, direct tone — do not sugarcoat risks. Under 400 words. Status indicators (Ready / In Progress / At Risk) for each area. End with a clear recommendation and next steps.

TARGET AUDIENCE: Client CFO, COO, or executive sponsor. Non-technical — business impact language only.`,
  },

  {
    id: 'erp-change-management',
    division: 'ERP',
    role: 'Training & Adoption',
    task: 'Communication',
    title: 'Change Management Announcement',
    when: 'You need to communicate an upcoming system or process change to client staff in a way that prepares them without creating anxiety.',
    tailorFor: 'Major system go-live vs. process change vs. training announcement / anxious workforce vs. change-ready culture / advance notice vs. last-minute communication',
    fields: [
      { key: 'client',        placeholder: 'client name' },
      { key: 'change',        placeholder: 'e.g. new ERP system going live, new process for purchase orders' },
      { key: 'effectiveDate', placeholder: 'go-live or effective date' },
      { key: 'affected',      placeholder: 'describe affected teams or roles' },
      { key: 'actions',       placeholder: 'e.g. attend training, update their process, stop using the old system' },
    ],
    template:
`CONTEXT: We need to communicate an upcoming system change to {client}'s staff. The change is: {change}. Go-live or effective date: {effectiveDate}. Who is affected: {affected}. Key actions staff need to take: {actions}.

ROLE: Act as a change management and internal communications specialist with expertise in ERP adoption and organizational change.

TASK: Write an internal announcement that prepares staff for the change, explains what is happening and why, tells them exactly what they need to do, and reduces anxiety by framing the change positively without being dismissive of the disruption.

FORMAT: Internal announcement email or memo. Empathetic, clear, benefit-first tone. Under 250 words. Include a clear timeline and 2-3 specific action items for staff. Avoid technical jargon completely.

TARGET AUDIENCE: End users — warehouse staff, finance team, operations. Assume no prior ERP experience. Reading level: clear and plain.`,
  },

  {
    id: 'erp-client-escalation',
    division: 'ERP',
    role: 'Project Management',
    task: 'Client Facing',
    title: 'Client Escalation Email',
    when: 'You need to formally escalate a risk or blocker to the client sponsor and want to create appropriate urgency without damaging the relationship.',
    tailorFor: 'Client-caused delay vs. external blocker vs. scope change / first escalation vs. repeated issue / strong relationship vs. already tense dynamic',
    fields: [
      { key: 'issue',    placeholder: 'e.g. data files not delivered, key resource unavailable, scope creep' },
      { key: 'impact',   placeholder: 'describe timeline, budget, or go-live risk' },
      { key: 'ask',      placeholder: 'specific ask — decision, resource, or action needed' },
      { key: 'deadline', placeholder: 'deadline date or timeframe for response' },
    ],
    template:
`CONTEXT: I need to escalate a risk or issue formally to the client sponsor. The issue is: {issue}. Impact on the project: {impact}. What we need from the client: {ask}. Deadline for response: {deadline}.

ROLE: Act as a senior ERP project manager with expertise in client escalation, risk communication, and executive relationship management.

TASK: Draft a formal escalation email that describes the issue clearly, states the business impact without exaggerating, makes a specific ask with a clear deadline, and maintains the professional relationship while creating appropriate urgency.

FORMAT: Professional email. Firm but collaborative tone — this is a partnership communication, not a blame email. Under 250 words. Subject line included. One clear ask with a deadline. Offer to discuss on a call.

TARGET AUDIENCE: Client executive sponsor or CFO. Frame in business terms — timeline and budget impact, not technical detail.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CORPORATE — ORIGINAL PLACEHOLDER PROMPTS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'corp-meeting-agenda',
    division: 'Corporate',
    role: 'Operations',
    task: 'Planning',
    title: 'Meeting Agenda Builder — Create a focused, time-blocked agenda',
    when: "You are planning a team meeting and want a structured, time-blocked agenda that keeps participants focused and respects everyone's time.",
    fields: [
      { key: 'meeting',   placeholder: 'meeting name / purpose' },
      { key: 'duration',  placeholder: 'total meeting duration (e.g. 60 minutes)' },
      { key: 'topics',    placeholder: 'list of topics to cover' },
      { key: 'attendees', placeholder: 'attendee roles (e.g. team leads, client, exec)' },
    ],
    template:
`You are an expert facilitator and operations manager. Build a professional, time-blocked meeting agenda for the following:

MEETING NAME / PURPOSE: {meeting}
TOTAL DURATION: {duration}
TOPICS TO COVER: {topics}
ATTENDEES: {attendees}

Format the agenda as a table with columns: Time Block | Agenda Item | Owner | Notes/Action.

Also include:
- A 2-sentence meeting objective statement at the top
- Pre-read or prep items attendees should complete beforehand
- A designated "parking lot" item at the end for unresolved items
- A 5-minute buffer before the close for action item review

Keep the language direct. Every agenda item should have a clear owner and time limit.`,
  },

  {
    id: 'corp-performance-review-narrative',
    division: 'Corporate',
    role: 'Human Resources',
    task: 'Documentation',
    title: 'Performance Review Narrative — Write a balanced review summary',
    when: 'You need to write or refine a performance review narrative for a direct report and want it to be balanced, specific, and development-focused.',
    fields: [
      { key: 'role',      placeholder: 'employee job title' },
      { key: 'strengths', placeholder: 'key strengths demonstrated this period' },
      { key: 'areas',     placeholder: 'areas for development' },
      { key: 'goal',      placeholder: 'primary development goal for next period' },
    ],
    template:
`You are a senior HR manager and organizational development expert. Write a professional performance review narrative based on the following:

EMPLOYEE ROLE: {role}
KEY STRENGTHS THIS PERIOD: {strengths}
AREAS FOR DEVELOPMENT: {areas}
PRIMARY DEVELOPMENT GOAL FOR NEXT PERIOD: {goal}

The narrative should:
1. Open with a balanced, specific summary of the employee's overall performance (3–4 sentences)
2. Highlight 2–3 specific strengths with examples of their impact on the team or business
3. Address 1–2 development areas constructively — frame as growth opportunities, not deficiencies
4. Close with a forward-looking development goal and how the manager will support it

Tone: professional, encouraging, and direct. Avoid vague language like "good team player." Length: 250–350 words.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // CORPORATE — NEW PROMPTS
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: 'corp-job-posting',
    division: 'Corporate',
    role: 'Human Resources',
    task: 'Documentation',
    title: 'Job Posting — Technical or Operational Role',
    when: 'You need to write a job posting that attracts the right candidates and makes i-Tech sound like a company people genuinely want to work for.',
    tailorFor: 'Technical role vs. client-facing role vs. administrative role / active job seekers vs. passive candidates / emphasize culture vs. emphasize growth opportunity',
    fields: [
      { key: 'jobTitle',       placeholder: 'job title' },
      { key: 'responsibilities', placeholder: 'list 3-4 key responsibilities' },
      { key: 'requirements',   placeholder: 'list required skills and experience' },
      { key: 'workType',       placeholder: 'full-time / part-time / remote / hybrid / on-site' },
      { key: 'salary',         placeholder: 'salary range or "not disclosing"' },
      { key: 'candidateType',  placeholder: 'e.g. experienced MSP technician, entry-level ERP consultant' },
      { key: 'level',          placeholder: 'entry / mid / senior' },
    ],
    template:
`CONTEXT: I need to write a job posting for a {jobTitle} position at i-Tech Support. Key responsibilities include: {responsibilities}. Required skills and experience: {requirements}. This is a {workType} role. Salary range: {salary}. The type of candidate we want to attract: {candidateType}.

ROLE: Act as a senior HR specialist and technical recruiter with expertise in technology services hiring and employer branding.

TASK: Write a compelling job posting that includes: role summary, key responsibilities, required qualifications, preferred qualifications, what makes i-Tech a great place to work, and a call to apply. Make it sound like a company people genuinely want to work for — specific, not generic.

FORMAT: Standard job posting structure. Engaging but professional tone. Under 450 words. Use bullet points for responsibilities and qualifications. Opening paragraph must hook the right candidate immediately.

TARGET AUDIENCE: Technology professionals actively or passively looking. Experience level: {level}.`,
  },

  {
    id: 'corp-policy-announcement',
    division: 'Corporate',
    role: 'Human Resources',
    task: 'Internal',
    title: 'Internal Policy or Process Announcement',
    when: 'You need to communicate a new or updated policy to staff in a way that is clear, respectful, and answers questions before they are asked.',
    tailorFor: 'New policy vs. policy update vs. process change / compliance-driven vs. culture-driven / company-wide vs. department-specific',
    fields: [
      { key: 'policy',    placeholder: 'describe the policy or process change clearly' },
      { key: 'effective', placeholder: 'effective date' },
      { key: 'affected',  placeholder: 'all staff / specific teams / specific roles' },
      { key: 'changes',   placeholder: 'key changes from before, or "this is new"' },
      { key: 'reason',    placeholder: 'e.g. compliance requirement, operational improvement' },
      { key: 'tone',      placeholder: 'informational / urgent / collaborative' },
    ],
    template:
`CONTEXT: I need to communicate a new or updated policy or process to i-Tech staff. The policy or process is: {policy}. Effective date: {effective}. Who it affects: {affected}. Key changes from the previous approach: {changes}. Reason for the change: {reason}.

ROLE: Act as an internal communications specialist and HR professional with expertise in clear policy communication and staff engagement.

TASK: Write an internal announcement that explains the policy change clearly, gives staff the context for why it is happening, tells them exactly what changes for them and what they need to do, and answers the most likely questions before they are asked.

FORMAT: Internal email or memo. Clear, direct, respectful tone — not bureaucratic. Under 300 words. Include: what is changing, why, when it takes effect, what staff need to do, and who to contact with questions.

TARGET AUDIENCE: i-Tech Support staff. Tone: {tone}.`,
  },

  {
    id: 'corp-meeting-recap',
    division: 'Corporate',
    role: 'Operations',
    task: 'Documentation',
    title: 'Meeting Recap & Action Items',
    when: 'You just finished a meeting and need to send a clean recap that captures decisions and action items so nothing falls through the cracks.',
    tailorFor: 'Client meeting vs. internal meeting vs. vendor meeting / action-heavy meeting vs. discussion-only / formal recap vs. casual team summary',
    fields: [
      { key: 'meetingType',  placeholder: 'e.g. client call, internal planning, vendor review' },
      { key: 'attendees',    placeholder: 'list names and roles or organizations' },
      { key: 'topics',       placeholder: 'list 3-5 key topics discussed' },
      { key: 'decisions',    placeholder: 'list any decisions made, or "none"' },
      { key: 'actions',      placeholder: 'list each action with owner and due date' },
      { key: 'distribution', placeholder: 'internal only / includes client' },
    ],
    template:
`CONTEXT: I just completed a meeting and need to send a clean recap. Meeting type: {meetingType}. Attendees: {attendees}. Key topics discussed: {topics}. Decisions made: {decisions}. Action items: {actions}.

ROLE: Act as a professional communications specialist with expertise in clear, concise business documentation.

TASK: Write a meeting recap that summarizes the key discussion points, captures all decisions clearly, and lists action items in a clean format with owners and due dates. Recipients should be able to read this in under 2 minutes and know exactly what was decided and what happens next.

FORMAT: Professional email. Organized with labeled sections: Summary, Decisions Made, Action Items. Action items in owner / task / due date format. Under 300 words. Neutral, factual tone — no interpretation or editorializing.

TARGET AUDIENCE: Meeting attendees and stakeholders. Distribution: {distribution}.`,
  },

  {
    id: 'corp-vendor-proposal',
    division: 'Corporate',
    role: 'Operations',
    task: 'Analysis',
    title: 'Vendor Proposal Summary',
    when: 'You have received a vendor proposal and need to brief leadership with a clear, objective summary and a recommended next step.',
    tailorFor: 'Software vendor vs. hardware vs. services vendor / single vendor vs. competitive evaluation / straightforward proposal vs. complex contract',
    fields: [
      { key: 'vendor',     placeholder: 'vendor name' },
      { key: 'product',    placeholder: 'product or service being proposed' },
      { key: 'details',    placeholder: 'pricing, contract length, key features or deliverables' },
      { key: 'comparison', placeholder: 'comparison to alternatives, or "no direct comparison available"' },
      { key: 'criteria',   placeholder: 'e.g. cost, support quality, integration with existing systems' },
      { key: 'concerns',   placeholder: 'any concerns or questions, or "none at this time"' },
    ],
    template:
`CONTEXT: I have received a proposal from {vendor} for {product}. Key details of the proposal: {details}. How this compares to alternatives: {comparison}. Our primary evaluation criteria: {criteria}. Any concerns or questions: {concerns}.

ROLE: Act as a senior operations and procurement specialist with expertise in vendor evaluation, contract review, and executive briefing.

TASK: Write a concise vendor proposal summary for leadership review. Include: what is being proposed, key commercial terms, strengths and weaknesses of the proposal, any risks or questions that need resolution, and a recommended next step.

FORMAT: Executive summary format. Objective, analytical tone. Under 350 words. Use a structured layout with labeled sections. End with a clear recommended next step — accept, negotiate, decline, or request more information.

TARGET AUDIENCE: Internal leadership or decision-makers. May not have seen the proposal — assume no prior context.`,
  },

  {
    id: 'corp-perf-review-prep',
    division: 'Corporate',
    role: 'Human Resources',
    task: 'Internal',
    title: 'Performance Review Talking Points',
    when: 'You are preparing for a performance review conversation and want structured talking points that are direct, fair, and constructive.',
    tailorFor: 'Strong performer vs. needs improvement vs. mixed review / experienced manager vs. new manager / formal review vs. mid-year check-in',
    fields: [
      { key: 'employee',   placeholder: 'employee name / role' },
      { key: 'period',     placeholder: 'review period' },
      { key: 'strengths',  placeholder: 'list 2-3 specific strength examples' },
      { key: 'devAreas',   placeholder: 'list 1-2 specific development areas' },
      { key: 'incidents',  placeholder: 'significant incidents this period, or "none"' },
      { key: 'direction',  placeholder: 'exceeding expectations / meeting expectations / needs improvement' },
    ],
    template:
`CONTEXT: I am preparing for a performance review conversation with {employee}. Review period: {period}. Key strengths demonstrated this period: {strengths}. Areas for development or improvement: {devAreas}. Any significant incidents — positive or negative: {incidents}. Overall performance direction: {direction}.

ROLE: Act as a senior HR professional and leadership coach with expertise in performance communication, employee development, and difficult conversations.

TASK: Build structured talking points for this performance review conversation. Include: opening framing, specific strength recognition with impact, development areas framed constructively, any goals for the next period, and a closing that reinforces the employee's value to the team.

FORMAT: Structured talking points — not a script, but clear guidance for each section of the conversation. Empathetic but direct tone. Include suggested language for any sensitive areas. Under 400 words.

TARGET AUDIENCE: Manager preparing for a 1:1 conversation with a direct report. Conversation tone: {direction}.`,
  },
];

// ─── Derived filter options (auto-updated from data) ──────────────────────
export const DIVISIONS = ['MSP', 'ERP', 'Corporate'];

export const ROLES_BY_DIVISION = {
  MSP:       [...new Set(libraryPrompts.filter((p) => p.division === 'MSP').map((p) => p.role))],
  ERP:       [...new Set(libraryPrompts.filter((p) => p.division === 'ERP').map((p) => p.role))],
  Corporate: [...new Set(libraryPrompts.filter((p) => p.division === 'Corporate').map((p) => p.role))],
};

export const TASKS_BY_DIVISION = {
  MSP:       [...new Set(libraryPrompts.filter((p) => p.division === 'MSP').map((p) => p.task))],
  ERP:       [...new Set(libraryPrompts.filter((p) => p.division === 'ERP').map((p) => p.task))],
  Corporate: [...new Set(libraryPrompts.filter((p) => p.division === 'Corporate').map((p) => p.task))],
};

// Placeholder "coming soon" roles per division
export const COMING_SOON = {
  MSP:       ['NOC Engineer', 'vCIO / Strategic Advisor', 'Security Analyst', 'Onboarding Specialist'],
  ERP:       ['Data Migration Specialist', 'End-User Trainer', 'Systems Analyst'],
  Corporate: ['Marketing Manager', 'Sales Representative', 'Executive Assistant', 'Finance Analyst'],
};
