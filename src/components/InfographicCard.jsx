import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Maximize2 } from 'lucide-react';

export default function InfographicCard({ src, title, description }) {
  const [open, setOpen] = useState(false);

  /* ── Body scroll lock ─────────────────────────────────────── */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* ── Escape key ───────────────────────────────────────────── */
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') setOpen(false);
  }, []);

  useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKey);
    }
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, handleKey]);

  /* ── Modal portal ─────────────────────────────────────────── */
  const modal = (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
          style={{ zIndex: 9999 }}
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-8"
          aria-modal="true"
          role="dialog"
          aria-label={title}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/75" />

          {/* Image container */}
          <motion.div
            key="modal-content"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center gap-3 max-w-[90vw] max-h-[90vh]"
          >
            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-3 -right-3 z-10 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-100 transition-colors"
              aria-label="Close"
            >
              <X size={16} className="text-slate-700" />
            </button>

            {/* Full-size image */}
            <img
              src={src}
              alt={title}
              loading="lazy"
              className="rounded-xl shadow-2xl block"
              style={{
                maxWidth: '90vw',
                maxHeight: 'calc(90vh - 56px)',
                objectFit: 'contain',
                background: '#fff',
              }}
            />

            {/* Download button */}
            <a
              href={src}
              download={`${title}.png`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg border-[1.5px] border-white/40 text-white bg-white/10 hover:bg-white/20 transition-all font-nunito backdrop-blur-sm"
            >
              <Download size={13} />
              Download
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* ── Card ──────────────────────────────────────────────── */}
      <motion.div
        whileHover={{ y: -2, boxShadow: '0 6px 20px rgba(0,30,98,0.08)' }}
        transition={{ duration: 0.18 }}
        className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col gap-3"
      >
        {/* Thumbnail */}
        <div
          className="w-full rounded-lg overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center cursor-pointer"
          style={{ height: '120px' }}
          onClick={() => setOpen(true)}
        >
          <img
            src={src}
            alt={title}
            loading="lazy"
            className="max-h-[120px] w-full object-contain"
          />
        </div>

        {/* Text */}
        <div>
          <h4 className="text-sm font-semibold text-slate-800 font-poppins leading-snug mb-0.5">
            {title}
          </h4>
          <p className="text-xs text-slate-500 font-nunito leading-relaxed">
            {description}
          </p>
        </div>

        {/* View button */}
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg border-[1.5px] border-prussian text-prussian bg-white hover:bg-blue-50 transition-all font-nunito w-full mt-auto"
        >
          <Maximize2 size={12} />
          View Infographic
        </button>
      </motion.div>

      {/* ── Modal (portal to body) ─────────────────────────────── */}
      {typeof document !== 'undefined' ? createPortal(modal, document.body) : null}
    </>
  );
}
