import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useHistory } from '../hooks/useHistory';
import { sections } from '../data/prompts';

const SECTION_ICONS = Object.fromEntries(sections.map((s) => [s.id, s.icon]));

function timeAgo(isoString) {
  const diff = Date.now() - new Date(isoString).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function History() {
  const { history, clearHistory } = useHistory();
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.25 }}
    >
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-xl font-bold text-prussian font-poppins">History</h2>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-xs text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      <p className="text-sm text-slate-500 mb-5">
        {history.length > 0
          ? `Last ${history.length} prompt${history.length !== 1 ? 's' : ''} you copied or sent`
          : 'Prompts you copy or send will appear here.'}
      </p>

      {history.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
          <div className="text-4xl mb-3">🕐</div>
          <p className="text-slate-500 text-sm mb-4">No history yet. Use the Copy, ChatGPT, or Claude buttons on any prompt to track your activity.</p>
          <button
            onClick={() => navigate('/')}
            className="text-sm font-semibold text-prussian border border-prussian px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Get started →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((entry, i) => (
            <motion.div
              key={`${entry.id}-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="bg-white border border-slate-200 rounded-xl p-4"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-base">{SECTION_ICONS[entry.section] || '📋'}</span>
                  <span className="text-sm font-semibold text-slate-800 font-poppins">{entry.title}</span>
                </div>
                <span className="text-[11px] text-slate-400 flex-shrink-0">{timeAgo(entry.usedAt)}</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed whitespace-pre-wrap bg-slate-50 rounded-lg p-3 border border-slate-100">
                {entry.text}
              </p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={async () => {
                    await navigator.clipboard.writeText(entry.text);
                  }}
                  className="text-xs font-semibold px-3 py-1 border border-prussian text-prussian rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Copy again
                </button>
                <a
                  href={`/${entry.section}#${entry.id}`}
                  className="text-xs font-semibold px-3 py-1 border border-slate-200 text-slate-500 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  View prompt
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
