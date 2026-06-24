import SectionPage from '../components/SectionPage';
import InfographicSection from '../components/InfographicSection';
import universalImg from '../assets/infographics/Universal AI Prompting Guide.png';

const USE_CASES = [
  { icon: '📄', label: 'Information & Summaries', desc: 'Get up to speed fast or brief others.' },
  { icon: '📊', label: 'Market Research',         desc: 'Compare vendors, trends, and risks.' },
  { icon: '✍️', label: 'Content Creation',        desc: 'Emails, posts, announcements.' },
  { icon: '📋', label: 'Project Planning',         desc: 'Phases, checklists, timelines.' },
  { icon: '🎓', label: 'Learning Plans',           desc: 'Structured development by level.' },
  { icon: '🔍', label: 'Competitive Analysis',     desc: 'Strategic comparisons and briefings.' },
];

const infographic = (
  <InfographicSection
    src={universalImg}
    title="Universal AI Prompting Guide"
    description="Essential prompting principles that apply across all AI tools and use cases — a quick-reference for every role."
  />
);

export default function Templates() {
  return (
    <SectionPage
      sectionId="templates"
      title="Use Case Templates"
      subtitle="The six most common AI tasks in a corporate environment — fill in the brackets and go. Works with any AI platform."
      footer={infographic}
    >
      <p className="text-sm font-bold text-prussian font-poppins mb-3">When to use these</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {USE_CASES.map((item) => (
          <div key={item.label} className="flex items-start gap-2 text-xs text-slate-600 font-nunito">
            <span className="text-base">{item.icon}</span>
            <div>
              <span className="font-semibold text-slate-700">{item.label}</span>
              <span className="text-slate-500"> — {item.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </SectionPage>
  );
}
