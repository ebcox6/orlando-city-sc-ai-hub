import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Bot } from 'lucide-react';

// ─── Shared pill + arrow row ───────────────────────────────────────────────
function PillRow({ pills, pillStyle, arrowColor }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {pills.map((label, i) => (
        <span key={label} className="flex items-center gap-1.5">
          <span
            className="font-nunito font-semibold"
            style={{
              background:   pillStyle.bg,
              color:        pillStyle.color,
              fontSize:     '11px',
              padding:      '4px 10px',
              borderRadius: '20px',
            }}
          >
            {label}
          </span>
          {i < pills.length - 1 ? (
            <span style={{ color: arrowColor, fontSize: '11px', fontWeight: 700 }}>→</span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

// ─── Path card ────────────────────────────────────────────────────────────
function PathCard({ config, delay }) {
  const navigate = useNavigate();

  const handleClick = () => navigate(config.route);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      onClick={handleClick}
      className="flex-1 min-w-0 flex flex-col rounded-xl cursor-pointer transition-all"
      style={{
        background:   config.cardBg,
        border:       config.cardBorder,
        borderLeft:   config.accentBorder,
        borderRadius: '12px',
        padding:      '24px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform  = 'translateY(-2px)';
        e.currentTarget.style.boxShadow  = config.hoverShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform  = '';
        e.currentTarget.style.boxShadow  = '';
      }}
    >
      {/* Icon */}
      <config.Icon size={28} style={{ color: config.iconColor, marginBottom: '12px' }} />

      {/* Title */}
      <p
        className="font-bold font-poppins leading-snug mb-2"
        style={{ fontSize: '16px', color: config.titleColor }}
      >
        {config.title}
      </p>

      {/* Description */}
      <p
        className="font-nunito leading-relaxed mb-0"
        style={{ fontSize: '13px', color: config.descColor, lineHeight: 1.6 }}
      >
        {config.description}
      </p>

      {/* Divider */}
      <div style={{ borderTop: config.divider, margin: '14px 0' }} />

      {/* YOUR PATH label */}
      <p
        className="font-poppins font-bold uppercase mb-2"
        style={{ fontSize: '10px', letterSpacing: '1.5px', color: 'var(--color-accent)' }}
      >
        Your Path
      </p>

      {/* Step pills */}
      <div className="mb-4">
        <PillRow
          pills={config.pills}
          pillStyle={config.pillStyle}
          arrowColor="var(--color-accent)"
        />
      </div>

      {/* CTA button — styled div to avoid event bubbling */}
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => { e.stopPropagation(); navigate(config.route); }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(config.route); } }}
        className="w-full text-center font-nunito font-semibold rounded-lg transition-all mt-auto"
        style={{
          background:   config.btnBg,
          color:        config.btnColor,
          fontSize:     '13px',
          fontWeight:   config.btnFontWeight || 600,
          padding:      '10px',
          borderRadius: '8px',
          cursor:       'pointer',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = config.btnHover; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = config.btnBg; }}
      >
        {config.cta}
      </div>
    </motion.div>
  );
}

// ─── Card configs ─────────────────────────────────────────────────────────
const NEW_TO_AI = {
  route:        '/templates',
  Icon:         BookOpen,
  iconColor:    'var(--color-primary)',
  cardBg:       '#ffffff',
  cardBorder:   '1px solid #e2e8f0',
  accentBorder: '4px solid var(--color-primary)',
  hoverShadow:  '0 4px 16px rgba(0,30,98,0.10)',
  titleColor:   'var(--color-primary)',
  descColor:    '#64748b',
  divider:      '1px solid #e2e8f0',
  title:        "I'm New to AI Prompting",
  description:  "Start with the fundamentals. Learn how to write prompts that actually work, explore the frameworks, and build confidence before diving into agents.",
  pills:        ['Use Case Templates', 'Professor Synapse', 'Advanced Prompts'],
  pillStyle:    { bg: '#f0f4ff', color: 'var(--color-primary)' },
  btnBg:        'var(--color-primary)',
  btnColor:     '#ffffff',
  btnHover:     '#0a2d7a',
  cta:          'Start Here →',
};

const READY_TO_BUILD = {
  route:        '/agents',
  Icon:         Bot,
  iconColor:    'var(--color-accent)',
  cardBg:       'var(--color-primary)',
  cardBorder:   'none',
  accentBorder: '4px solid var(--color-accent)',
  hoverShadow:  '0 4px 20px rgba(0,30,98,0.25)',
  titleColor:   '#ffffff',
  descColor:    'rgba(255,255,255,0.75)',
  divider:      '1px solid rgba(255,255,255,0.15)',
  title:        "I'm Ready to Build",
  description:  "Skip the basics and go straight to building. Create a role-specific AI agent that knows your context, your workflow, and your team — ready in 10 minutes.",
  pills:        ['Universal Starter', 'Role Starter Pack', 'Build Your Agent'],
  pillStyle:    { bg: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)' },
  btnBg:        'var(--color-accent)',
  btnColor:     'var(--color-primary)',
  btnHover:     '#d4611a',
  btnFontWeight: 700,
  cta:          'Build Now →',
};

// ─── Main export ──────────────────────────────────────────────────────────
export default function ChooseYourPath() {
  return (
    <div className="mb-6">
      {/* Section header */}
      <h2
        className="font-bold font-poppins mb-1"
        style={{ fontSize: '20px', color: 'var(--color-primary)' }}
      >
        Choose Your Path
      </h2>
      <p
        className="font-nunito mb-5"
        style={{ fontSize: '13px', color: '#64748b' }}
      >
        Not sure where to start? Pick the path that fits where you are right now.
      </p>

      {/* Two-card row */}
      <div className="flex flex-col md:flex-row gap-4">
        <PathCard config={NEW_TO_AI}      delay={0.1} />
        <PathCard config={READY_TO_BUILD} delay={0.2} />
      </div>

      {/* Divider + "OR BROWSE ALL SECTIONS" label */}
      <div style={{ borderTop: '1px solid #e2e8f0', margin: '28px 0 0' }} />
      <p
        className="font-poppins font-bold uppercase text-center"
        style={{
          fontSize:      '10px',
          letterSpacing: '1.5px',
          color:         '#94a3b8',
          margin:        '16px 0',
        }}
      >
        Or Browse All Sections
      </p>
    </div>
  );
}
