import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';
import PromptActionButtons from './PromptActionButtons';

// ─── Prompt text stored as plain strings — no template interpolation ──────
const ULTIMATE_PROMPT =
`CONTEXT: We are going to create one of the best ChatGPT prompts ever written. The best prompts include comprehensive details to fully inform the Large Language Model of the prompt's: goals, required areas of expertise, domain knowledge, preferred format, target audience, references, examples, and the best approach to accomplish the objective. Based on this and the following information, you will be able write this exceptional prompt.

ROLE: You are an LLM prompt generation expert. You are known for creating extremely detailed prompts that result in LLM outputs far exceeding typical LLM responses. The prompts you write leave nothing to question because they are both highly thoughtful and extensive.

ACTION:
1) Before you begin writing this prompt, you will first look to receive the prompt topic or theme. If I don't provide the topic or theme for you, please request it.
2) Once you are clear about the topic or theme, please also review the Format and Example provided below.
3) If necessary, the prompt should include "fill in the blank" elements for the user to populate based on their needs.
4) Take a deep breath and take it one step at a time.
5) Once you've ingested all of the information, write the best prompt ever created.

FORMAT: For organizational purposes, you will use an acronym called "C.R.A.F.T." where each letter represents a section of the prompt:
- Context: Describes the situation and what knowledge the LLM should reference.
- Role: Defines the LLM's expertise — always an industry-leading expert with 20+ years of experience.
- Action: A numbered list of sequential steps for the LLM to follow to maximize success.
- Format: The structural arrangement of the output — essay, table, markdown, list, etc.
- Target Audience: The ultimate consumer of the output, including demographics, reading level, and preferences.

TARGET AUDIENCE: The target audience for this prompt creation is the current version of ChatGPT. Please reference the example I have just provided for your output. Again, take a deep breath and take it one step at a time.`;

const SELF_CHECK =
`Review what you just produced. Identify: 1. Any assumptions you made that I did not confirm 2. Anything missing that would make this stronger 3. Any claims that should be verified before use. Then give me an improved version based on that review.`;

// ─── Static getText function — stable, defined at module level ────────────
const getUltimatePromptText = () => ULTIMATE_PROMPT;

// ─── CopyButton — defined at module level ────────────────────────────────
function CopyButton({ copied, onClick, label, copiedLabel, className }) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={className}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={copied ? 'done' : 'idle'}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.15 }}
        >
          {copied ? copiedLabel : label}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────
export default function UltimatePromptPanel() {
  const [followUpCopied, setFollowUpCopied] = useState(false);

  const copyFollowUp = async () => {
    await navigator.clipboard.writeText(SELF_CHECK);
    setFollowUpCopied(true);
    setTimeout(() => setFollowUpCopied(false), 2000);
  };

  return (
    <div>
      {/* ── Usage note callout ───────────────────────────────────── */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-4">
        <Info size={15} className="flex-shrink-0 mt-0.5" style={{ color: '#92400e' }} />
        <p className="text-xs text-amber-800 leading-relaxed font-nunito">
          Copy and paste this into your AI chat to begin, or use one of the buttons below to
          open it directly in ChatGPT, Claude, Gemini, or Copilot with the prompt pre-loaded.
        </p>
      </div>

      {/* ── Prompt block ─────────────────────────────────────────── */}
      <div
        className="rounded-lg overflow-auto mb-4"
        style={{ background: '#0a1628', maxHeight: '360px', padding: '20px 24px' }}
      >
        <pre
          className="text-xs leading-relaxed font-mono whitespace-pre-wrap select-text"
          style={{ color: '#c9d4e8', margin: 0 }}
        >
          {ULTIMATE_PROMPT}
        </pre>
      </div>

      {/* ── Action buttons ───────────────────────────────────────── */}
      <div className="mb-5">
        <PromptActionButtons
          getText={getUltimatePromptText}
          wrapperClassName="flex flex-wrap gap-2"
        />
      </div>

      {/* ── Self-check callout ───────────────────────────────────── */}
      <div
        className="rounded-lg border px-4 py-4"
        style={{ background: '#eff6ff', borderColor: '#bfdbfe' }}
      >
        <div className="flex items-start gap-2 mb-3">
          <Info size={14} className="flex-shrink-0 mt-0.5" style={{ color: '#1d4ed8' }} />
          <p className="text-xs font-semibold font-poppins" style={{ color: '#1e40af' }}>
            After AI generates your prompt, paste this follow-up:
          </p>
        </div>
        <p className="text-xs text-blue-800 leading-relaxed font-nunito mb-3 pl-5">
          &ldquo;{SELF_CHECK}&rdquo;
        </p>
        <div className="pl-5">
          <CopyButton
            copied={followUpCopied}
            onClick={copyFollowUp}
            label="⎘ Copy follow-up"
            copiedLabel="✓ Copied!"
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border-[1.5px] transition-all font-nunito ${
              followUpCopied
                ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
                : 'border-blue-300 text-blue-700 bg-white hover:bg-blue-50'
            }`}
          />
        </div>
      </div>
    </div>
  );
}
