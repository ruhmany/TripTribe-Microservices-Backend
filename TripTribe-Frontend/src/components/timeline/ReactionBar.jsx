import { motion } from 'framer-motion';

const AVAILABLE_REACTIONS = ['❤️', '🔥', '😍', '👏', '🌍', '😂'];

export default function ReactionBar({ reactions, userReaction, onReaction, onRemoveReaction }) {
  const totalCount = Object.values(reactions || {}).reduce((sum, c) => sum + c, 0);

  const handleClick = (emoji) => {
    if (userReaction === emoji) {
      onRemoveReaction();
    } else {
      onReaction(emoji);
    }
  };

  return (
    <div
      className="reaction-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        flexWrap: 'wrap',
      }}
    >
      {/* Total count summary */}
      <span
        style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--text-secondary)',
          marginRight: 'var(--space-1)',
        }}
      >
        {totalCount} reactions
      </span>

      {AVAILABLE_REACTIONS.map((emoji) => {
        const count = reactions?.[emoji] || 0;
        const isActive = userReaction === emoji;

        return (
          <motion.button
            key={emoji}
            className="reaction-emoji"
            onClick={() => handleClick(emoji)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              padding: '4px var(--space-2)',
              borderRadius: 'var(--border-radius-full)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              cursor: 'pointer',
              background: isActive
                ? 'hsla(205, 85%, 45%, 0.18)'
                : 'var(--surface-800)',
              border: isActive
                ? '1px solid var(--primary-400)'
                : '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
              boxShadow: isActive
                ? '0 0 12px hsla(205, 85%, 45%, 0.3)'
                : 'none',
              transition: 'background var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast)',
            }}
          >
            <span style={{ fontSize: '14px', lineHeight: 1 }}>{emoji}</span>
            {count > 0 && (
              <span style={{ color: isActive ? 'var(--primary-300)' : 'var(--text-tertiary)' }}>
                {count}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
