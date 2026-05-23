import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, Star, Award, TrendingUp, Users, Percent, Flame } from 'lucide-react';
import { postService } from '../services/api';
import PostCard from '../components/timeline/PostCard';
import { extendedFriendMatches } from '../data/mockData';

export default function Timeline() {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('viral'); // 'viral' | 'recent'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    postService.getFeed(sortBy).then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, [sortBy]);

  // Handlers for posts
  const handleReaction = async (postId, emoji) => {
    const updatedPost = await postService.addReaction(postId, emoji);
    if (updatedPost) {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, reactions: updatedPost.reactions, userReaction: emoji } : p))
      );
    }
  };

  const handleRemoveReaction = async (postId) => {
    const updatedPost = await postService.removeReaction(postId);
    if (updatedPost) {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, reactions: updatedPost.reactions, userReaction: null } : p))
      );
    }
  };

  const handleComment = async (postId, text) => {
    const newComment = await postService.addComment(postId, text);
    if (newComment) {
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              comments: [...(p.comments || []), newComment],
            };
          }
          return p;
        })
      );
    }
  };

  const handleReply = async (postId, commentId, text) => {
    const newReply = await postService.addReply(postId, commentId, text);
    if (newReply) {
      setPosts((prev) =>
        prev.map((p) => {
          if (p.id === postId) {
            return {
              ...p,
              comments: (p.comments || []).map((c) => {
                if (c.id === commentId) {
                  return {
                    ...c,
                    replies: [...(c.replies || []), newReply],
                  };
                }
                return c;
              }),
            };
          }
          return p;
        })
      );
    }
  };

  const handleShare = async (postId) => {
    const result = await postService.sharePost(postId);
    if (result) {
      setPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, shares: result.shares } : p))
      );
    }
  };

  // Trending Topics hardcoded
  const trendingTopics = [
    { tag: 'Tokyo', count: 124 },
    { tag: 'Marrakech', count: 98 },
    { tag: 'Street Food', count: 86 },
    { tag: 'Cultural', count: 75 },
    { tag: 'Solo Traveler', count: 64 },
    { tag: 'Bali', count: 52 },
  ];

  // First 3 suggested friends
  const suggestedFriends = extendedFriendMatches.slice(0, 3);

  return (
    <div className="page-content">
      <div className="timeline-page">
        {/* Main Feed Column */}
        <div className="timeline-feed">
          <div className="timeline-header">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, margin: 0 }}
              >
                What's <span className="gradient-text">Happening</span>
              </motion.h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-1)' }}>
                Discover trending activities, checkpoints, and stories from fellow explorers.
              </p>
            </div>

            {/* Sort Tabs */}
            <div className="tabs" style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <button
                className={`tab ${sortBy === 'viral' ? 'active' : ''}`}
                onClick={() => setSortBy('viral')}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  borderRadius: 'var(--border-radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  background: sortBy === 'viral' ? 'hsla(205, 85%, 45%, 0.12)' : 'transparent',
                  color: sortBy === 'viral' ? 'var(--primary-300)' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                🔥 Viral
              </button>
              <button
                className={`tab ${sortBy === 'recent' ? 'active' : ''}`}
                onClick={() => setSortBy('recent')}
                style={{
                  padding: 'var(--space-2) var(--space-4)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600,
                  borderRadius: 'var(--border-radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  background: sortBy === 'recent' ? 'hsla(205, 85%, 45%, 0.12)' : 'transparent',
                  color: sortBy === 'recent' ? 'var(--primary-300)' : 'var(--text-secondary)',
                  transition: 'all var(--transition-fast)',
                }}
              >
                ⏰ Recent
              </button>
            </div>
          </div>

          {/* Feed Content */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {loading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, idx) => (
                <div key={idx} className="post-card card-glass skeleton-card" style={{ padding: 'var(--space-5)', marginBottom: 'var(--space-5)', height: 260 }}>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                    <div className="skeleton" style={{ width: 40, height: 40, borderRadius: '50%' }} />
                    <div style={{ flex: 1 }}>
                      <div className="skeleton" style={{ width: 120, height: 14, marginBottom: 6 }} />
                      <div className="skeleton" style={{ width: 80, height: 10 }} />
                    </div>
                  </div>
                  <div className="skeleton" style={{ width: '90%', height: 18, marginBottom: 'var(--space-3)' }} />
                  <div className="skeleton" style={{ width: '100%', height: 60, marginBottom: 'var(--space-4)', borderRadius: 'var(--border-radius-md)' }} />
                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <div className="skeleton" style={{ width: 80, height: 24, borderRadius: 12 }} />
                    <div className="skeleton" style={{ width: 80, height: 24, borderRadius: 12 }} />
                  </div>
                </div>
              ))
            ) : posts.length === 0 ? (
              <div className="empty-state">
                <Sparkles size={48} />
                <h3>No posts found</h3>
                <p>Check back later for new stories!</p>
              </div>
            ) : (
              <AnimatePresence>
                {posts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onReaction={handleReaction}
                    onRemoveReaction={handleRemoveReaction}
                    onComment={handleComment}
                    onReply={handleReply}
                    onShare={handleShare}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="timeline-sidebar">
          {/* Trending Topics Widget */}
          <div className="card-glass" style={{ padding: 'var(--space-5)' }}>
            <h3><TrendingUp size={16} /> Trending Topics</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
              {trendingTopics.map((topic) => (
                <span key={topic.tag} className="trending-tag">
                  #{topic.tag}
                  <span style={{ opacity: 0.6, fontSize: '10px', marginLeft: '4px' }}>{topic.count}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Suggested Friends Widget */}
          <div className="card-glass" style={{ padding: 'var(--space-5)' }}>
            <h3><Users size={16} /> Suggested Friends</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
              {suggestedFriends.map((friend) => (
                <div key={friend.id} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', padding: 'var(--space-2) 0', borderBottom: 'var(--border-subtle)' }}>
                  <div className="avatar avatar-sm" style={{ background: 'var(--gradient-accent)', fontSize: '10px' }}>
                    {friend.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{friend.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{friend.destination}</div>
                  </div>
                  <span className="badge badge-success" style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    <Percent size={10} />{friend.compatibility}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Your Trip Progress Widget */}
          <div className="card-glass" style={{ padding: 'var(--space-5)' }}>
            <h3><Award size={16} /> Your Trip Progress</h3>
            <div style={{ marginTop: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-xs)', marginBottom: '6px' }}>
                <span>Tokyo Immersion</span>
                <strong>45% Completed</strong>
              </div>
              <div style={{ height: '8px', background: 'var(--surface-700)', borderRadius: 'var(--border-radius-full)', overflow: 'hidden' }}>
                <div style={{ width: '45%', height: '100%', background: 'var(--gradient-primary)' }} />
              </div>
              <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                <span>🎯 Next: Tsukiji Outer Market Tour</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
