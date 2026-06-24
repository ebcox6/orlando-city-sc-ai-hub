import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';
import { useHistory } from '../hooks/useHistory';
import { getPromptById } from '../data/prompts';
import PromptCard from '../components/PromptCard';

export default function Favorites() {
  const { favorites, toggle, isFavorite } = useFavorites();
  const { addEntry } = useHistory();
  const navigate = useNavigate();

  const favoritePrompts = favorites.map(getPromptById).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.25 }}
    >
      <h2 className="text-xl font-bold text-prussian font-poppins mb-1">Favorites</h2>
      <p className="text-sm text-slate-500 mb-5">
        {favoritePrompts.length > 0
          ? `${favoritePrompts.length} saved prompt${favoritePrompts.length !== 1 ? 's' : ''}`
          : 'Heart any prompt card to save it here.'}
      </p>

      {favoritePrompts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <div className="text-4xl mb-3">🤍</div>
          <p className="text-slate-500 text-sm mb-4">No favorites yet. Browse the frameworks and click the heart icon on any prompt card.</p>
          <button
            onClick={() => navigate('/synapse')}
            className="text-sm font-semibold text-prussian border border-prussian px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Browse prompts →
          </button>
        </div>
      ) : (
        <div>
          {favoritePrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              prompt={prompt}
              isFavorite={isFavorite(prompt.id)}
              onToggleFavorite={toggle}
              onAction={(entry) => addEntry({ ...entry, usedAt: new Date().toISOString() })}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
