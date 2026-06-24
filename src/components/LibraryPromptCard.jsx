import { useState, useCallback } from 'react';
import FillablePrompt from './FillablePrompt';
import PromptActionButtons from './PromptActionButtons';
import AccordionPromptCard from './AccordionPromptCard';

const DIVISION_ACCENT = {
  MSP:       { bg: '#eff6ff', border: '#bfdbfe', text: 'var(--color-primary)' },
  ERP:       { bg: '#fff7ed', border: '#fed7aa', text: '#c2410c' },
  Corporate: { bg: '#f0f9ff', border: '#bae6fd', text: '#0369a1' },
};

function buildPromptText(template, fields, values) {
  let text = template;
  fields.forEach((f) => {
    const val = values[f.key] || `[${f.placeholder}]`;
    text = text.replace(new RegExp(`\\{${f.key}\\}`, 'g'), val);
  });
  return text;
}

function renderTemplate(template, fields, values, onChange) {
  if (!fields.length) {
    return <span className="whitespace-pre-wrap">{template}</span>;
  }

  const allKeys = fields.map((f) => f.key);
  const regex = new RegExp(`(\\{(?:${allKeys.join('|')})\\})`, 'g');
  const tokens = template.split(regex);

  return (
    <>
      {tokens.map((token, i) => {
        const match = token.match(/^\{(\w+)\}$/);
        if (match) {
          const field = fields.find((f) => f.key === match[1]);
          if (field) {
            return (
              <FillablePrompt
                key={`${field.key}-${i}`}
                field={{ id: field.key, placeholder: field.placeholder }}
                value={values[field.key] || ''}
                onChange={onChange}
              />
            );
          }
        }
        return token.split('\n').map((line, li, arr) => (
          <span key={`t-${i}-${li}`}>
            {line}
            {li < arr.length - 1 ? <br /> : null}
          </span>
        ));
      })}
    </>
  );
}

// ─── Division + role + task badge row ────────────────────────────────────
function DivisionBadges({ prompt }) {
  const accent = DIVISION_ACCENT[prompt.division] || DIVISION_ACCENT.MSP;
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span
        className="text-[10px] font-bold px-2 py-0.5 rounded-full font-nunito"
        style={{ background: accent.bg, color: accent.text, border: `1px solid ${accent.border}` }}
      >
        {prompt.division}
      </span>
      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-nunito border border-slate-200 max-[479px]:hidden">
        {prompt.role}
      </span>
      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-nunito border border-amber-200 max-[479px]:hidden">
        {prompt.task}
      </span>
    </div>
  );
}

// ─── Favorites button ─────────────────────────────────────────────────────
function FavButton({ isFavorite, onToggle, promptId }) {
  return (
    <button
      onClick={() => onToggle && onToggle(promptId)}
      className="text-lg leading-none flex-shrink-0 transition-transform hover:scale-110 focus:outline-none"
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────
export default function LibraryPromptCard({ prompt, isFavorite, onToggleFavorite }) {
  const [values, setValues] = useState({});

  const handleChange = useCallback((id, val) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  }, []);

  const getText = useCallback(
    () => buildPromptText(prompt.template, prompt.fields, values),
    [prompt.template, prompt.fields, values],
  );

  return (
    <AccordionPromptCard
      id={prompt.id}
      title={prompt.title}
      tagContent={<DivisionBadges prompt={prompt} />}
      when={prompt.when}
      defaultOpen={false}
      headerRight={
        <FavButton
          isFavorite={isFavorite}
          onToggle={onToggleFavorite}
          promptId={prompt.id}
        />
      }
    >
      {/* Prompt box */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-[13px] leading-loose text-slate-800 font-nunito mt-3 mb-1">
        {renderTemplate(prompt.template, prompt.fields, values, handleChange)}
      </div>

      {/* Action buttons */}
      <PromptActionButtons getText={getText} />

      {/* Tailor section */}
      {prompt.tailorFor ? (
        <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '12px', paddingTop: '10px' }}>
          <p
            className="font-poppins font-semibold"
            style={{ fontSize: '10px', color: '#64748b', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}
          >
            Tailor this prompt for
          </p>
          <p
            className="font-nunito"
            style={{ fontSize: '12px', color: '#94a3b8', fontStyle: 'italic', lineHeight: 1.6 }}
          >
            {prompt.tailorFor}
          </p>
        </div>
      ) : null}
    </AccordionPromptCard>
  );
}
