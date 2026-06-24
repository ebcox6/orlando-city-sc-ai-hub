import SectionPage from '../components/SectionPage';

const TIPS = [
  { icon: '🎯', text: 'Start with Goal Alignment when you\'re unsure exactly what you need — it forces clarity before you invest time in a full prompt.' },
  { icon: '🤖', text: 'Agent Creation is the most versatile. Pair it with any domain expert persona for instant specialization.' },
  { icon: '🔄', text: 'Workflow Builder is best for SOPs, processes, and anything your team needs to repeat reliably.' },
  { icon: '💪', text: 'Stress Test before you present a plan to leadership. Let AI find the weak spots first.' },
  { icon: '✅', text: 'Self-Check is free quality control — always run it on outputs before you share them.' },
];

export default function Advanced() {
  return (
    <SectionPage
      sectionId="advanced"
      title="Advanced Prompts"
      subtitle="Power techniques for users who want more precision, more control, and better outputs from their AI interactions."
    >
      <p className="text-sm font-bold text-prussian font-poppins mb-3">Pro tips for advanced prompting</p>
      <ul className="space-y-2.5">
        {TIPS.map((tip, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
            <span className="text-base flex-shrink-0">{tip.icon}</span>
            <span>{tip.text}</span>
          </li>
        ))}
      </ul>
    </SectionPage>
  );
}
