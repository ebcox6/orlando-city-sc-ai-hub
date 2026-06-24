import { motion } from 'framer-motion';
import InfographicCard from '../components/InfographicCard';

import synapseImg   from '../assets/infographics/Professor Synapse.png';
import craftImg     from '../assets/infographics/C.R.A.F.T. Prompt Template.png';
import socraticImg  from '../assets/infographics/Socratic Prompting Guide.png';
import anatomyImg   from '../assets/infographics/Anatomy of a Prompt.png';
import universalImg from '../assets/infographics/Universal AI Prompting Guide.png';

const INFOGRAPHICS = [
  {
    src: synapseImg,
    title: 'Professor Synapse',
    description: 'Visual overview of the expert agent conductor framework — from goal clarification to specialist summoning.',
  },
  {
    src: craftImg,
    title: 'C.R.A.F.T. Prompt Template',
    description: 'A visual breakdown of the five-part structure — Context, Role, Action, Format, and Target Audience.',
  },
  {
    src: socraticImg,
    title: 'Socratic Prompting Guide',
    description: 'The three-phase reasoning method mapped visually — make AI think before it generates.',
  },
  {
    src: anatomyImg,
    title: 'Anatomy of a Prompt',
    description: 'All six prompt components — Role, Task, Context, Reasoning, Format, and Stop Conditions.',
  },
  {
    src: universalImg,
    title: 'Universal AI Prompting Guide',
    description: 'Essential prompting principles that apply across all AI tools and use cases.',
  },
];

export default function Resources() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.25 }}
    >
      <h2 className="text-xl font-bold text-prussian font-poppins mb-1">Resource Library</h2>
      <p className="text-sm text-slate-500 mb-6 leading-relaxed font-nunito">
        Visual references for every framework. Click any infographic to expand.
      </p>

      {/* Responsive grid: 3 col desktop, 2 tablet, 1 mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {INFOGRAPHICS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.25 }}
          >
            <InfographicCard
              src={item.src}
              title={item.title}
              description={item.description}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
