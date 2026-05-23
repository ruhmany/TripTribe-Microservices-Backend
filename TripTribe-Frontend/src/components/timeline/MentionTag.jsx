import { motion } from 'framer-motion';

export default function MentionTag({ name, initials }) {
  return (
    <motion.span
      className="mention-tag"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-1)',
        padding: '2px var(--space-2)',
        background: 'hsla(205, 85%, 45%, 0.12)',
        border: '1px solid hsla(205, 85%, 45%, 0.2)',
        borderRadius: 'var(--border-radius-full)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        color: 'var(--primary-300)',
        cursor: 'pointer',
        transition: 'color var(--transition-fast), background var(--transition-fast)',
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: 'var(--gradient-primary)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '9px',
          fontWeight: 700,
          color: 'white',
          flexShrink: 0,
        }}
      >
        {initials}
      </span>
      @{name}
    </motion.span>
  );
}
