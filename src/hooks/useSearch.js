import { useState, useMemo } from 'react';
import { prompts } from '../data/prompts';

export function useSearch() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return prompts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.template.toLowerCase().includes(q) ||
        (p.when && p.when.toLowerCase().includes(q)) ||
        p.tag.toLowerCase().includes(q)
    );
  }, [query]);

  return { query, setQuery, results };
}
