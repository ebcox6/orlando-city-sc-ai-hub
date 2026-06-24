import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FRAMEWORKS = [
  {
    id:    'synapse',
    icon:  '🧙🏾‍♂️',
    label: 'Professor Synapse',
    desc:  'A master prompt that summons the right expert agent for any task.',
    path:  '/synapse',
  },
  {
    id:    'craft',
    icon:  '✍️',
    label: 'C.R.A.F.T. Framework',
    desc:  'The gold standard structure: Context, Role, Action, Format, Target Audience.',
    path:  '/craft',
  },
  {
    id:    'socratic',
    icon:  '🔍',
    label: 'Socratic Prompting',
    desc:  'Three-phase reasoning that forces the AI to think before it generates.',
    path:  '/socratic',
  },
  {
    id:    'advanced',
    icon:  '⚡',
    label: 'Advanced Prompts',
    desc:  'Power moves: goal alignment, agent creation, workflow builders, stress tests.',
    path:  '/advanced',
  },
  {
    id:    'anatomy',
    icon:  '🔬',
    label: 'Anatomy of a Prompt',
    desc:  'All six prompt components in one: Role, Task, Context, Reasoning, Format, Stop.',
    path:  '/anatomy',
  },
];

export default function Frameworks() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Header ────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-800 font-poppins mb-1">Frameworks</h1>
        <p className="text-sm text-slate-500 font-nunito leading-relaxed">
          Choose a framework to guide how you prompt. Each one serves a different purpose.
        </p>
      </div>

      {/* ── Framework cards ───────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {FRAMEWORKS.map((fw, i) => (
          <motion.div
            key={fw.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.25 }}
            whileHover={{ y: -3, boxShadow: '0 6px 20px rgba(0,30,98,0.10)' }}
            onClick={() => navigate(fw.path)}
            className="group bg-white border border-slate-200 rounded-xl p-4 cursor-pointer transition-all overflow-hidden relative"
          >
            {/* Orange top accent — visible on hover */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-orange opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <div className="text-2xl mb-2">{fw.icon}</div>
            <h3 className="text-sm font-semibold text-slate-800 font-poppins mb-1">{fw.label}</h3>
            <p className="text-xs text-slate-500 leading-relaxed font-nunito">{fw.desc}</p>
            <p className="text-[11px] font-semibold mt-2 font-nunito" style={{ color: 'var(--color-link)' }}>
              Open →
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
