import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor, Database, Users, FileText, Bot, Zap,
  BookOpen, Shield, Library, CheckCircle, Check,
} from 'lucide-react';

// ─── Scroll-triggered fade-up preset ──────────────────────────────────────
const fadeUp = {
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true },
  transition:  { duration: 0.4 },
};

// ─── Role-specific pill data keyed by audience ───────────────────────────
const PATH_DATA = {
  msp: {
    newbie:  ['Ticket Templates', 'Client Comms', 'Prof. Synapse'],
    builder: ['Ticket Triage Agent', 'QBR Prep Agent', 'Client Comms Agent'],
  },
  erp: {
    newbie:  ['Status Reports', 'Socratic Prompting', 'C.R.A.F.T.'],
    builder: ['Project Status Agent', 'Discovery Agent', 'Training Designer'],
  },
  general: {
    newbie:  ['Use Case Templates', 'Prof. Synapse', 'Advanced Prompts'],
    builder: ['Universal Starter', 'Role Starter Pack', 'Build Your Agent'],
  },
};

// ─── Audience card configs ─────────────────────────────────────────────────
const AUDIENCE_CARDS = [
  {
    key:          'msp',
    Icon:         Monitor,
    iconColor:    'var(--color-primary)',
    accent:       'var(--color-primary)',
    accentFaded:  'rgba(0,30,98,0.4)',
    shadowFaint:  'rgba(0,30,98,0.20)',
    hoverShadow:  '0 4px 16px rgba(0,30,98,0.10)',
    title:        'MSP / Technology Teams',
    description:  'Managed service providers, IT support teams, and technology consultants. Prompts and agents built around tickets, client communication, QBRs, and service delivery.',
    tags:         ['Ticket Triage', 'QBR Prep', 'Client Comms'],
  },
  {
    key:          'erp',
    Icon:         Database,
    iconColor:    'var(--color-accent)',
    accent:       'var(--color-accent)',
    accentFaded:  'rgba(239,114,37,0.4)',
    shadowFaint:  'rgba(239,114,37,0.20)',
    hoverShadow:  '0 4px 16px rgba(239,114,37,0.15)',
    title:        'ERP / Project Teams',
    description:  'ERP consultants, project managers, and implementation teams. Prompts and agents built around status reporting, client updates, discovery, and training delivery.',
    tags:         ['Project Status', 'Discovery', 'Training Design'],
  },
  {
    key:          'general',
    Icon:         Users,
    iconColor:    'var(--color-link)',
    accent:       'var(--color-link)',
    accentFaded:  'rgba(0,108,255,0.4)',
    shadowFaint:  'rgba(0,108,255,0.20)',
    hoverShadow:  '0 4px 16px rgba(0,108,255,0.12)',
    title:        'General Business / Education',
    description:  'Business teams, school administrators, and educators. Prompts and agents built around communication, planning, documentation, and professional development — for any role, any industry.',
    tags:         ['Content Creation', 'Planning', 'Team Comms'],
  },
];

// ─── Feature list ──────────────────────────────────────────────────────────
const FEATURES = [
  { Icon: FileText,  title: 'Prompt Templates',    desc: 'Pre-built prompts organized by task and role. Fill in the brackets and go.' },
  { Icon: Bot,       title: 'Role-Specific Agents', desc: 'Six AI agents pre-loaded with i-Tech context — ready to install in ChatGPT, Claude, or Copilot.' },
  { Icon: Zap,       title: 'Advanced Frameworks',  desc: 'C.R.A.F.T., Socratic Prompting, and the Anatomy of a Prompt — for when the stakes are higher.' },
  { Icon: BookOpen,  title: 'Professor Synapse',    desc: 'A customization layer that turns your AI into a thinking partner instead of a search box.' },
  { Icon: Shield,    title: 'Output Verification',  desc: 'The Self-Check Prompt — built into every advanced prompt so you can trust what you send.' },
  { Icon: Library,   title: 'Prompt Library',       desc: 'Role-specific prompts being added continuously across every department and team type.' },
];

// ─── Small tag pill ───────────────────────────────────────────────────────
function TagPill({ label }) {
  return (
    <span
      className="font-nunito font-semibold whitespace-nowrap"
      style={{ background: '#f0f4ff', color: 'var(--color-primary)', fontSize: '11px', padding: '3px 10px', borderRadius: '20px' }}
    >
      {label}
    </span>
  );
}

// ─── Audience card ────────────────────────────────────────────────────────
// All cards stay fully opaque and clickable at all times.
// Visual states: default | selected | unselected-while-other-is-selected
function AudienceCard({ config, delay, selectedAudience, onSelect }) {
  const isSelected   = selectedAudience === config.key;
  const otherChosen  = selectedAudience !== null && !isSelected;

  // Computed border: selected = 2px solid accent, otherwise 1px #e2e8f0
  const border    = isSelected ? `2px solid ${config.accent}` : '1px solid #e2e8f0';
  // Top accent at full opacity when selected, 40% when not
  const borderTop = `3px solid ${isSelected ? config.accent : config.accentFaded}`;
  // Ring shadow when selected
  const boxShadow = isSelected ? `0 0 0 3px ${config.shadowFaint}` : 'none';

  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.4, delay }}
      onClick={() => onSelect(config.key)}
      className="flex-1 min-w-0 flex flex-col cursor-pointer"
      style={{
        position:     'relative',
        overflow:     'visible',
        background:   '#ffffff',
        border,
        borderTop,
        borderRadius: '12px',
        padding:      '22px',
        boxShadow,
        transition:   'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        if (!isSelected) e.currentTarget.style.boxShadow = otherChosen ? 'none' : config.hoverShadow;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = isSelected ? `0 0 0 3px ${config.shadowFaint}` : 'none';
      }}
    >
      {/* Checkmark badge — only on selected card */}
      {isSelected ? (
        <div
          style={{
            position:       'absolute',
            top:            '-8px',
            right:          '-8px',
            width:          '20px',
            height:         '20px',
            borderRadius:   '50%',
            background:     config.accent,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            boxShadow:      '0 1px 4px rgba(0,0,0,0.2)',
            zIndex:         1,
          }}
        >
          <Check size={12} color="#ffffff" strokeWidth={3} />
        </div>
      ) : null}

      <config.Icon size={24} style={{ color: config.iconColor, marginBottom: '10px' }} />

      <p className="font-bold font-poppins mb-2" style={{ fontSize: '15px', color: 'var(--color-primary)' }}>
        {config.title}
      </p>

      <p className="font-nunito leading-relaxed mb-3" style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.5 }}>
        {config.description}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {config.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Path card pill row ───────────────────────────────────────────────────
function PillRow({ pills, pillStyle }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {pills.map((label, i) => (
        <span key={label} className="flex items-center gap-1.5">
          <span
            className="font-nunito font-semibold"
            style={{ background: pillStyle.bg, color: pillStyle.color, fontSize: '11px', padding: '4px 10px', borderRadius: '20px' }}
          >
            {label}
          </span>
          {i < pills.length - 1 ? (
            <span style={{ color: 'var(--color-accent)', fontSize: '11px', fontWeight: 700 }}>→</span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

// ─── Welcome path card ────────────────────────────────────────────────────
function WelcomePathCard({ variant, pills, route }) {
  const navigate = useNavigate();
  const isNewbie = variant === 'newbie';

  const cardStyle = isNewbie
    ? { background: '#ffffff', border: '1px solid #e2e8f0', borderLeft: '4px solid var(--color-primary)', borderRadius: '12px', padding: '24px' }
    : { background: 'var(--color-primary)', border: 'none', borderLeft: '4px solid var(--color-accent)', borderRadius: '12px', padding: '24px' };

  const hoverShadow = isNewbie ? '0 4px 16px rgba(0,30,98,0.10)' : '0 4px 20px rgba(0,30,98,0.25)';
  const pillStyle   = isNewbie
    ? { bg: '#f0f4ff',               color: 'var(--color-primary)' }
    : { bg: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.9)' };
  const btnStyle    = isNewbie
    ? { bg: 'var(--color-primary)', color: '#ffffff', hover: '#0a2d7a', hoverColor: '#ffffff', weight: 600 }
    : { bg: 'var(--color-accent)', color: 'var(--color-primary)', hover: '#d4611a', hoverColor: '#ffffff', weight: 700 };

  return (
    <div
      onClick={() => navigate(route)}
      className="flex-1 min-w-0 flex flex-col cursor-pointer"
      style={{ ...cardStyle, transition: 'all 0.2s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = hoverShadow; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
    >
      {isNewbie
        ? <BookOpen size={28} style={{ color: 'var(--color-primary)', marginBottom: '12px' }} />
        : <Bot      size={28} style={{ color: 'var(--color-accent)', marginBottom: '12px' }} />
      }

      <p className="font-bold font-poppins leading-snug mb-2" style={{ fontSize: '16px', color: isNewbie ? 'var(--color-primary)' : '#ffffff' }}>
        {isNewbie ? "I'm New to AI Prompting" : "I'm Ready to Build"}
      </p>

      <p className="font-nunito leading-relaxed" style={{ fontSize: '13px', color: isNewbie ? '#64748b' : 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
        {isNewbie
          ? 'Start with the fundamentals. Learn how to write prompts that work, explore the frameworks, and build confidence before diving into agents.'
          : 'Skip the basics and go straight to building. Create a role-specific AI agent that knows your context, your workflow, and your team — ready in 10 minutes.'
        }
      </p>

      <div style={{ borderTop: isNewbie ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.15)', margin: '14px 0' }} />

      <p className="font-poppins font-bold uppercase mb-2" style={{ fontSize: '10px', letterSpacing: '1.5px', color: 'var(--color-accent)' }}>
        Your Path
      </p>

      <div className="mb-4">
        <PillRow pills={pills} pillStyle={pillStyle} />
      </div>

      <div
        role="button"
        tabIndex={0}
        onClick={(e) => { e.stopPropagation(); navigate(route); }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(route); } }}
        className="w-full text-center font-nunito rounded-lg mt-auto"
        style={{ background: btnStyle.bg, color: btnStyle.color, fontSize: '13px', fontWeight: btnStyle.weight, padding: '10px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.15s, color 0.15s' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = btnStyle.hover; e.currentTarget.style.color = btnStyle.hoverColor; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = btnStyle.bg; e.currentTarget.style.color = btnStyle.color; }}
      >
        {isNewbie ? 'Start Here →' : 'Build Now →'}
      </div>
    </div>
  );
}

// ─── Section wrapper ───────────────────────────────────────────────────────
function Section({ maxWidth = '720px', children, style }) {
  return (
    <div style={{ maxWidth, margin: '0 auto', padding: '40px 40px 0', ...style }}>
      {children}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────
export default function Welcome() {
  const navigate = useNavigate();
  const [selectedAudience, setSelectedAudience] = useState(null);
  const pathRef    = useRef(null);
  // Tracks whether the first-ever selection has already triggered a scroll.
  // Reset to false on deselection so re-selecting scrolls again.
  const hasScrolled = useRef(false);

  useEffect(() => {
    const prev = document.title;
    document.title = 'Welcome — i-Tech AI Hub';
    return () => { document.title = prev; };
  }, []);

  const handleAudienceSelect = useCallback((key) => {
    setSelectedAudience((prev) => {
      if (prev === key) {
        // Deselect — reset scroll tracker
        hasScrolled.current = false;
        return null;
      }
      // New selection — scroll only on first pick (not when switching)
      if (!hasScrolled.current) {
        hasScrolled.current = true;
        setTimeout(() => {
          pathRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      return key;
    });
  }, []);

  const pathPills = selectedAudience ? PATH_DATA[selectedAudience] : null;

  return (
    <div style={{ background: '#f0f2f7', minHeight: '100vh' }}>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 1 — Hero
      ════════════════════════════════════════════════════════════════ */}
      <div
        style={{ background: 'var(--color-primary)', borderBottom: '4px solid var(--color-accent)', padding: '48px 40px' }}
        className="max-[767px]:px-5 max-[767px]:py-8"
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p className="font-poppins font-bold uppercase" style={{ fontSize: '10px', letterSpacing: '2.5px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
            Work Smarter with AI
          </p>
          <h1 className="font-poppins font-bold" style={{ fontSize: '32px', color: '#ffffff', lineHeight: 1.2, marginBottom: '8px' }}>
            Welcome to the i-Tech AI Hub
          </h1>
          <p className="font-nunito" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '20px', maxWidth: '560px' }}>
            A practical AI resource built for teams who want AI that actually fits their workflow.
          </p>
          <div className="flex flex-wrap gap-2">
            {['3 Live Sessions', '5 Prompt Frameworks', '6 Role-Specific Agents'].map((pill) => (
              <span key={pill} className="font-nunito" style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)', fontSize: '12px', padding: '6px 16px', borderRadius: '20px' }}>
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 2 — Why We Built This
      ════════════════════════════════════════════════════════════════ */}
      <Section>
        <motion.div {...fadeUp}>
          <h2 className="font-poppins font-bold" style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '12px', borderLeft: '3px solid var(--color-accent)', paddingLeft: '16px' }}>
            Why We Built This
          </h2>
          <p className="font-nunito" style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8 }}>
            We built the i-Tech AI Hub because we kept seeing the same thing — teams that wanted to
            use AI but didn't know where to start, and tools that were either too generic or too
            complex to fit real workflows. This hub is different. Every prompt, every framework, and
            every agent inside it was built around the work your team actually does — not a textbook
            version of it. Whether you're drafting a client email, preparing for a business review,
            or building your first AI agent from scratch, everything here is designed to get you to
            a useful output faster than starting from a blank page.
          </p>
        </motion.div>
      </Section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 3 — This hub is for you if...
      ════════════════════════════════════════════════════════════════ */}
      <Section style={{ paddingTop: '32px' }}>
        <motion.div {...fadeUp}>
          <h2 className="font-poppins font-bold" style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '16px' }}>
            This hub is for you if...
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Your team writes emails, reports, proposals, or documentation on a regular basis',
              'You want AI to work for your specific role — not a generic chatbot that gives generic answers',
              "You're ready to stop starting from scratch and build something that's ready every time you open it",
            ].map((text) => (
              <div key={text} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <CheckCircle size={16} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <p className="font-nunito" style={{ fontSize: '14px', color: '#1e293b', lineHeight: 1.5 }}>{text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 4 — Find Your Starting Point (audience selector)
      ════════════════════════════════════════════════════════════════ */}
      <Section maxWidth="900px" style={{ paddingTop: '40px' }}>
        <h2 className="font-poppins font-bold" style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '6px' }}>
          Find Your Starting Point
        </h2>
        <p className="font-nunito" style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px' }}>
          Select the path that best matches your team — we'll point you to the most relevant resources.
        </p>

        {/* Audience cards — always fully opaque and clickable */}
        <div className="flex flex-col md:flex-row gap-4" style={{ overflow: 'visible' }}>
          {AUDIENCE_CARDS.map((config, i) => (
            <AudienceCard
              key={config.key}
              config={config}
              delay={i * 0.1}
              selectedAudience={selectedAudience}
              onSelect={handleAudienceSelect}
            />
          ))}
        </div>

        {/* Hint — only before any selection */}
        {selectedAudience === null ? (
          <p className="font-nunito text-center" style={{ fontSize: '12px', color: '#94a3b8', marginTop: '12px' }}>
            Select your team type to continue ↓
          </p>
        ) : null}

        {/* Scroll anchor — sits just above the path cards */}
        <div ref={pathRef} style={{ scrollMarginTop: '80px' }} />

        {/* Path cards — animate in on selection, animate out on deselection */}
        <AnimatePresence>
          {selectedAudience !== null ? (
            <motion.div
              key="path-cards"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
              transition={{ duration: 0.35 }}
              style={{ marginTop: '32px' }}
            >
              <div style={{ borderTop: '1px solid #e2e8f0', marginBottom: '24px' }} />

              <h2 className="font-poppins font-bold" style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '6px' }}>
                Now choose your path
              </h2>
              <p className="font-nunito" style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>
                How do you want to get started?
              </p>

              <div className="flex flex-col md:flex-row gap-4">
                <WelcomePathCard variant="newbie"  pills={pathPills.newbie}  route="/templates" />
                <WelcomePathCard variant="builder" pills={pathPills.builder} route="/agents" />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 5 — What's Inside
      ════════════════════════════════════════════════════════════════ */}
      <Section maxWidth="900px" style={{ paddingTop: '40px' }}>
        <motion.div {...fadeUp}>
          <h2 className="font-poppins font-bold" style={{ fontSize: '18px', color: 'var(--color-primary)', marginBottom: '20px' }}>
            What's Inside the Hub
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {FEATURES.map(({ Icon, title, desc }) => (
              <div key={title} style={{ background: '#f8fafc', borderRadius: '8px', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <Icon size={20} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '1px' }} />
                <div>
                  <p className="font-poppins font-bold" style={{ fontSize: '14px', color: '#1e293b', marginBottom: '2px' }}>{title}</p>
                  <p className="font-nunito" style={{ fontSize: '13px', color: '#64748b' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ════════════════════════════════════════════════════════════════
          SECTION 6 — CTA Footer
      ════════════════════════════════════════════════════════════════ */}
      <motion.div {...fadeUp} style={{ marginTop: '48px' }}>
        <div style={{ background: 'var(--color-primary)', padding: '48px 40px', textAlign: 'center' }} className="max-[767px]:px-5 max-[767px]:py-10">
          <h2 className="font-poppins font-bold" style={{ fontSize: '24px', color: '#ffffff', marginBottom: '12px' }}>
            Want to bring this to your team?
          </h2>
          <p className="font-nunito" style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', maxWidth: '520px', margin: '0 auto 24px', lineHeight: 1.7 }}>
            We work with teams to build AI infrastructure that fits their workflow, their roles,
            and their goals. Let's talk about what that looks like for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => navigate('/')}
              className="font-nunito font-bold w-full sm:w-auto"
              style={{ background: 'var(--color-accent)', color: 'var(--color-primary)', fontSize: '14px', padding: '12px 28px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#d4611a'; e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-primary)'; }}
            >
              Explore the Hub →
            </button>
            <a
              href="https://i-techsupport.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-nunito font-semibold w-full sm:w-auto text-center"
              style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.4)', color: '#ffffff', fontSize: '14px', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', display: 'inline-block', cursor: 'pointer' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
            >
              Schedule a Conversation
            </a>
          </div>
          <p className="font-nunito" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', marginTop: '20px', letterSpacing: '0.5px' }}>
            itech-ai-hub.vercel.app
          </p>
        </div>
      </motion.div>

    </div>
  );
}
