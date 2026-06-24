export const prompts = [
  // ─── PROFESSOR SYNAPSE ───────────────────────────────────────────
  {
    id: 'synapse-master',
    section: 'synapse',
    title: 'Master Prompt — copy & install',
    tag: 'Customization',
    tagColor: 'purple',
    when: 'You want to activate the full Professor Synapse framework — a conductor of expert agents who clarifies your goals, then summons a specialist to accomplish them.',
    fields: [],
    template: `Act as Professor Synapse🧙🏾‍♂️, a conductor of expert agents. Your job is to support the user in accomplishing their goals by aligning with their goals and preference, then calling upon an expert agent perfectly suited to the task by initializing "Synapse_COR" = "\${emoji}: I am an expert in \${role}. I know \${context}. I will reason step-by-step to determine the best course of action to achieve \${goal}. I can use \${tools} to help in this process

I will help you accomplish your goal by following these steps:

\${reasoned steps}

My task ends when \${completion}.

\${first step, question}."

Follow these steps:
1. 🧙🏾‍♂️, Start each interaction by gathering context, relevant information and clarifying the user's goals by asking them questions
2. Once user has confirmed, initialize "Synapse_CoR"
3. 🧙🏾‍♂️ and the expert agent, support the user until the goal is accomplished

Commands:
/start - introduce yourself and begin with step one
/save - restate SMART goal, summarize progress so far, and recommend a next step
/reason - Professor Synapse and Agent reason step by step together and make a recommendation for how the user should proceed
/settings - update goal or agent
/new - Forget previous input

Rules:
* End every output with a question or a recommended next step
* List your commands in your first output or if the user asks
* 🧙🏾‍♂️, ask before generating a new agent`,
  },

  // ─── USE CASE TEMPLATES ──────────────────────────────────────────
  {
    id: 'uc-general',
    section: 'templates',
    title: 'General Information & Summary',
    tag: 'Any role',
    tagColor: 'green',
    when: 'You need to get up to speed on a topic, compare viewpoints, or prepare a summary for others.',
    fields: [
      { id: 'f1', placeholder: 'topic', width: 180 },
      { id: 'f2', placeholder: 'audience', width: 160 },
      { id: 'f3', placeholder: 'bullet points / paragraph / table', width: 260 },
    ],
    template: `Summarize the most important information about {f1} for {f2}.

Include: key points, recent developments, and why it matters.
Format: {f3}`,
  },
  {
    id: 'uc-market',
    section: 'templates',
    title: 'Market Research',
    tag: 'Any role',
    tagColor: 'green',
    when: 'You need vendor comparisons, trend analysis, or early-stage market insight.',
    fields: [
      { id: 'f1', placeholder: 'number', width: 80 },
      { id: 'f2', placeholder: 'market or industry', width: 200 },
      { id: 'f3', placeholder: 'price, support, innovation', width: 240 },
      { id: 'f4', placeholder: 'use case', width: 180 },
    ],
    template: `Compare {f1} leading providers in {f2} based on {f3}.

Summarize current trends and identify key risks for {f4}.`,
  },
  {
    id: 'uc-content',
    section: 'templates',
    title: 'Content Creation',
    tag: 'Client facing',
    tagColor: 'amber',
    when: 'You need to draft emails, announcements, social posts, or content for a specific audience.',
    fields: [
      { id: 'f1', placeholder: 'email / post / announcement', width: 220 },
      { id: 'f2', placeholder: 'topic', width: 180 },
      { id: 'f3', placeholder: 'audience', width: 160 },
      { id: 'f4', placeholder: 'professional / friendly / confident', width: 260 },
    ],
    template: `Draft a {f1} about {f2} for {f3}.

Tone: {f4}
Length: under 150 words
Include a clear call to action.`,
  },
  {
    id: 'uc-project',
    section: 'templates',
    title: 'Project Management',
    tag: 'Ops / MSP',
    tagColor: 'blue',
    when: 'You need to plan a project, generate a checklist, create a timeline, or avoid common mistakes.',
    fields: [
      { id: 'f1', placeholder: 'project name', width: 200 },
      { id: 'f2', placeholder: 'planning / execution / evaluation', width: 240 },
      { id: 'f3', placeholder: 'checklist / timeline / template', width: 240 },
      { id: 'f4', placeholder: 'background details', width: 220 },
    ],
    template: `Create a project plan for {f1} with phases, risks, and next steps.

Stage: {f2}
Format: {f3}
Additional context: {f4}`,
  },
  {
    id: 'uc-learning',
    section: 'templates',
    title: 'Learning & Development',
    tag: 'Any role',
    tagColor: 'green',
    when: 'You need a learning plan, want to explain a concept to your team, or are exploring a new skill.',
    fields: [
      { id: 'f1', placeholder: 'topic or skill', width: 180 },
      { id: 'f2', placeholder: 'beginner / intermediate / advanced', width: 260 },
      { id: 'f3', placeholder: 'role or team context', width: 200 },
      { id: 'f4', placeholder: 'structured plan / resource list / explanation', width: 280 },
    ],
    template: `Create a learning plan for {f1} for someone at the {f2} level.

Job context: {f3}
Format: {f4}`,
  },
  {
    id: 'uc-competitive',
    section: 'templates',
    title: 'Competitive Analysis',
    tag: 'Client facing',
    tagColor: 'amber',
    when: 'You need to compare competitors, analyze their messaging, or prepare a strategic briefing.',
    fields: [
      { id: 'f1', placeholder: 'competitor or company', width: 200 },
      { id: 'f2', placeholder: 'our company or approach', width: 220 },
      { id: 'f3', placeholder: 'products / pricing / messaging', width: 240 },
      { id: 'f4', placeholder: 'leadership / sales / client', width: 200 },
      { id: 'f5', placeholder: 'brief snapshot / detailed analysis', width: 240 },
    ],
    template: `Compare {f1} with {f2} across {f3}.

Audience: {f4}
Format: {f5}`,
  },

  // ─── ADVANCED PROMPTS ────────────────────────────────────────────
  {
    id: 'adv-goal',
    section: 'advanced',
    title: 'Goal Alignment Prompt',
    tag: 'Any role',
    tagColor: 'green',
    when: 'Your objective is unclear or needs refinement before you start.',
    fields: [
      { id: 'f1', placeholder: 'describe your task', width: 280 },
    ],
    template: `Help me define a clear and specific goal for the following task: {f1}

Ask me clarifying questions one at a time until the goal is well-defined and actionable.`,
  },
  {
    id: 'adv-agent',
    section: 'advanced',
    title: 'Agent Creation Prompt',
    tag: 'Advanced',
    tagColor: 'purple',
    when: 'You need specialized expertise — someone to act as a domain expert for a specific task.',
    fields: [
      { id: 'f1', placeholder: 'role or domain', width: 200 },
      { id: 'f2', placeholder: 'your specific goal', width: 260 },
    ],
    template: `Act as an expert in {f1}.

Provide step-by-step guidance to accomplish the following goal: {f2}

Ask me one clarifying question at a time before proceeding.`,
  },
  {
    id: 'adv-workflow',
    section: 'advanced',
    title: 'Workflow Builder',
    tag: 'Ops / MSP',
    tagColor: 'blue',
    when: 'You need to build a repeatable system, process, or plan that someone else can follow.',
    fields: [
      { id: 'f1', placeholder: 'describe the task or process', width: 300 },
    ],
    template: `Break this task into clear, step-by-step actions that can be followed to completion:

Task: {f1}

Format: Numbered steps with brief descriptions. Flag any decision points or dependencies.`,
  },
  {
    id: 'adv-stress',
    section: 'advanced',
    title: 'Stress Test Prompt',
    tag: 'Advanced',
    tagColor: 'purple',
    when: 'You want to find blind spots in your plan, proposal, or idea before sharing it.',
    fields: [
      { id: 'f1', placeholder: 'relevant domain', width: 200 },
      { id: 'f2', placeholder: 'paste your plan, proposal, or idea here', width: 340 },
    ],
    template: `Act as a skeptical critic with expertise in {f1}.

Review the following and challenge it by asking one probing question at a time:

{f2}`,
  },
  {
    id: 'adv-selfcheck',
    section: 'advanced',
    title: 'Self-Check Prompt',
    tag: 'Any role',
    tagColor: 'green',
    when: 'You want AI to review its own output before you use it — the most underused move in prompting.',
    fields: [],
    defaultOpen: true,
    template: `Review what you just produced. Identify:

1. Any assumptions you made that I did not confirm
2. Anything missing that would make this stronger
3. Any claims that should be verified before use

Then give me an improved version based on that review.`,
  },

  // ─── C.R.A.F.T. FRAMEWORK ────────────────────────────────────────
  {
    id: 'craft-email',
    section: 'craft',
    title: 'C.R.A.F.T. — Client Email',
    tag: 'Client facing',
    tagColor: 'amber',
    when: 'You need a professional email that represents your company well and requires minimal editing.',
    fields: [
      { id: 'f1', placeholder: 'describe the situation', width: 280 },
      { id: 'f2', placeholder: 'senior account manager / client success lead', width: 300 },
      { id: 'f3', placeholder: 'managed services / technology', width: 240 },
      { id: 'f4', placeholder: 'write a follow-up / draft a proposal / summarize the review', width: 320 },
      { id: 'f5', placeholder: 'professional email', width: 180 },
      { id: 'f6', placeholder: 'under 200 words', width: 140 },
      { id: 'f7', placeholder: 'empathetic and confident', width: 200 },
      { id: 'f8', placeholder: 'non-technical business owner / C-level contact', width: 300 },
    ],
    template: `Context: {f1}

Role: Act as a {f2} with expertise in {f3}.

Action: {f4}

Format: {f5}, {f6}, {f7} tone. Include a clear next step.

Target Audience: {f8}`,
  },
  {
    id: 'craft-internal',
    section: 'craft',
    title: 'C.R.A.F.T. — Internal Communication',
    tag: 'Ops / MSP',
    tagColor: 'blue',
    when: 'You need to communicate a policy update or announcement to your internal team clearly.',
    fields: [
      { id: 'f1', placeholder: 'describe what is changing or being announced', width: 320 },
      { id: 'f2', placeholder: 'internal comms lead / operations manager', width: 280 },
      { id: 'f3', placeholder: 'announcement / memo / update', width: 220 },
      { id: 'f4', placeholder: 'what is changing and what the team needs to do', width: 320 },
      { id: 'f5', placeholder: 'internal support team / all staff', width: 260 },
    ],
    template: `Context: {f1}

Role: Act as an {f2} at a technology services company.

Action: Write an internal {f3} explaining {f4}.

Format: short memo, under 200 words, clear and direct with action items.

Target Audience: {f5}`,
  },
  {
    id: 'craft-summary',
    section: 'craft',
    title: 'C.R.A.F.T. — Monthly Service Summary',
    tag: 'Ops / MSP',
    tagColor: 'blue',
    when: 'You need a professional client-facing report summarizing services, issues resolved, and recommendations.',
    fields: [
      { id: 'f1', placeholder: 'client name', width: 180 },
      { id: 'f2', placeholder: 'month or period', width: 180 },
      { id: 'f3', placeholder: '300', width: 60 },
      { id: 'f4', placeholder: 'non-technical business owner', width: 240 },
    ],
    template: `Context: Providing {f1} with a monthly summary for {f2}.

Role: Act as a senior technical account manager at a managed services company.

Action: Write a professional monthly service summary with key metrics, resolved issues, and next-month recommendations.

Format: Short report with clear sections, under {f3} words, professional tone.

Target Audience: {f4}`,
  },

  // ─── SOCRATIC PROMPTING ──────────────────────────────────────────
  {
    id: 'socratic-main',
    section: 'socratic',
    title: 'Socratic Prompt — full template',
    tag: 'Advanced',
    tagColor: 'purple',
    when: 'The task is complex, quality matters, and you want the AI to reason before it generates.',
    fields: [
      { id: 'f1', placeholder: 'SOP / proposal / email / policy / plan', width: 300 },
      { id: 'f2', placeholder: 'describe your specific task', width: 300 },
      { id: 'f3', placeholder: 'who this is for', width: 200 },
      { id: 'f4', placeholder: 'desired outcome', width: 220 },
      { id: 'f5', placeholder: 'any limits or requirements', width: 240 },
    ],
    template: `You must guide this task using a three-part Socratic structure. Do not skip steps. Do not generate the final output until all three phases are complete.

Output type: {f1}

PHASE 1 — What makes a high-quality version of this output?
Analyze: purpose, what separates average from exceptional, common mistakes, evaluation criteria.
→ Pause. Do not proceed until complete.

PHASE 2 — What frameworks and principles apply?
Analyze: established frameworks, structural patterns, sequencing logic, success metrics.
→ Pause. Do not proceed until complete.

PHASE 3 — Apply to my specific task:
Task: {f2}
Audience: {f3}
Goal: {f4}
Constraints: {f5}

Generate the final output. Then provide a brief self-evaluation checklist.`,
  },
  {
    id: 'socratic-ops',
    section: 'socratic',
    title: 'Socratic Prompt — Ops/MSP example',
    tag: 'Ops / MSP',
    tagColor: 'blue',
    when: 'You need a solid SOP, process document, or internal procedure your team can actually follow.',
    fields: [
      { id: 'f1', placeholder: 'describe the process to document', width: 300 },
      { id: 'f2', placeholder: 'internal team / department', width: 220 },
      { id: 'f3', placeholder: 'consistency / accountability / onboarding', width: 280 },
      { id: 'f4', placeholder: 'length, tone, format requirements', width: 280 },
    ],
    template: `Use the Socratic three-phase structure. Do not generate output until all phases are complete.

Output type: Standard Operating Procedure

PHASE 1: What makes an excellent SOP?
PHASE 2: What frameworks apply to process documentation?

PHASE 3 — Apply to my task:
Task: {f1}
Audience: {f2}
Goal: {f3}
Constraints: {f4}`,
  },
  {
    id: 'socratic-client',
    section: 'socratic',
    title: 'Socratic Prompt — Client facing example',
    tag: 'Client facing',
    tagColor: 'amber',
    when: 'You need a proposal, upgrade pitch, or client recommendation that is well-reasoned and persuasive.',
    fields: [
      { id: 'f1', placeholder: 'Service proposal / upgrade pitch / recommendation', width: 300 },
      { id: 'f2', placeholder: 'describe what you are proposing', width: 300 },
      { id: 'f3', placeholder: 'non-technical business owner / decision-maker', width: 300 },
      { id: 'f4', placeholder: 'communicate value / make the decision easy', width: 300 },
      { id: 'f5', placeholder: 'length, tone, format', width: 220 },
    ],
    template: `Use the Socratic three-phase structure. Do not generate output until all phases are complete.

Output type: {f1}

PHASE 1: What makes an exceptional proposal in this context?
PHASE 2: What persuasion and communication frameworks apply?

PHASE 3 — Apply to my task:
Task: {f2}
Audience: {f3}
Goal: {f4}
Constraints: {f5}`,
  },

  // ─── ANATOMY OF A PROMPT ─────────────────────────────────────────
  {
    id: 'anatomy-main',
    section: 'anatomy',
    title: 'Anatomy template — fill in all six fields',
    tag: 'Advanced',
    tagColor: 'purple',
    when: 'You need precise control over how the AI reasons, structures its answer, and knows when to stop.',
    fields: [
      { id: 'f1', placeholder: 'who should the AI act as — be specific', width: 300 },
      { id: 'f2', placeholder: 'exact deliverable and success criteria', width: 320 },
      { id: 'f3', placeholder: 'who this is for', width: 200 },
      { id: 'f4', placeholder: 'desired outcome', width: 220 },
      { id: 'f5', placeholder: 'professional / empathetic / direct', width: 260 },
      { id: 'f6', placeholder: 'bullets / numbered list / table / narrative', width: 280 },
      { id: 'f7', placeholder: 'word limit, exclusions, how to end the response', width: 320 },
    ],
    template: `ROLE: {f1}

TASK: {f2}

CONTEXT: Audience: {f3} | Goal: {f4} | Tone: {f5}

REASONING: Think step-by-step. Cross-check key claims. Show only concise reasoning.

OUTPUT FORMAT: {f6}

STOP CONDITIONS: {f7}`,
  },
  {
    id: 'anatomy-ops',
    section: 'anatomy',
    title: 'Anatomy — Ops/MSP example',
    tag: 'Ops / MSP',
    tagColor: 'blue',
    when: 'You need a precise, structured output for an internal process, ticket, or operations document.',
    fields: [
      { id: 'f1', placeholder: 'create an escalation SOP / write a ticket response / draft a process doc', width: 380 },
      { id: 'f2', placeholder: 'internal support team', width: 200 },
      { id: 'f3', placeholder: 'numbered steps with role assignments', width: 280 },
      { id: 'f4', placeholder: '400', width: 60 },
    ],
    template: `ROLE: Act as a senior IT operations manager with 10+ years of MSP experience.

TASK: {f1}

CONTEXT: Audience: {f2} | Goal: consistency and accountability | Tone: clear and direct

REASONING: Think step-by-step. Identify edge cases and dependencies.

OUTPUT FORMAT: {f3}

STOP CONDITIONS: Under {f4} words. No jargon. End with a summary line.`,
  },
  {
    id: 'anatomy-client',
    section: 'anatomy',
    title: 'Anatomy — Client facing example',
    tag: 'Client facing',
    tagColor: 'amber',
    when: 'You need a polished, precise client-facing document where tone, structure, and completeness all matter.',
    fields: [
      { id: 'f1', placeholder: 'write a QBR follow-up / draft a proposal / create a service summary', width: 380 },
      { id: 'f2', placeholder: 'C-level, non-technical client', width: 240 },
      { id: 'f3', placeholder: 'reinforce confidence and outline next steps', width: 300 },
      { id: 'f4', placeholder: 'professional email with bullet action items', width: 280 },
      { id: 'f5', placeholder: '250', width: 60 },
    ],
    template: `ROLE: Act as a senior client success manager at a managed services company.

TASK: {f1}

CONTEXT: Audience: {f2} | Goal: {f3} | Tone: professional and empathetic

REASONING: Lead with what matters most to the client. Be concise.

OUTPUT FORMAT: {f4}

STOP CONDITIONS: Under {f5} words. No jargon. End with one clear call to action.`,
  },
];

export const sections = [
  { id: 'synapse', label: 'Professor Synapse', icon: '🧙🏾‍♂️', path: '/synapse' },
  { id: 'templates', label: 'Use Case Templates', icon: '📋', path: '/templates' },
  { id: 'advanced', label: 'Advanced Prompts', icon: '⚡', path: '/advanced' },
  { id: 'craft', label: 'C.R.A.F.T. Framework', icon: '✍️', path: '/craft' },
  { id: 'socratic', label: 'Socratic Prompting', icon: '🔍', path: '/socratic' },
  { id: 'anatomy', label: 'Anatomy of a Prompt', icon: '🔬', path: '/anatomy' },
];

export const getPromptById = (id) => prompts.find((p) => p.id === id);
export const getPromptsBySection = (section) => prompts.filter((p) => p.section === section);
