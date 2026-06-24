import { useState, useEffect } from 'react';

export function useHistory() {
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('itech-history') || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('itech-history', JSON.stringify(history));
  }, [history]);

  const addEntry = (entry) => {
    setHistory((prev) => {
      const filtered = prev.filter((h) => h.id !== entry.id || h.text !== entry.text);
      return [entry, ...filtered].slice(0, 10);
    });
  };

  const clearHistory = () => setHistory([]);

  return { history, addEntry, clearHistory };
}
