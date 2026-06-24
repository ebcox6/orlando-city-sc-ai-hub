import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// Collapsed on mobile, expanded on desktop (≥768px)
// Uses lazy useState initializer — rerender-lazy-state-init
function getInitialOpen() {
  return typeof window !== 'undefined' ? window.innerWidth >= 768 : true;
}

export default function PlatformGuideCard({ config }) {
  const [open, setOpen] = useState(getInitialOpen);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <div
      className="bg-white border border-slate-200 rounded-xl overflow-hidden"
      style={{ borderTop: `4px solid ${config.accent}` }}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <button
        onClick={toggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-xl leading-none">{config.emoji}</span>
          <span className="text-sm font-bold font-poppins text-slate-800">
            {config.title}
          </span>
        </div>
        {/* Chevron — visible only on mobile (hidden sm:hidden) */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="sm:hidden flex-shrink-0 text-slate-400"
        >
          <ChevronDown size={16} />
        </motion.span>
      </button>

      {/* ── Steps body — always visible on sm+, toggleable on mobile ── */}
      {/* Desktop: always rendered (no AnimatePresence) */}
      <div className="hidden sm:block px-4 pb-4">
        <StepsList steps={config.steps} accent={config.accent} />
      </div>

      {/* Mobile: animated accordion */}
      <div className="sm:hidden">
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="steps"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.04, 0.62, 0.23, 0.98] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-4 pb-4 border-t border-slate-100 pt-3">
                <StepsList steps={config.steps} accent={config.accent} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Steps list — defined at module level ────────────────────────────────
function StepsList({ steps, accent }) {
  return (
    <ol className="space-y-2">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-2.5 text-xs font-nunito text-slate-600 leading-relaxed">
          <span
            className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5"
            style={{ background: accent, color: '#fff', opacity: 0.85 }}
          >
            {i + 1}
          </span>
          {step}
        </li>
      ))}
    </ol>
  );
}
