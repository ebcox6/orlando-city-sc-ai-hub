import SectionPage from '../components/SectionPage';
import InfographicSection from '../components/InfographicSection';
import anatomyImg from '../assets/infographics/Anatomy of a Prompt.png';

const COMPONENTS = [
  { label: 'ROLE',          icon: '👤', desc: 'Who should the AI act as? Be specific about expertise and experience level.' },
  { label: 'TASK',          icon: '🎯', desc: 'The exact deliverable plus success criteria — what does done look like?' },
  { label: 'CONTEXT',       icon: '🌐', desc: 'Audience, background, goal, requirements, constraints, tone and style.' },
  { label: 'REASONING',     icon: '🧠', desc: 'Think step-by-step. Cross-check with credible sources. Show concise reasoning only.' },
  { label: 'OUTPUT FORMAT', icon: '📐', desc: 'Bullets / numbered / table / narrative. Specify structure explicitly.' },
  { label: 'STOP CONDITIONS', icon: '🛑', desc: 'Word or bullet limit, exclusions, when the task is complete, how to end the response.' },
];

const infographic = (
  <InfographicSection
    src={anatomyImg}
    title="Anatomy of a Prompt"
    description="All six prompt components mapped out — Role, Task, Context, Reasoning, Format, and Stop Conditions — with guidance on each."
  />
);

export default function Anatomy() {
  return (
    <SectionPage
      sectionId="anatomy"
      title="Anatomy of a Prompt"
      subtitle="The six components that give you complete control over AI outputs. Use all six for maximum precision and consistency."
      footer={infographic}
    >
      <p className="text-sm font-bold text-prussian font-poppins mb-3">The six components</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {COMPONENTS.map((c) => (
          <div key={c.label} className="flex items-start gap-2.5 bg-slate-50 rounded-lg p-3">
            <span className="text-xl flex-shrink-0">{c.icon}</span>
            <div>
              <p className="text-[11px] font-bold text-prussian tracking-wide font-mono">{c.label}</p>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-nunito">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 bg-amber-50 border-l-[3px] border-orange rounded-r-lg p-3 text-xs text-amber-800 leading-relaxed font-nunito">
        <strong className="text-amber-900 font-poppins">Most overlooked component:</strong> Stop Conditions. Telling the AI exactly when and how to end its response prevents bloated, over-explained outputs and keeps everything actionable.
      </div>
    </SectionPage>
  );
}
