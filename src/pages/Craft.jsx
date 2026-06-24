import SectionPage from '../components/SectionPage';
import InfographicSection from '../components/InfographicSection';
import AccordionSection from '../components/AccordionSection';
import UltimatePromptPanel from '../components/UltimatePromptPanel';
import craftImg from '../assets/infographics/C.R.A.F.T. Prompt Template.png';

// ─── Framework explainer data ─────────────────────────────────────────────
const CRAFT = [
  { letter: 'C', word: 'Context',         desc: 'What is going on — the situation or background the AI needs to understand before acting.' },
  { letter: 'R', word: 'Role',            desc: 'Who the AI should act as. Be specific about expertise, experience level, and industry.' },
  { letter: 'A', word: 'Action',          desc: 'The exact task and what success looks like — not just "write an email" but what kind and what outcome.' },
  { letter: 'F', word: 'Format',          desc: 'How the output should look: length, structure, tone, whether to use bullets, headers, or prose.' },
  { letter: 'T', word: 'Target Audience', desc: 'Who the output is written for. This shapes vocabulary, depth, and assumptions.' },
];

// ─── "How to Use C.R.A.F.T." accordion data ──────────────────────────────
const HOW_TO_USE = [
  {
    letter: 'C',
    word: 'Context',
    desc: 'Explain the situation or goal. What is this about? Why are you asking?',
  },
  {
    letter: 'R',
    word: 'Role',
    desc: 'Tell the AI who it should act as. What kind of expert or perspective should it take?',
  },
  {
    letter: 'A',
    word: 'Action',
    desc: 'Give step-by-step instructions. What exactly do you want it to do?',
  },
  {
    letter: 'F',
    word: 'Format',
    desc: 'Specify how the response should look. List, paragraph, table, lesson plan, etc.',
  },
  {
    letter: 'T',
    word: 'Target Audience',
    desc: 'Define who the response is for. Students, teachers, beginners, experts, etc.',
  },
];

// ─── Static panel content — defined at module level (rerender-no-inline-components) ─
function HowToUseContent() {
  return (
    <div>
      <p className="text-sm text-slate-600 leading-relaxed font-nunito mb-5">
        C.R.A.F.T. is a structured way to build high-quality prompts that guide AI to produce
        clear, accurate, and useful responses. It ensures you provide enough context, direction,
        and clarity so the AI knows exactly what to do.
      </p>

      <div className="flex flex-col gap-3">
        {HOW_TO_USE.map((item) => (
          <div
            key={item.letter}
            className="flex items-start gap-4 rounded-lg p-4 bg-slate-50 border-l-[3px]"
            style={{ borderLeftColor: 'var(--color-accent)' }}
          >
            <span
              className="text-3xl font-bold font-poppins flex-shrink-0 leading-none"
              style={{ color: 'var(--color-primary)' }}
            >
              {item.letter}
            </span>
            <div>
              <p className="text-sm font-bold text-slate-800 font-poppins mb-1">{item.word}</p>
              <p className="text-xs text-slate-500 font-nunito leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Combined footer: infographic + accordion ────────────────────────────
function CraftFooter() {
  return (
    <>
      {/* Reference infographic */}
      <InfographicSection
        src={craftImg}
        title="C.R.A.F.T. Prompt Template"
        description="A visual breakdown of the five-part structure — Context, Role, Action, Format, and Target Audience — with examples for each element."
      />

      {/* "Build the Ultimate Prompt" accordion section */}
      <div className="mt-8">
        {/* Section header — orange small-caps, matching hub style */}
        <div className="flex items-center gap-3 mb-4">
          <p
            className="text-[10px] font-bold tracking-widest uppercase font-poppins whitespace-nowrap"
            style={{ color: 'var(--color-accent)' }}
          >
            Build the Ultimate Prompt with C.R.A.F.T.
          </p>
          <div className="flex-1 h-px" style={{ background: 'var(--color-accent)', opacity: 0.25 }} />
        </div>

        {/* Panel 1 — How to Use */}
        <AccordionSection title="How to Use C.R.A.F.T.">
          <HowToUseContent />
        </AccordionSection>

        {/* Panel 2 — The Ultimate Prompt */}
        <AccordionSection title="The Ultimate Prompt — Copy & Use">
          <UltimatePromptPanel />
        </AccordionSection>
      </div>
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default function Craft() {
  return (
    <SectionPage
      sectionId="craft"
      title="C.R.A.F.T. Framework"
      subtitle="The gold standard five-part prompt structure. Fill in all five elements and you'll get outputs that require minimal editing."
      footer={<CraftFooter />}
    >
      <p className="text-sm font-bold text-prussian font-poppins mb-3">The five elements</p>
      <div className="divide-y divide-slate-100">
        {CRAFT.map((row) => (
          <div key={row.letter} className="flex gap-3 items-start py-2.5">
            <span className="text-xl font-bold text-prussian w-7 flex-shrink-0 font-poppins">
              {row.letter}
            </span>
            <div>
              <span className="text-sm font-semibold text-slate-800 font-poppins">{row.word}</span>
              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-nunito">{row.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 bg-amber-50 border-l-[3px] border-orange rounded-r-lg p-3 text-xs text-amber-800 leading-relaxed font-nunito">
        <strong className="text-amber-900 font-poppins">The key insight:</strong> Most bad AI
        outputs happen because the Role or Target Audience was vague. Get specific on both and
        you'll see an immediate improvement.
      </div>
    </SectionPage>
  );
}
