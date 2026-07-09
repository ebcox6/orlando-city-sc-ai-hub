import { motion } from 'framer-motion';
import PromptCard from '../components/PromptCard';
import { getPromptsBySection } from '../data/prompts';
import { useFavorites } from '../hooks/useFavorites';
import { useHistory } from '../hooks/useHistory';

const SHOW_WORLD_CUP = true;

const FUN_SECTIONS = [
  { id: 'matchday',    label: 'Matchday and fans' },
  { id: 'food-promos', label: 'Food, promos, and the fan experience' },
  { id: 'rivalry',    label: 'Friendly rivalry' },
  { id: 'world-cup',  label: 'World Cup 2026', seasonal: true },
  { id: 'try-twice',  label: 'Try it twice' },
];

export default function Fun() {
  const allPrompts = getPromptsBySection('fun');
  const { isFavorite, toggle } = useFavorites();
  const { addEntry } = useHistory();

  const visibleSections = FUN_SECTIONS.filter(
    (s) => !s.seasonal || SHOW_WORLD_CUP
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.25 }}
    >
      <h2 className="text-xl font-bold text-prussian font-poppins mb-1">Fun with AI</h2>
      <p className="text-sm text-slate-500 mb-5 leading-relaxed font-nunito">
        Low-stakes prompts to try across your team. There are no wrong answers here. Fill in the
        blanks, hit send, and notice how small changes to your words change what you get back.
        That is the whole skill.
      </p>

      {visibleSections.map((section) => {
        const prompts = allPrompts.filter((p) => p.group === section.id);
        if (!prompts.length) return null;
        return (
          <div key={section.id} className="mb-6">
            <p className="text-sm font-bold text-prussian font-poppins mb-3">{section.label}</p>
            {prompts.map((prompt) => (
              <PromptCard
                key={prompt.id}
                prompt={prompt}
                isFavorite={isFavorite(prompt.id)}
                onToggleFavorite={toggle}
                onAction={(entry) => addEntry({ ...entry, usedAt: new Date().toISOString() })}
              />
            ))}
          </div>
        );
      })}
    </motion.div>
  );
}
