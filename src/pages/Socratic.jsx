import SectionPage from '../components/SectionPage';
import InfographicSection from '../components/InfographicSection';
import socraticImg from '../assets/infographics/Socratic Prompting Guide.png';

const PHASES = [
  {
    num: '01',
    label: 'Theoretical',
    question: 'What makes a high-quality version of this output?',
    detail: 'The AI analyzes purpose, what separates average from exceptional, common mistakes, and evaluation criteria.',
  },
  {
    num: '02',
    label: 'Framework',
    question: 'What principles and structures apply here?',
    detail: 'The AI surfaces established frameworks, structural patterns, sequencing logic, and success metrics.',
  },
  {
    num: '03',
    label: 'Application',
    question: 'Now apply all of that to my specific task.',
    detail: 'Only after phases 1 and 2 are complete does the AI generate the final output — grounded in first principles.',
  },
];

const infographic = (
  <InfographicSection
    src={socraticImg}
    title="Socratic Prompting Guide"
    description="The three-phase reasoning method mapped visually — how to make AI think before it generates for complex, high-stakes outputs."
  />
);

export default function Socratic() {
  return (
    <SectionPage
      sectionId="socratic"
      title="Socratic Prompting"
      subtitle="Force the AI to reason before it generates. Three phases that produce dramatically better outputs on complex, high-stakes tasks."
      footer={infographic}
    >
      <p className="text-sm font-bold text-prussian font-poppins mb-3">The three phases</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
        {PHASES.map((p) => (
          <div key={p.num} className="bg-slate-50 rounded-lg p-3 border-l-[3px] border-prussian">
            <p className="text-[10px] font-bold text-orange tracking-widest uppercase mb-0.5 font-poppins">Phase {p.num}</p>
            <p className="text-sm font-semibold text-slate-800 font-poppins mb-1">{p.label}</p>
            <p className="text-xs text-slate-500 italic leading-relaxed mb-1 font-nunito">"{p.question}"</p>
            <p className="text-xs text-slate-500 leading-relaxed font-nunito">{p.detail}</p>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border-l-[3px] border-orange rounded-r-lg p-3 text-xs text-amber-800 leading-relaxed font-nunito">
        <strong className="text-amber-900 font-poppins">When to use Socratic prompting:</strong> SOPs, proposals, policies, strategic plans — any output where quality really matters and you want the AI to bring genuine expertise, not just pattern-matching.
      </div>
    </SectionPage>
  );
}
