import { useSearch } from '../hooks/useSearch';

export default function SearchBar({ onResults }) {
  const { query, setQuery, results } = useSearch();

  const handleChange = (e) => {
    setQuery(e.target.value);
    onResults && onResults(e.target.value, results);
  };

  return (
    <div className="relative flex-1 max-w-sm">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">🔍</span>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search prompts..."
        className="w-full pl-8 pr-3 py-2 text-sm bg-white/10 text-white placeholder:text-white/50 border border-white/20 rounded-lg outline-none focus:bg-white/15 focus:border-white/40 transition-all font-nunito"
      />
      {query && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/60">
          {results.length} result{results.length !== 1 ? 's' : ''}
        </span>
      )}
    </div>
  );
}
