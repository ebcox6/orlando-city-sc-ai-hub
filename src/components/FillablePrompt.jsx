import { useRef, useEffect } from 'react';

export default function FillablePrompt({ field, value, onChange }) {
  const ref = useRef(null);

  // Compute initial width from placeholder length when no explicit width given.
  // Formula: max(80, placeholder.length * 8 + 24) — ensures long placeholders
  // like "your department and primary responsibilities" render at full width.
  const initialWidth = field.width != null
    ? field.width
    : Math.max(80, ((field.placeholder || '').length * 8) + 24);

  // Auto-expand width as user types; fall back to initialWidth when empty
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.width = '4px';
    el.style.width = Math.max(initialWidth, el.scrollWidth) + 'px';
  }, [value, initialWidth]);

  const filled = value.length > 0;

  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={(e) => onChange(field.id, e.target.value)}
      placeholder={field.placeholder}
      style={{
        display: 'inline-block',
        width: initialWidth + 'px',
        minWidth: '60px',
        border: 'none',
        borderBottom: filled ? '2px solid var(--color-primary)' : '2px solid var(--color-link)',
        background: 'transparent',
        color: filled ? 'var(--color-primary)' : 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        outline: 'none',
        padding: '0 2px',
        margin: '0 1px',
        lineHeight: '1.5',
        transition: 'border-color 0.15s',
        verticalAlign: 'baseline',
      }}
      className="fill-field"
    />
  );
}
