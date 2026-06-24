// Agent test data — keyed by agent id
// Each entry drives the Phase 2 section of the Ultimate Agent Test

const agentTestPrompts = {

  'agent-ticket-triage': {
    phase2Label: 'Handle an incomplete ticket',
    phase2: `A client just emailed: "Nothing is working and I need this fixed NOW." That is the entire message. Draft your first response and tell me what you would do next internally.`,
    whatToLookFor: [
      'Empathetic but professional tone',
      'Asks for details before promising resolution',
      'Suggests internal escalation path',
      'No promises on resolution time',
    ],
    redFlag: 'Generic apology with no MSP-specific framing or escalation thinking',
  },

  'agent-qbr-prep': {
    phase2Label: 'Build something under pressure',
    phase2: `I have a QBR with a client in 48 hours. They have been with us for 3 years. I have not prepared anything yet. Build me a starting point.`,
    whatToLookFor: [
      'Asks about client name or relationship priority first',
      'Produces agenda with time allocations',
      'Uses business value language, not technical',
      'Includes next steps with owners',
    ],
    redFlag: 'Generic QBR template with no i-Tech or MSP context',
  },

  'agent-client-comms': {
    phase2Label: 'Navigate a difficult situation',
    phase2: `A client just called my manager to complain that we have been slow to respond to their tickets for the past two weeks. My manager asked me to follow up directly. I need to send something today.`,
    whatToLookFor: [
      'Asks one clarifying question about the relationship',
      'Acknowledges without over-apologizing',
      'Proposes one concrete next step',
      'Subject line is direct, not defensive',
    ],
    redFlag: 'Groveling email with promises about future response times',
  },

  'agent-project-status': {
    phase2Label: 'Report bad news clearly',
    phase2: `My ERP project is two weeks behind and the client sponsor just asked for a written update. I have a call with her in 3 hours.`,
    whatToLookFor: [
      'Asks what caused the delay before drafting',
      'Flags risk clearly — does not soften it',
      'Uses labeled sections with action items',
      'Frames everything in business impact terms',
    ],
    redFlag: 'Softened delay language or missing owner/task/date format',
  },

  'agent-discovery': {
    phase2Label: 'Prepare with no prior knowledge',
    phase2: `I have a discovery session tomorrow with a new client in the manufacturing space. I know almost nothing about their current systems yet.`,
    whatToLookFor: [
      'Organizes questions by business process area',
      'Flags high-priority questions explicitly',
      'Avoids ERP jargon the client may not know',
      'Covers integration and reporting needs',
    ],
    redFlag: 'Random unstructured question list with no category grouping',
  },

  'agent-training-designer': {
    phase2Label: 'Design for a cold audience',
    phase2: `I need to train 15 warehouse staff on how to receive purchase orders in the new system. They have never used ERP before. Training is Friday.`,
    whatToLookFor: [
      'Asks about the specific ERP module or steps',
      'Produces numbered steps in plain language',
      'Reading level is accessible, no jargon',
      'Asks about audience comfort with technology',
    ],
    redFlag: 'Jargon-heavy content or unnumbered prose instructions',
  },
};

export default agentTestPrompts;
