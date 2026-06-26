// Agent test data — keyed by agent id
// Each entry drives the Phase 2 section of the Ultimate Agent Test

const agentTestPrompts = {

  'agent-sponsorship-strategy': {
    phase2Label: 'Pressure-test a live deal',
    phase2: `We're three weeks from a kit sponsor renewal deadline. Our ask is a 15% increase based on three years of brand lift data and attendance growth. The sponsor's procurement lead has gone quiet for two weeks. Tell me how to read this and what I should prepare before the next call.`,
    whatToLookFor: [
      'Identifies the silence as a signal worth addressing, not just waiting out',
      'Asks what data backs the 15% before accepting the number',
      'Offers a structured way to re-engage, not just "follow up"',
      'Flags the actual risk to the deal, not generic reassurance',
    ],
    redFlag: 'Generic sales advice with no engagement of the specific deal risk or data',
  },

  'agent-financial-analysis': {
    phase2Label: 'Defend a number under scrutiny',
    phase2: `Ownership is questioning why matchday operations came in 8% over budget this quarter. I have the variance breakdown but the board meeting is in two days and I haven't structured the narrative yet.`,
    whatToLookFor: [
      "Asks what's driving the variance before structuring anything",
      'Separates controllable from uncontrollable cost drivers',
      'Produces a narrative ownership can act on, not just a number',
      'Flags if a driver looks likely to recur next quarter',
    ],
    redFlag: 'Generic budget-overrun template with no engagement of the actual drivers',
  },

  'agent-strategic-insight': {
    phase2Label: 'Challenge a weak recommendation',
    phase2: `Our analytics show season ticket renewal intent dropping among members who attended fewer than 5 matches last season. My instinct is to recommend a loyalty discount for low-attendance members. Tell me if that's actually the right move.`,
    whatToLookFor: [
      'Questions whether discounting is treating a symptom or the actual cause',
      "Asks what's driving low attendance before recommending a fix",
      'Identifies what decision this data should actually be driving',
      "Doesn't just validate the instinct because it was offered first",
    ],
    redFlag: 'Agrees with the discount idea without examining whether it addresses the real problem',
  },

  'agent-contract-risk': {
    phase2Label: 'Flag risk before it ships',
    phase2: `A proposed jersey sponsor agreement includes a clause letting the sponsor terminate for "reputational concern" at their sole discretion with 30 days notice. Legal review is due back to the business team today. Walk me through the exposure.`,
    whatToLookFor: [
      'Flags the subjectivity of "reputational concern" as the core risk, not just notes it exists',
      'Identifies what one-sided termination rights actually expose the club to',
      "Suggests what language would balance the risk, not just that it's risky",
      "Doesn't soften the flag into a vague suggestion",
    ],
    redFlag: 'Acknowledges the clause without identifying why the lack of objective standard is the actual problem',
  },

  'agent-executive-briefing': {
    phase2Label: 'Synthesize conflicting inputs',
    phase2: `I have three updates landing on my desk: Finance says we're over budget on operations, Partnerships says a major renewal is now at risk, and Strategy says renewal intent is dropping in a key member segment. The COO wants one page, today.`,
    whatToLookFor: [
      'Identifies whether these three threads are actually connected, not just lists them',
      'Leads with what the COO needs to decide, not a summary of each department',
      'Flags the tension or compounding risk across the three inputs',
      'Stays within a genuinely one-page scope without padding',
    ],
    redFlag: 'Produces three separate summaries stapled together instead of one synthesized brief',
  },

  'agent-it-governance': {
    phase2Label: 'Frame risk for a non-technical audience',
    phase2: `We're evaluating an AI vendor for fan data analysis that would touch personal information from both club databases. Ownership wants a risk summary, but none of them are technical. I need this in business terms, not architecture diagrams.`,
    whatToLookFor: [
      'Translates technical risk into business and reputational terms immediately',
      'Identifies the specific governance question ownership actually needs answered',
      'Flags data-sharing across two club entities as its own distinct risk, not generic privacy language',
      'Avoids technical jargon unless explicitly asked for deeper detail',
    ],
    redFlag: 'Defaults to technical security language that a non-technical executive would have to translate themselves',
  },
};

export default agentTestPrompts;
