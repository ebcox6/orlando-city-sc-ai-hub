import { useState, useCallback } from 'react';
import FillablePrompt from './FillablePrompt';
import PromptActionButtons from './PromptActionButtons';
import AccordionPromptCard from './AccordionPromptCard';

const TAG_STYLES = {
  amber:  { bg: '#fef3c7', text: '#92400e', border: '#fde68a' },
  green:  { bg: '#d1fae5', text: '#065f46', border: '#a7f3d0' },
  blue:   { bg: '#dbeafe', text: '#1e40af', border: '#bfdbfe' },
  purple: { bg: '#ede9fe', text: '#5b21b6', border: '#ddd6fe' },
};

function buildPromptText(template, fields, values) {
  let text = template;
  fields.forEach((f) => {
    const val = values[f.id] || `[${f.placeholder}]`;
    text = text.replace(new RegExp(`\\{${f.id}\\}`, 'g'), val);
  });
  return text;
}

function renderTemplate(template, fields, values, onChange) {
  if (!fields.length) {
    return <span className="whitespace-pre-wrap">{template}</span>;
  }

  const allFieldIds = fields.map((f) => f.id);
  const regex = new RegExp(`(\\{(?:${allFieldIds.join('|')})\\})`, 'g');
  const tokens = template.split(regex);

  return (
    <>
      {tokens.map((token, i) => {
        const match = token.match(/^\{(f\d+)\}$/);
        if (match) {
          const field = fields.find((f) => f.id === match[1]);
          if (field) {
            return (
              <FillablePrompt
                key={`${field.id}-${i}`}
                field={field}
                value={values[field.id] || ''}
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

// ─── Tag badge ────────────────────────────────────────────────────────────
function TagBadge({ tag, tagColor }) {
  const style = TAG_STYLES[tagColor] || TAG_STYLES.green;
  return (
    <span
      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap font-nunito"
      style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
    >
      {tag}
    </span>
  );
}

// ─── Favorites button ─────────────────────────────────────────────────────
function FavButton({ isFavorite, onToggle, promptId }) {
  return (
    <button
      onClick={() => onToggle && onToggle(promptId)}
      className="text-lg leading-none transition-transform hover:scale-110 focus:outline-none"
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorite ? '❤️' : '🤍'}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────
export default function PromptCard({ prompt, isFavorite, onToggleFavorite, onAction, defaultOpen = false }) {
  const [values, setValues] = useState({});

  const handleChange = useCallback((id, val) => {
    setValues((prev) => ({ ...prev, [id]: val }));
  }, []);

  const getText = useCallback(
    () => buildPromptText(prompt.template, prompt.fields, values),
    [prompt.template, prompt.fields, values],
  );

  const handleAction = useCallback(
    (text) => { if (onAction) onAction({ ...prompt, text }); },
    [onAction, prompt],
  );

  const shareUrl = `${window.location.origin}/${prompt.section}#${prompt.id}`;

  return (
    <AccordionPromptCard
      id={prompt.id}
      title={prompt.title}
      tagContent={<TagBadge tag={prompt.tag} tagColor={prompt.tagColor} />}
      when={prompt.when}
      defaultOpen={defaultOpen}
      headerRight={
        <FavButton
          isFavorite={isFavorite}
          onToggle={onToggleFavorite}
          promptId={prompt.id}
        />
      }
    >
      {/* Prompt box with fillable fields */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-[13px] leading-loose text-slate-800 font-nunito mt-3 mb-1">
        {renderTemplate(prompt.template, prompt.fields, values, handleChange)}
      </div>

      {/* Action buttons */}
      <PromptActionButtons
        getText={getText}
        onAction={handleAction}
        shareUrl={shareUrl}
      />
    </AccordionPromptCard>
  );
}
