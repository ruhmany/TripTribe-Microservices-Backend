import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Link2, Users, Check } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, postTitle, onShare }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    onShare();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          style={{ maxWidth: 420 }}
        >
          {/* Header */}
          <div className="modal-header">
            <h2>Share Post</h2>
            <button className="btn btn-ghost btn-icon" onClick={onClose} style={{ width: 32, height: 32 }}>
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Post being shared */}
            <div
              style={{
                padding: 'var(--space-3) var(--space-4)',
                background: 'var(--surface-850)',
                borderRadius: 'var(--border-radius-md)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
              }}
            >
              Sharing: <strong style={{ color: 'var(--text-primary)' }}>{postTitle}</strong>
            </div>

            {/* Copy Link */}
            <button
              className="btn btn-secondary"
              onClick={handleCopyLink}
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                gap: 'var(--space-3)',
                padding: 'var(--space-4)',
              }}
            >
              {copied ? (
                <Check size={18} style={{ color: 'var(--success)' }} />
              ) : (
                <Link2 size={18} />
              )}
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>
                  {copied ? 'Copied!' : 'Copy Link'}
                </div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 400 }}>
                  triptribe.app/post/share-link
                </div>
              </div>
            </button>

            {/* Share to Planning Room */}
            <button
              className="btn btn-secondary"
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                gap: 'var(--space-3)',
                padding: 'var(--space-4)',
              }}
            >
              <Users size={18} />
              <div style={{ textAlign: 'left', flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>Share to Planning Room</div>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontWeight: 400 }}>
                  Send to a collaborative trip
                </div>
              </div>
            </button>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
