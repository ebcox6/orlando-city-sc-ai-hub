import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AccordionSection from './AccordionSection';
import { showToast } from './Toast';
import agentTestPrompts from '../data/agentTestPrompts';

// ─── Static phase texts ───────────────────────────────────────────────────

const PHASE1_TEXT = `Without me providing any additional information, answer these three questions:

1. What is your primary role and who do you work for?
2. What are the three most important behavior rules you follow?
3. What format do you use for your most common output?`;

const PHASE3_TEXT = `After producing your output, review it and tell me:

1. What did you assume that I didn't confirm?
2. What would make this output stronger?
3. What one piece of context would most improve your performance on this task?`;

// ─── Agent selector config ────────────────────────────────────────────────

const SELECTOR_AGENTS = [
  { id: 'agent-ticket-triage',     label: 'Ticket Triage',     division: 'MSP' },
  { id: 'agent-qbr-prep',          label: 'QBR Prep',          division: 'MSP' },
  { id: 'agent-client-comms',      label: 'Client Comms',      division: 'MSP' },
  { id: 'agent-project-status',    label: 'Project Status',    division: 'ERP' },
  { id: 'agent-discovery',         label: 'Discovery',         division: 'ERP' },
  { id: 'agent-training-designer', label: 'Training Designer', division: 'ERP' },
];

const DIVISION_PILL = {
  MSP: { bg: '#dbeafe', color: '#1e40af' },
  ERP: { bg: '#fef3c7', color: '#92400e' },
};

// ─── Build the full combined prompt ──────────────────────────────────────

function buildFullPrompt(agentId) {
  const data = agentTestPrompts[agentId];
  if (!data) return '';
  return `---
PHASE 1 — CONTEXT CHECK

${PHASE1_TEXT}

---
PHASE 2 — LIVE TEST

${data.phase2}

Important: if you are missing critical information to do this well, ask ONE clarifying question before proceeding — do not guess or fill in details I have not provided.

---
PHASE 3 — SELF-ASSESSMENT

${PHASE3_TEXT}
---`;
}

// ─── Phase badge ──────────────────────────────────────────────────────────

function PhaseBadge({ label, color }) {
  return (
    <span
      className="font-poppins font-bold"
      style={{
        background:   color,
        color:        '#fff',
        fontSize:     '10px',
        borderRadius: '20px',
        padding:      '3px 10px',
        display:      'inline-block',
        lineHeight:   1.5,
      }}
    >
      {label}
    </span>
  );
}

// ─── Phase block ──────────────────────────────────────────────────────────

function PhaseBlock({ badge, badgeColor, label, content, isLast }) {
  return (
    <div style={{ marginBottom: isLast ? 0 : '20px' }}>
      <div className="flex items-center gap-2 mb-2">
        <PhaseBadge label={badge} color={badgeColor} />
        <span
          className="font-poppins font-bold"
          style={{ fontSize: '11px', color: 'var(--color-primary)', letterSpacing: '0.5px' }}
        >
          {label}
        </span>
      </div>
      <div
        className="rounded-lg font-mono"
        style={{
          background: '#1e293b',
          padding:    '12px 16px',
          fontSize:   '12px',
          color:      '#e2e8f0',
          lineHeight: 1.7,
          whiteSpace: 'pre-wrap',
        }}
      >
        {content}
      </div>
    </div>
  );
}

// ─── Scoring table ────────────────────────────────────────────────────────

const SCORE_ROWS = [
  {
    test:  'Context check',
    pass:  'Answers all 3 correctly from system prompt',
    fail:  'Gives generic AI answers, not role-specific',
  },
  {
    test:  'Clarifying question',
    pass:  'Asks exactly ONE before proceeding',
    fail:  'Asks zero (guesses) or asks multiple (stalls)',
  },
  {
    test:  'Format discipline',
    pass:  'Output matches FORMAT instructions exactly',
    fail:  'Free-form output ignoring structure',
  },
  {
    test:  'Risk / tone calibration',
    pass:  'Flags issues clearly, tone matches context',
    fail:  'Softens bad news or uses wrong register',
  },
  {
    test:  'Self-assessment',
    pass:  'Identifies real gaps, not surface ones',
    fail:  'Says "looks good" or lists trivial tweaks',
  },
];

function ScoringTable() {
  return (
    <div>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px', fontFamily: 'Nunito, sans-serif' }}>
          <thead>
            <tr style={{ background: 'var(--color-primary)' }}>
              {['Test', 'Pass', 'Fail'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding:    '10px 12px',
                    color:      '#fff',
                    fontWeight: 700,
                    fontSize:   '11px',
                    textAlign:  'left',
                    border:     '1px solid #0f3596',
                    fontFamily: 'Poppins, sans-serif',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SCORE_ROWS.map((row, i) => (
              <tr key={row.test} style={{ background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0', color: '#334155', fontWeight: 600 }}>
                  {row.test}
                </td>
                <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0', color: '#0f6e56' }}>
                  {row.pass}
                </td>
                <td style={{ padding: '10px 12px', border: '1px solid #e2e8f0', color: '#a32d2d' }}>
                  {row.fail}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p
        className="font-nunito"
        style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic', marginTop: '12px' }}
      >
        Passing score: 4 out of 5. If your agent scores 3 or below, update the CONTEXT and
        BEHAVIOR sections of your system prompt and run the test again.
      </p>
    </div>
  );
}

// ─── Refinement loop content ──────────────────────────────────────────────

const REFINEMENT_STEPS = [
  {
    num:   '01',
    label: 'Find the Gap',
    text:  'Whatever your agent identifies as missing in Phase 3, write it down. That\'s your refinement target.',
  },
  {
    num:   '02',
    label: 'Patch the System Prompt',
    text:  'Add the missing context directly to your agent\'s CONTEXT or BEHAVIOR section. For example, if it assumed client relationship type — add it explicitly.',
  },
  {
    num:   '03',
    label: 'Add a Knowledge File',
    text:  'If the agent said it needed a template, a sample output, or reference documentation — upload that file to your Claude Project or Custom GPT knowledge section.',
  },
  {
    num:   '04',
    label: 'Test Again',
    text:  'Run the same Phase 2 prompt. A well-refined agent should pass 4 of 5 criteria within 3 rounds of refinement.',
  },
];

function RefinementContent() {
  return (
    <div className="space-y-4">
      {REFINEMENT_STEPS.map((step) => (
        <div key={step.num} className="flex items-start gap-3">
          <span
            className="font-poppins font-bold flex-shrink-0"
            style={{
              background:   'var(--color-accent)',
              color:        'var(--color-primary)',
              fontSize:     '10px',
              borderRadius: '20px',
              padding:      '3px 8px',
              lineHeight:   1.5,
              marginTop:    '1px',
            }}
          >
            {step.num}
          </span>
          <div>
            <p
              className="font-poppins font-bold mb-0.5"
              style={{ fontSize: '13px', color: 'var(--color-primary)' }}
            >
              {step.label}
            </p>
            <p className="font-nunito" style={{ fontSize: '12px', color: '#64748b' }}>
              {step.text}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────
// Props:
//   sectionRef        — ref to attach to the section container
//   selectedAgentId   — string | null, controlled from Agents.jsx
//   onSelectAgent     — (id) => void
export default function AgentTestSection({ sectionRef, selectedAgentId, onSelectAgent }) {

  const agentData = selectedAgentId ? agentTestPrompts[selectedAgentId] : null;

  const handleCopyFull = useCallback(async () => {
    if (!selectedAgentId) return;
    await navigator.clipboard.writeText(buildFullPrompt(selectedAgentId));
    showToast('Test prompt copied — paste it into your agent');
  }, [selectedAgentId]);

  const handleCopyPhase2 = useCallback(async () => {
    if (!agentData) return;
    await navigator.clipboard.writeText(agentData.phase2);
    showToast('Phase 2 copied');
  }, [agentData]);

  const handleOpenClaude = useCallback(async () => {
    if (!selectedAgentId) return;
    await navigator.clipboard.writeText(buildFullPrompt(selectedAgentId));
    window.open('https://claude.ai', '_blank', 'noopener,noreferrer');
    showToast('Prompt copied — paste it into your Claude Project');
  }, [selectedAgentId]);

  return (
    <div ref={sectionRef}>
      {/* ── Section header ─────────────────────────────────────────── */}
      <div
        className="text-[10px] font-bold tracking-widest uppercase font-poppins mb-3 flex items-center gap-3"
        style={{ color: 'var(--color-accent)' }}
      >
        <span>Test Your Agent</span>
        <div className="flex-1 h-px" style={{ background: 'var(--color-accent)', opacity: 0.25 }} />
      </div>

      <p className="text-sm text-slate-500 font-nunito leading-relaxed mb-4">
        Built your agent? Run it through this three-phase test to confirm it&rsquo;s working
        — and find out exactly what to refine.
      </p>

      {/* ── Agent selector ─────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {SELECTOR_AGENTS.map((agent) => {
          const isSelected = selectedAgentId === agent.id;
          const pill = DIVISION_PILL[agent.division];
          return (
            <button
              key={agent.id}
              onClick={() => onSelectAgent(agent.id)}
              className="flex items-center gap-1.5 font-nunito font-semibold transition-all rounded-lg"
              style={{
                padding:         '8px 14px',
                fontSize:        '12px',
                fontWeight:      600,
                background:      isSelected ? 'var(--color-primary)' : '#fff',
                border:          `1px solid ${isSelected ? 'var(--color-primary)' : '#e2e8f0'}`,
                color:           isSelected ? '#fff' : '#64748b',
                cursor:          'pointer',
                transition:      'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background   = '#f8fafc';
                  e.currentTarget.style.borderColor  = 'var(--color-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.background   = '#fff';
                  e.currentTarget.style.borderColor  = '#e2e8f0';
                }
              }}
            >
              <span
                className="font-poppins font-bold flex-shrink-0"
                style={{
                  background:  isSelected ? 'rgba(255,255,255,0.25)' : pill.bg,
                  color:       isSelected ? '#fff' : pill.color,
                  fontSize:    '8px',
                  borderRadius:'10px',
                  padding:     '2px 6px',
                  lineHeight:  1.4,
                }}
              >
                {agent.division}
              </span>
              <span className="truncate">{agent.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Prompt display area ────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {selectedAgentId && agentData ? (
          <motion.div
            key={selectedAgentId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              background:   '#fff',
              border:       '1px solid #e2e8f0',
              borderLeft:   '4px solid var(--color-accent)',
              borderRadius: '10px',
              boxShadow:    '0 2px 12px rgba(0,30,98,0.08)',
              padding:      '20px',
              marginBottom: '16px',
            }}
          >
            <PhaseBlock
              badge="PHASE 1"
              badgeColor="var(--color-primary)"
              label="Context Check — Does it know who it is?"
              content={PHASE1_TEXT}
            />
            <PhaseBlock
              badge="PHASE 2"
              badgeColor="var(--color-accent)"
              label={`Live Test — ${agentData.phase2Label}`}
              content={agentData.phase2}
            />
            <PhaseBlock
              badge="PHASE 3"
              badgeColor="var(--color-link)"
              label="Self-Assessment — Find the gaps"
              content={PHASE3_TEXT}
              isLast
            />
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center justify-center"
            style={{
              background:   '#f8fafc',
              border:       '1px dashed #e2e8f0',
              borderRadius: '10px',
              height:       '120px',
              marginBottom: '16px',
            }}
          >
            <p
              className="font-nunito"
              style={{ fontSize: '13px', color: '#94a3b8', fontStyle: 'italic' }}
            >
              ← Select an agent above to generate your test prompt
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Action buttons ─────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={handleCopyFull}
          disabled={!selectedAgentId}
          className="font-nunito font-semibold transition-all"
          style={{
            background:   selectedAgentId ? 'var(--color-primary)' : '#cbd5e1',
            color:        '#fff',
            border:       'none',
            borderRadius: '8px',
            padding:      '10px 20px',
            fontSize:     '13px',
            fontWeight:   600,
            cursor:       selectedAgentId ? 'pointer' : 'not-allowed',
          }}
        >
          Copy Full Test Prompt
        </button>
        <button
          onClick={handleCopyPhase2}
          disabled={!selectedAgentId}
          className="font-nunito font-semibold transition-all"
          style={{
            background:   'transparent',
            color:        selectedAgentId ? 'var(--color-accent)' : '#cbd5e1',
            border:       `1.5px solid ${selectedAgentId ? 'var(--color-accent)' : '#cbd5e1'}`,
            borderRadius: '8px',
            padding:      '10px 20px',
            fontSize:     '13px',
            fontWeight:   600,
            cursor:       selectedAgentId ? 'pointer' : 'not-allowed',
          }}
        >
          Copy Phase 2 Only
        </button>
        <button
          onClick={handleOpenClaude}
          disabled={!selectedAgentId}
          className="font-nunito font-semibold transition-all"
          style={{
            background:   'transparent',
            color:        selectedAgentId ? 'var(--color-link)' : '#cbd5e1',
            border:       `1.5px solid ${selectedAgentId ? 'var(--color-link)' : '#cbd5e1'}`,
            borderRadius: '8px',
            padding:      '10px 20px',
            fontSize:     '13px',
            fontWeight:   600,
            cursor:       selectedAgentId ? 'pointer' : 'not-allowed',
          }}
        >
          Open in Claude
        </button>
      </div>

      {/* ── Scoring guide accordion ─────────────────────────────────── */}
      <AccordionSection title="How to Score Your Test">
        <ScoringTable />
      </AccordionSection>

      {/* ── Refinement loop accordion ───────────────────────────────── */}
      <AccordionSection title="The Refinement Loop — How to Improve Your Agent">
        <RefinementContent />
      </AccordionSection>
    </div>
  );
}
