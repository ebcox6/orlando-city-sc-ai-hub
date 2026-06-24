import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import PromptActionButtons from './PromptActionButtons';

// Division badge styles
const DIVISION_BADGE = {
  MSP: { bg: '#dbeafe', text: '#1e40af' },
  ERP: { bg: '#fef3c7', text: '#92400e' },
};

// ─── getText factory — stable per template ────────────────────────────────
function makeGetText(template) {
  return () => template;
}

// ─── Test Your Agent callout — links to the standalone test section ───────
function TestAgentCallout({ agentId, onGoToTest }) {
  return (
    <div
      className="mt-4"
      style={{
        background:   '#f0f4ff',
        borderLeft:   '3px solid var(--color-link)',
        borderRadius: '0 8px 8px 0',
        padding:      '12px 16px',
      }}
    >
      <p
        className="font-poppins mb-1"
        style={{
          color:         'var(--color-link)',
          fontSize:      '10px',
          fontWeight:    700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}
      >
        Test This Agent
      </p>
      <p className="font-nunito text-slate-600 mb-2" style={{ fontSize: '13px' }}>
        Run the three-phase test to confirm your agent is working and find what to refine.
      </p>
      <button
        onClick={() => onGoToTest && onGoToTest(agentId)}
        className="font-nunito font-semibold"
        style={{
          background:  'none',
          border:      'none',
          padding:     0,
          color:       'var(--color-link)',
          fontSize:    '12px',
          fontWeight:  600,
          cursor:      'pointer',
        }}
      >
        Go to Agent Test ↓
      </button>
    </div>
  );
}

// ─── Collapsed row ────────────────────────────────────────────────────────
function CollapsedRow({ prompt, isOpen, onToggle }) {
  const badge = DIVISION_BADGE[prompt.division] || DIVISION_BADGE.MSP;

  return (
    <button
      onClick={onToggle}
      aria-expanded={isOpen}
      className="w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors"
      style={{ background: 'transparent' }}
    >
      {/* Division badge */}
      <span
        className="text-[10px] font-bold px-2 py-0.5 rounded-full font-nunito flex-shrink-0 hidden sm:inline"
        style={{ background: badge.bg, color: badge.text }}
      >
        {prompt.division}
      </span>

      {/* Title + description */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold font-poppins text-slate-800 leading-snug" style={{ fontSize: '15px' }}>
          {prompt.title}
        </p>
        {prompt.when ? (
          <p
            className="text-slate-500 font-nunito"
            style={{
              fontSize: '13px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {prompt.when}
          </p>
        ) : null}
      </div>

      {/* Role chip — desktop only */}
      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-nunito border border-slate-200 flex-shrink-0 hidden md:inline">
        {prompt.role}
      </span>

      {/* Chevron */}
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="flex-shrink-0 text-slate-400"
      >
        <ChevronDown size={18} />
      </motion.span>
    </button>
  );
}

// ─── Expanded body ────────────────────────────────────────────────────────
function ExpandedBody({ prompt, onGoToTest }) {
  const getText = makeGetText(prompt.template);

  return (
    <div className="px-4 pb-5 pt-3 border-t border-slate-100">
      {/* Prompt box */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-[13px] leading-loose text-slate-800 font-nunito mb-1">
        <span className="whitespace-pre-wrap">{prompt.template}</span>
      </div>

      {/* Action buttons */}
      <PromptActionButtons getText={getText} />

      {/* Test This Agent callout */}
      <TestAgentCallout agentId={prompt.id} onGoToTest={onGoToTest} />
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────
// Props:
//   prompt      — agent prompt object from agentPrompts.js
//   isOpen      — boolean, controlled from parent (Agents.jsx)
//   onToggle    — () => void, called to open/close this card
//   onGoToTest  — (agentId) => void, scrolls to test section and pre-selects agent
export default function AgentCard({ prompt, isOpen, onToggle, onGoToTest }) {
  return (
    <div
      className="bg-white border border-slate-200 rounded-xl overflow-hidden"
      style={{ background: isOpen ? '#fff' : undefined }}
    >
      {/* ── Collapsed header row (always visible) ─────────────────── */}
      <div
        className="transition-colors"
        style={{ background: isOpen ? '#fff' : undefined }}
        onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = '#f8fafc'; }}
        onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.background = ''; }}
      >
        <CollapsedRow prompt={prompt} isOpen={isOpen} onToggle={onToggle} />
      </div>

      {/* ── Animated expanded body ─────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <ExpandedBody prompt={prompt} onGoToTest={onGoToTest} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
