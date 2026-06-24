import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

/**
 * Reusable single-panel accordion.
 *
 * Props:
 *   title       — string shown in the header bar
 *   children    — panel body content
 *   defaultOpen — whether to start expanded (default: false)
 */
export default function AccordionSection({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const headerRef = useRef(null);

  const handleToggle = () => {
    setOpen((prev) => {
      const next = !prev;
      // Scroll header into view after the animation begins (open only)
      if (next) {
        setTimeout(() => {
          headerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 60);
      }
      return next;
    });
  };

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-3 bg-white">
      {/* ── Header / toggle ──────────────────────────────────────── */}
      <button
        ref={headerRef}
        onClick={handleToggle}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-5 py-4 bg-white hover:bg-slate-50 transition-colors text-left"
      >
        <span className="text-sm font-semibold text-slate-800 font-poppins leading-snug">
          {title}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="flex-shrink-0 text-slate-400"
        >
          <ChevronDown size={18} />
        </motion.span>
      </button>

      {/* ── Animated body ────────────────────────────────────────── */}
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="panel-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.04, 0.62, 0.23, 0.98] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="px-5 pb-6 pt-4 border-t border-slate-100">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
