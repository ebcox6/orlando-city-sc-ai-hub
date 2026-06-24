import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { showToast } from './Toast';

// ─── Platform config ──────────────────────────────────────────────────────
// copyFirst: true  → copy prompt silently, open URL with no query param, show toast
// copyFirst: false → open URL with prompt pre-loaded via ?q= parameter
const PLATFORMS = [
  {
    key:       'chatgpt',
    label:     '↗ Open in ChatGPT',
    getUrl:    (text) => `https://chatgpt.com/?q=${encodeURIComponent(text)}`,
    border:    '#059669',
    text:      '#047857',
    hover:     '#ecfdf5',
    copyFirst: false,
  },
  {
    key:       'claude',
    label:     '↗ Open in Claude',
    getUrl:    (text) => `https://claude.ai/new?q=${encodeURIComponent(text)}`,
    border:    '#7c3aed',
    text:      '#6d28d9',
    hover:     '#f5f3ff',
    copyFirst: false,
  },
  {
    key:       'gemini',
    label:     '↗ Open in Gemini',
    getUrl:    () => 'https://gemini.google.com/app',
    border:    '#1a73e8',
    text:      '#1a73e8',
    hover:     '#e8f0fe',
    copyFirst: true,
  },
  {
    key:       'copilot',
    label:     '↗ Open in Copilot',
    getUrl:    () => 'https://copilot.microsoft.com',
    border:    '#0078d4',
    text:      '#0078d4',
    hover:     '#e3f2fd',
    copyFirst: true,
  },
];

const TOAST_MESSAGE = 'Prompt copied — paste it when the page opens';

// ─── Single platform button ───────────────────────────────────────────────
function PlatformButton({ platform, getText, onAction }) {
  const handleClick = async () => {
    const text = getText();
    if (platform.copyFirst) {
      await navigator.clipboard.writeText(text);
      showToast(TOAST_MESSAGE);
    } else {
      if (onAction) onAction(text);
      window.open(platform.getUrl(text), '_blank', 'noopener,noreferrer');
      return;
    }
    window.open(platform.getUrl(text), '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={handleClick}
      className="flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-lg border-[1.5px] transition-all font-nunito w-full sm:w-auto"
      style={{ borderColor: platform.border, color: platform.text, background: '#fff' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = platform.hover; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; }}
    >
      {platform.label}
    </motion.button>
  );
}

// ─── Share button ─────────────────────────────────────────────────────────
function ShareButton({ shareUrl }) {
  const [shareMsg, setShareMsg] = useState(false);

  const handleShare = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setShareMsg(true);
    setTimeout(() => setShareMsg(false), 2200);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={handleShare}
      className={`flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-lg border-[1.5px] transition-all font-nunito w-full sm:w-auto sm:ml-auto ${
        shareMsg
          ? 'border-dodger text-dodger bg-blue-50'
          : 'border-slate-300 text-slate-500 bg-white hover:bg-slate-50'
      }`}
    >
      {shareMsg ? '✓ Link copied' : '🔗 Share'}
    </motion.button>
  );
}

// ─── Exported component ───────────────────────────────────────────────────
// Props:
//   getText          — () => string   — returns current prompt text
//   onAction         — (text) => void — optional, called on copy or URL-param open
//   shareUrl         — string         — if provided, renders Share button
//   wrapperClassName — string         — override for the outer flex container
export default function PromptActionButtons({ getText, onAction, shareUrl, wrapperClassName }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const text = getText();
    await navigator.clipboard.writeText(text);
    if (onAction) onAction(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }, [getText, onAction]);

  return (
    <div className={wrapperClassName ?? 'flex flex-wrap gap-2 mt-3'}>
      {/* Copy */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={handleCopy}
        className={`flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2.5 rounded-lg border-[1.5px] transition-all font-nunito w-full sm:w-auto ${
          copied
            ? 'border-emerald-600 text-emerald-700 bg-emerald-50'
            : 'border-prussian text-prussian bg-white hover:bg-blue-50'
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={copied ? 'check' : 'copy'}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-1.5"
          >
            {copied ? '✓ Copied!' : '⎘ Copy prompt'}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* Platform buttons */}
      {PLATFORMS.map((platform) => (
        <PlatformButton
          key={platform.key}
          platform={platform}
          getText={getText}
          onAction={onAction}
        />
      ))}

      {/* Share */}
      {shareUrl ? <ShareButton shareUrl={shareUrl} /> : null}
    </div>
  );
}
