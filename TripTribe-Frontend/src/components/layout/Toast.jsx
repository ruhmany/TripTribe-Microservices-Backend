import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

const icons = {
  success: <CheckCircle size={18} />,
  error: <XCircle size={18} />,
  info: <Info size={18} />,
};

const colors = {
  success: { bg: 'hsla(152, 60%, 40%, 0.15)', border: 'hsla(152, 60%, 40%, 0.35)', text: 'hsl(152, 60%, 65%)' },
  error: { bg: 'hsla(0, 70%, 45%, 0.15)', border: 'hsla(0, 70%, 45%, 0.35)', text: 'hsl(0, 70%, 70%)' },
  info: { bg: 'hsla(205, 85%, 45%, 0.15)', border: 'hsla(205, 85%, 45%, 0.35)', text: 'hsl(205, 85%, 70%)' },
};

function ToastItem({ toast, onDismiss }) {
  const c = colors[toast.type] || colors.info;

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3500);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-3) var(--space-4)',
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 'var(--border-radius-lg)',
        backdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px hsla(0,0%,0%,0.3)',
        minWidth: '280px',
        maxWidth: '400px',
      }}
    >
      <span style={{ color: c.text, flexShrink: 0 }}>{icons[toast.type]}</span>
      <span style={{ flex: 1, fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 'var(--leading-snug)' }}>
        {toast.message}
      </span>
      <button
        onClick={() => onDismiss(toast.id)}
        style={{
          background: 'none', border: 'none', color: 'var(--text-tertiary)',
          cursor: 'pointer', padding: '2px', flexShrink: 0, display: 'flex',
        }}
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

export function ToastContainer({ toasts, onDismiss }) {
  return (
    <div style={{
      position: 'fixed', bottom: 'var(--space-6)', right: 'var(--space-6)',
      display: 'flex', flexDirection: 'column-reverse', gap: 'var(--space-3)',
      zIndex: 9999, pointerEvents: 'none',
    }}>
      <AnimatePresence mode="popLayout">
        {toasts.map(t => (
          <div key={t.id} style={{ pointerEvents: 'auto' }}>
            <ToastItem toast={t} onDismiss={onDismiss} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, dismissToast };
}
