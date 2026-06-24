import { motion } from 'framer-motion';

// ─── Division colour map ──────────────────────────────────────────────────
const DIVISION_META = {
  MSP: {
    label: 'MSP',
    fullLabel: 'Managed Service Provider',
    description: 'Help desk, account management, NOC, and client-facing IT support roles.',
    emoji: '🖥️',
    accent: 'var(--color-primary)',
    bg: '#eff6ff',
    border: '#bfdbfe',
  },
  ERP: {
    label: 'ERP',
    fullLabel: 'Enterprise Resource Planning',
    description: 'ERP consulting, implementation, change management, and training roles.',
    emoji: '⚙️',
    accent: 'var(--color-accent)',
    bg: '#fff7ed',
    border: '#fed7aa',
  },
  Corporate: {
    label: 'Corporate',
    fullLabel: 'Corporate Operations',
    description: 'HR, operations, project management, and cross-functional business roles.',
    emoji: '🏢',
    accent: 'var(--color-link)',
    bg: '#f0f9ff',
    border: '#bae6fd',
  },
};

export default function DivisionCard({ division, count, isActive, onClick }) {
  const meta = DIVISION_META[division];

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="text-left w-full rounded-xl border-2 p-5 transition-all cursor-pointer focus:outline-none"
      style={{
        background: isActive ? meta.accent : meta.bg,
        borderColor: isActive ? meta.accent : meta.border,
      }}
    >
      {/* Emoji + label row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-2xl leading-none">{meta.emoji}</span>
        {isActive ? (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full font-poppins"
            style={{ background: 'rgba(255,255,255,0.25)', color: '#fff' }}
          >
            ACTIVE
          </span>
        ) : null}
      </div>

      {/* Division name */}
      <p
        className="text-base font-bold font-poppins leading-tight mb-0.5"
        style={{ color: isActive ? '#fff' : meta.accent }}
      >
        {meta.label}
      </p>
      <p
        className="text-[11px] font-semibold font-poppins mb-2"
        style={{ color: isActive ? 'rgba(255,255,255,0.75)' : meta.accent, opacity: isActive ? 1 : 0.7 }}
      >
        {meta.fullLabel}
      </p>

      {/* Description */}
      <p
        className="text-xs leading-relaxed font-nunito"
        style={{ color: isActive ? 'rgba(255,255,255,0.85)' : '#475569' }}
      >
        {meta.description}
      </p>

      {/* Prompt count */}
      <div className="mt-3 flex items-center gap-1.5">
        <span
          className="text-[11px] font-semibold font-nunito"
          style={{ color: isActive ? 'rgba(255,255,255,0.9)' : meta.accent }}
        >
          {count} prompt{count !== 1 ? 's' : ''} available
        </span>
      </div>
    </motion.button>
  );
}
