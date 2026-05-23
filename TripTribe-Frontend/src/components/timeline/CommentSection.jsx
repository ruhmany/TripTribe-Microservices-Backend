import { useState } from 'react';
import { Send, Reply, CornerDownRight } from 'lucide-react';

/**
 * Converts an ISO timestamp to a human-readable relative time string.
 */
export function timeAgo(dateString) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now - date) / 1000);

  if (seconds < 0) return 'just now';
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(days / 365);
  return `${years}y ago`;
}

export default function CommentSection({ comments, onComment, onReply, postId }) {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onComment(postId, newComment.trim());
    setNewComment('');
  };

  const handleSubmitReply = (e, commentId) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    onReply(postId, commentId, replyText.trim());
    setReplyText('');
    setReplyingTo(null);
  };

  const toggleReply = (commentId) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
      setReplyText('');
    } else {
      setReplyingTo(commentId);
      setReplyText('');
    }
  };

  return (
    <div
      className="comment-section"
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
    >
      {/* Comments list */}
      {comments.map((comment) => (
        <div key={comment.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {/* Main comment */}
          <div
            className="comment-bubble"
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              alignItems: 'flex-start',
            }}
          >
            <div
              className="avatar avatar-sm"
              style={{
                background: 'var(--gradient-accent)',
                fontSize: '10px',
                flexShrink: 0,
              }}
            >
              {comment.userInitials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
                  {comment.userName}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  {timeAgo(comment.timestamp)}
                </span>
              </div>
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)',
                  marginTop: '2px',
                }}
              >
                {comment.text}
              </p>
              <button
                onClick={() => toggleReply(comment.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                  fontSize: '11px',
                  color: replyingTo === comment.id ? 'var(--primary-300)' : 'var(--text-tertiary)',
                  marginTop: 'var(--space-1)',
                  cursor: 'pointer',
                  transition: 'color var(--transition-fast)',
                }}
              >
                <Reply size={12} />
                Reply
              </button>
            </div>
          </div>

          {/* Nested replies */}
          {comment.replies && comment.replies.length > 0 && (
            <div
              style={{
                marginLeft: 'var(--space-10)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
                borderLeft: '2px solid var(--surface-700)',
                paddingLeft: 'var(--space-3)',
              }}
            >
              {comment.replies.map((reply) => (
                <div
                  key={reply.id}
                  style={{
                    display: 'flex',
                    gap: 'var(--space-2)',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    className="avatar"
                    style={{
                      width: 24,
                      height: 24,
                      background: 'var(--gradient-primary)',
                      fontSize: '9px',
                      flexShrink: 0,
                    }}
                  >
                    {reply.userInitials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
                      <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                        {reply.userName}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                        {timeAgo(reply.timestamp)}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-secondary)',
                        lineHeight: 'var(--leading-relaxed)',
                        marginTop: '1px',
                      }}
                    >
                      {reply.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Reply input */}
          {replyingTo === comment.id && (
            <form
              onSubmit={(e) => handleSubmitReply(e, comment.id)}
              style={{
                marginLeft: 'var(--space-10)',
                display: 'flex',
                gap: 'var(--space-2)',
                alignItems: 'center',
              }}
            >
              <CornerDownRight size={14} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
              <input
                type="text"
                className="form-input"
                placeholder={`Reply to ${comment.userName}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                autoFocus
                style={{
                  flex: 1,
                  padding: 'var(--space-2) var(--space-3)',
                  fontSize: 'var(--text-xs)',
                  background: 'var(--surface-850)',
                }}
              />
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={!replyText.trim()}
                style={{ padding: '6px 10px' }}
              >
                <Send size={12} />
              </button>
            </form>
          )}
        </div>
      ))}

      {/* New comment input */}
      <form
        onSubmit={handleSubmitComment}
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          alignItems: 'center',
          marginTop: 'var(--space-2)',
          paddingTop: 'var(--space-3)',
          borderTop: comments.length > 0 ? '1px solid var(--glass-border)' : 'none',
        }}
      >
        <input
          type="text"
          className="form-input"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          style={{
            flex: 1,
            padding: 'var(--space-2) var(--space-3)',
            fontSize: 'var(--text-sm)',
            background: 'var(--surface-850)',
          }}
        />
        <button
          type="submit"
          className="btn btn-primary btn-sm"
          disabled={!newComment.trim()}
          style={{ padding: '6px 10px' }}
        >
          <Send size={14} />
        </button>
      </form>
    </div>
  );
}
