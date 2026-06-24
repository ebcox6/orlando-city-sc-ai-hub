import { useEffect } from 'react';
import { motion } from 'framer-motion';
import PromptCard from './PromptCard';
import { getPromptsBySection } from '../data/prompts';
import { useFavorites } from '../hooks/useFavorites';
import { useHistory } from '../hooks/useHistory';

export default function SectionPage({ sectionId, title, subtitle, children, footer }) {
  const prompts = getPromptsBySection(sectionId);
  const { isFavorite, toggle } = useFavorites();
  const { addEntry } = useHistory();

  // Scroll to anchor on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.25 }}
    >
      <h2 className="text-xl font-bold text-prussian font-poppins mb-1">{title}</h2>
      <p className="text-sm text-slate-500 mb-5 leading-relaxed font-nunito">{subtitle}</p>

      {/* Optional framework explainer */}
      {children ? (
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-5">
          {children}
        </div>
      ) : null}

      <div>
        {prompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            isFavorite={isFavorite(prompt.id)}
            onToggleFavorite={toggle}
            onAction={(entry) => addEntry({ ...entry, usedAt: new Date().toISOString() })}
            defaultOpen={Boolean(prompt.defaultOpen)}
          />
        ))}
      </div>

      {/* Optional footer — renders after all prompt cards */}
      {footer ? footer : null}
    </motion.div>
  );
}
