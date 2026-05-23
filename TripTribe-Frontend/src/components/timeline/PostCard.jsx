import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, MessageCircle, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { ActivityTypeLabels, ActivityTypeColors } from '../../data/mockData';
import PhotoCarousel from './PhotoCarousel';
import ReactionBar from './ReactionBar';
import CommentSection, { timeAgo } from './CommentSection';
import ShareModal from './ShareModal';
import MentionTag from './MentionTag';

export default function PostCard({ post, onReaction, onRemoveReaction, onComment, onReply, onShare, index = 0 }) {
  const [showComments, setShowComments] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const activityLabel = ActivityTypeLabels[post.activityType] || 'Other';
  const activityColor = ActivityTypeColors[post.activityType] || 'hsl(0, 0%, 55%)';

  const handleShare = () => {
    onShare(post.id);
  };

  // Star rating display
  const renderStars = (average) => {
    const stars = [];
    const fullStars = Math.floor(average);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          size={14}
          fill={i < fullStars ? 'var(--warning)' : 'none'}
          stroke={i < fullStars ? 'var(--warning)' : 'var(--surface-500)'}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <motion.div
        className="post-card card-glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
        style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)' }}
      >
        {/* Header */}
        <div
          className="post-card-header"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <div
            className="avatar avatar-sm"
            style={{ background: 'var(--gradient-primary)', fontSize: '11px' }}
          >
            {post.ownerInitials}
          </div>
          <div className="post-card-header-info" style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{post.ownerName}</span>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>·</span>
              <Link
                to={`/trip/${post.tripId}`}
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--primary-300)',
                  fontWeight: 500,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  textDecoration: 'none',
                }}
                className="post-trip-link"
              >
                {post.tripTitle}
              </Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginTop: '2px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                {timeAgo(post.postedAt)}
              </span>
              <span
                className="badge"
                style={{
                  background: `${activityColor}18`,
                  color: activityColor,
                  border: `1px solid ${activityColor}30`,
                  fontSize: '10px',
                  padding: '1px 8px',
                }}
              >
                {activityLabel}
              </span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
          {post.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            lineHeight: 'var(--leading-relaxed)',
            marginBottom: 'var(--space-3)',
          }}
        >
          {post.description}
        </p>

        {/* Location badge */}
        <div
          className="badge badge-primary"
          style={{
            marginBottom: 'var(--space-4)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
          }}
        >
          <MapPin size={12} />
          {post.location}
        </div>

        {/* Photo carousel */}
        {post.photos && post.photos.length > 0 && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <PhotoCarousel photos={post.photos} />
          </div>
        )}

        {/* Rating */}
        {post.rating && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-3)',
            }}
          >
            <div style={{ display: 'flex', gap: '2px' }}>
              {renderStars(post.rating.average)}
            </div>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--warning)' }}>
              {post.rating.average}
            </span>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
              ({post.rating.count} ratings)
            </span>
          </div>
        )}

        {/* Mentions */}
        {post.mentions && post.mentions.length > 0 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>with</span>
            {post.mentions.map((m) => (
              <MentionTag key={m.userId} name={m.name} initials={m.initials} />
            ))}
          </div>
        )}

        {/* Reaction bar */}
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <ReactionBar
            reactions={post.reactions}
            userReaction={post.userReaction}
            onReaction={(emoji) => onReaction(post.id, emoji)}
            onRemoveReaction={() => onRemoveReaction(post.id)}
          />
        </div>

        {/* Action bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            paddingTop: 'var(--space-3)',
            borderTop: '1px solid var(--glass-border)',
          }}
        >
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShowComments(!showComments)}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}
          >
            <MessageCircle size={16} />
            <span style={{ fontSize: 'var(--text-xs)' }}>{post.comments?.length || 0}</span>
            {showComments ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setShareModalOpen(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}
          >
            <Share2 size={16} />
            <span style={{ fontSize: 'var(--text-xs)' }}>{post.shares || 0}</span>
          </button>
        </div>

        {/* Comment section (expandable) */}
        {showComments && (
          <div style={{ marginTop: 'var(--space-4)' }}>
            <CommentSection
              comments={post.comments || []}
              onComment={onComment}
              onReply={onReply}
              postId={post.id}
            />
          </div>
        )}
      </motion.div>

      {/* Share modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        postTitle={post.title}
        onShare={handleShare}
      />
    </>
  );
}
