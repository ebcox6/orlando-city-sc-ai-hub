import SectionPage from '../components/SectionPage';
import InfographicSection from '../components/InfographicSection';
import synapseImg from '../assets/infographics/Professor Synapse.png';

const STEPS = [
  { n: 1, text: 'Copy the Master Prompt and paste it into ChatGPT or Claude.' },
  { n: 2, text: 'Professor Synapse will ask clarifying questions one at a time.' },
  { n: 3, text: 'Once your goal is clear, it summons a specialized expert agent.' },
  { n: 4, text: 'Work with the agent until your goal is accomplished.' },
];

const COMMANDS = [
  { cmd: '/start', desc: 'Begin a new task with goal clarification' },
  { cmd: '/save', desc: 'Save the current context and progress' },
  { cmd: '/reason', desc: 'Ask Synapse to explain its reasoning' },
  { cmd: '/settings', desc: 'Adjust preferences and output style' },
  { cmd: '/new', desc: 'Start fresh with a new agent' },
];

const infographic = (
  <InfographicSection
    src={synapseImg}
    title="Professor Synapse"
    description="Visual overview of how the expert agent conductor framework works — from goal clarification to specialist summoning."
  />
);

export default function Synapse() {
  return (
    <SectionPage
      sectionId="synapse"
      title="Professor Synapse Framework"
      subtitle="A master prompt that turns ChatGPT or Claude into a conductor of expert agents — clarifying your goals first, then summoning the right specialist."
      footer={infographic}
    >
      <h3 className="text-sm font-bold text-prussian font-poppins mb-3">How it works</h3>
      <ol className="space-y-2 mb-4">
        {STEPS.map((s) => (
          <li key={s.n} className="flex items-start gap-3 text-sm text-slate-600 font-nunito">
            <span className="w-6 h-6 rounded-full bg-prussian text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
              {s.n}
            </span>
            {s.text}
          </li>
        ))}
      </ol>

      <h3 className="text-sm font-bold text-prussian font-poppins mb-2">Commands</h3>
      <div className="flex flex-wrap gap-2">
        {COMMANDS.map((c) => (
          <div key={c.cmd} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
            <span className="text-xs font-bold text-prussian font-mono">{c.cmd}</span>
            <span className="text-xs text-slate-500 ml-2 font-nunito">{c.desc}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-amber-50 border-l-[3px] border-orange rounded-r-lg p-3 text-xs text-amber-800 leading-relaxed font-nunito">
        <strong className="text-amber-900 font-poppins">Pro tip:</strong> After installing the Master Prompt, try typing{' '}
        <code className="bg-amber-100 px-1 rounded font-mono">/start</code>{' '}
        to let Professor Synapse guide you from the very beginning.
      </div>
    </SectionPage>
  );
}
