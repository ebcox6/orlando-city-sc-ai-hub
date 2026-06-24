import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Module-level singleton listener ────────────────────────────────────────
// Only one Toast component should be mounted in the app at a time.
// Call showToast() from anywhere — no context or prop drilling needed.
let _listener = null;

export function showToast(message) {
  if (_listener) _listener(message);
}

// ─── Toast component — mount once in App.jsx ────────────────────────────────
export default function Toast() {
  const [message, setMessage] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Register this instance as the active listener
    _listener = (msg) => {
      // Reset timer if a toast is already showing
      if (timerRef.current) clearTimeout(timerRef.current);
      setMessage(msg);
      timerRef.current = setTimeout(() => setMessage(null), 3000);
    };
    return () => {
      _listener = null;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return createPortal(
    <AnimatePresence>
      {message ? (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 10, x: '-50%' }}
          animate={{ opacity: 1, y: 0,  x: '-50%' }}
          exit={{    opacity: 0, y: 10, x: '-50%' }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed left-1/2 pointer-events-none"
          style={{ bottom: '24px', zIndex: 9999 }}
        >
          <div
            className="flex items-center gap-2 whitespace-nowrap shadow-lg"
            style={{
              background:   '#1e293b',
              color:        '#ffffff',
              fontSize:     '13px',
              fontWeight:   500,
              fontFamily:   'var(--font-nunito, sans-serif)',
              borderRadius: '24px',
              padding:      '10px 20px',
            }}
          >
            <span style={{ color: '#4ade80', fontSize: '12px' }}>✓</span>
            {message}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
