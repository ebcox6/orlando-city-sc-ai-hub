import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

// ─── Shared accordion wrapper for all prompt cards ────────────────────────
// Props:
//   id           — string  — used as DOM id for anchor linking
//   title        — string  — card heading
//   tagContent   — ReactNode — badge(s) shown in the collapsed header
//   when         — string  — "Use when you want to…" description (hidden on mobile)
//   defaultOpen  — bool    — open on first render (default false)
//   headerRight  — ReactNode — slot for favorites button (wrapped in stopPropagation div)
//   children     — ReactNode — prompt box + action buttons (shown when open)
export default function AccordionPromptCard({
  id,
  title,
  tagContent,
  when,
  defaultOpen = false,
  headerRight,
  children,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const cardRef = useRef(null);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => {
      const next = !prev;
      if (next) {
        // Scroll into view after animation starts
        setTimeout(() => {
          cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
      return next;
    });
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle();
      }
    },
    [handleToggle],
  );

  return (
    <div
      id={id}
      ref={cardRef}
      className="bg-white border border-slate-200 rounded-xl overflow-hidden mb-4 transition-all"
      style={{
        borderLeft: isOpen ? '3px solid var(--color-accent)' : '3px solid transparent',
      }}
    >
      {/* ── Collapsed header (always visible) ─────────────────────── */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="w-full flex items-start gap-3 px-4 py-3.5 cursor-pointer select-none transition-colors"
        style={{ background: isOpen ? '#fff' : undefined }}
        onMouseEnter={(e) => { if (!isOpen) e.currentTarget.style.background = '#f8fafc'; }}
        onMouseLeave={(e) => { if (!isOpen) e.currentTarget.style.background = ''; }}
      >
        {/* Tag badges */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {tagContent}
        </div>

        {/* Title + when */}
        <div className="flex-1 min-w-0">
          <p className="font-semibold font-poppins text-slate-800 leading-snug" style={{ fontSize: '15px' }}>
            {title}
          </p>
          {when ? (
            <p
              className="text-slate-500 font-nunito"
              style={{
                fontSize: '12px',
                marginTop: '1px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              <span
                className="font-bold tracking-wide uppercase mr-1 font-poppins"
                style={{ color: 'var(--color-accent)', fontSize: '9px' }}
              >
                Use when you want to...
              </span>
              {when}
            </p>
          ) : null}
        </div>

        {/* Right side: favorites + chevron */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {headerRight ? (
            <div onClick={(e) => e.stopPropagation()}>
              {headerRight}
            </div>
          ) : null}
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="text-slate-400"
          >
            <ChevronDown size={18} />
          </motion.span>
        </div>
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
            <div className="px-4 pb-5 pt-1 border-t border-slate-100">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
