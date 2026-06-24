import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { config } from '../tenant.config';

const CTA_CARDS = [
  {
    to:   '/library',
    icon: '📚',
    label: 'Prompt Library',
    sub:   'Browse and use role-specific prompts for your team',
  },
  {
    to:   '/agents',
    icon: '🤖',
    label: 'Build Your Agent',
    sub:   'Create a custom AI agent ready in 10 minutes',
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Hero card ─────────────────────────────────────────────── */}
      <div
        className="rounded-xl p-6 mb-6 flex items-center justify-between gap-5 flex-wrap"
        style={{ background: 'var(--color-primary)' }}
      >
        <div>
          <h1 className="text-white text-xl font-bold font-poppins mb-1.5 leading-snug">
            {config.hubTitle}
          </h1>
          <p className="text-white/70 text-sm leading-relaxed max-w-lg font-nunito">
            {config.hubSubtitle}
          </p>
          <div className="flex gap-2 mt-3 flex-wrap">
            {['21 Prompts', '6 Frameworks', 'Fillable Fields', 'Send to AI'].map((pill) => (
              <span
                key={pill}
                className="text-[11px] text-white/80 border border-white/20 bg-white/10 px-3 py-1 rounded-full font-nunito"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
        <span className="text-5xl hidden md:block select-none" aria-hidden>🧙🏾‍♂️</span>
      </div>

      {/* ── CTA cards ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CTA_CARDS.map((card) => (
          <motion.div
            key={card.to}
            whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,30,98,0.10)' }}
            onClick={() => navigate(card.to)}
            className="group bg-white border border-slate-200 rounded-xl p-5 cursor-pointer transition-all overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-orange opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="text-3xl mb-3">{card.icon}</div>
            <p className="text-base font-semibold text-slate-800 font-poppins mb-1">{card.label}</p>
            <p className="text-sm text-slate-500 leading-relaxed font-nunito">{card.sub}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
