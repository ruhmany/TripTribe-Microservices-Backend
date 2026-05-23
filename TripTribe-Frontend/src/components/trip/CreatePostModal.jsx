import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Link, MapPin, Sparkles, Image as ImageIcon, Plus, Check } from 'lucide-react';
import { ActivityTypeLabels, extendedFriendMatches } from '../../data/mockData';

export default function CreatePostModal({ isOpen, onClose, activity, trip, onPost }) {
  const [title, setTitle] = useState(activity?.title || '');
  const [description, setDescription] = useState(activity?.description || '');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  // Photos state
  const [photos, setPhotos] = useState([]);
  const fileInputRef = useRef(null);

  // Mentions state
  const [selectedMentions, setSelectedMentions] = useState([]);
  const [mentionSearch, setMentionSearch] = useState('');

  if (!isOpen || !activity || !trip) return null;

  // Compile candidate list for mentions
  const collaborators = trip.collaborators || [];
  const friendMatches = extendedFriendMatches || [];
  
  // Combine collaborators and suggested friends, making sure to avoid duplicates by ID
  const mentionCandidates = [
    ...collaborators.map(c => ({ userId: c.id, name: c.name, initials: c.initials })),
    ...friendMatches.map(f => ({ userId: f.id, name: f.name, initials: f.initials }))
  ].filter((v, i, a) => a.findIndex(t => t.userId === v.userId) === i);

  // Filter candidates by search
  const filteredCandidates = mentionCandidates.filter(c =>
    c.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file, idx) => ({
      id: `ph-user-${Date.now()}-${idx}`,
      // Use local Object URL so it renders in the browser
      gradient: `url(${URL.createObjectURL(file)})`,
      caption: file.name,
      isRealImage: true
    }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  };

  const removePhoto = (id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleMention = (candidate) => {
    if (selectedMentions.some(m => m.userId === candidate.userId)) {
      setSelectedMentions(prev => prev.filter(m => m.userId !== candidate.userId));
    } else {
      setSelectedMentions(prev => [...prev, candidate]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Use selected photos or fall back to gradient based on activity type
    const finalPhotos = photos.length > 0 ? photos : [
      {
        id: `ph-user-${Date.now()}`,
        gradient: 'linear-gradient(135deg, var(--primary-500), var(--accent-500))',
        caption: title,
      }
    ];

    onPost({
      title: title.trim(),
      description: description.trim(),
      rating: { average: rating, count: 1 },
      location: activity.location || 'Unknown Location',
      activityType: activity.type,
      tripId: trip.tripId,
      tripTitle: trip.title,
      photos: finalPhotos,
      mentions: selectedMentions,
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose} style={{ zIndex: 1000 }}>
        <motion.div
          className="modal card-glass"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          style={{ maxWidth: 500, width: '100%', padding: 'var(--space-6)', maxHeight: '90vh', overflowY: 'auto' }}
        >
          {/* Header */}
          <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
            <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <Sparkles size={18} className="gradient-text" /> Share Activity to Feed
            </h2>
            <button className="btn btn-ghost btn-icon" onClick={onClose} style={{ width: 32, height: 32, borderRadius: '50%' }}>
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {/* Linked Plan Info */}
            <div style={{
              padding: 'var(--space-3) var(--space-4)',
              background: 'hsla(205, 85%, 45%, 0.08)',
              border: '1px solid hsla(205, 85%, 45%, 0.15)',
              borderRadius: 'var(--border-radius-md)',
              fontSize: 'var(--text-xs)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <Link size={14} style={{ color: 'var(--primary-300)', flexShrink: 0 }} />
              <span style={{ color: 'var(--text-secondary)' }}>
                Linked Plan: <strong style={{ color: 'var(--text-primary)' }}>{trip.title}</strong>
              </span>
            </div>

            {/* Post Title */}
            <div>
              <label htmlFor="post-title" style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                Post Title
              </label>
              <input
                id="post-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
                style={{
                  width: '100%',
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--surface-850)',
                  border: 'var(--border-subtle)',
                  borderRadius: 'var(--border-radius-lg)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                }}
              />
            </div>

            {/* Post Description */}
            <div>
              <label htmlFor="post-desc" style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                What did you do? (Description)
              </label>
              <textarea
                id="post-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your experience, tips for others, etc."
                style={{
                  width: '100%',
                  padding: 'var(--space-3) var(--space-4)',
                  background: 'var(--surface-850)',
                  border: 'var(--border-subtle)',
                  borderRadius: 'var(--border-radius-lg)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-sm)',
                  resize: 'none',
                }}
              />
            </div>

            {/* Photo Upload Simulator */}
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                Add Photos
              </label>
              <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Thumbnails */}
                {photos.map((photo) => (
                  <div
                    key={photo.id}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 'var(--border-radius-md)',
                      background: photo.gradient,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      position: 'relative',
                      border: '1px solid var(--surface-600)',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      style={{
                        position: 'absolute',
                        top: -6,
                        right: -6,
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        background: 'var(--danger)',
                        color: 'white',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '10px',
                      }}
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}

                {/* Upload Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 'var(--border-radius-md)',
                    border: '1px dashed var(--surface-500)',
                    background: 'var(--surface-850)',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    gap: '4px',
                    transition: 'all var(--transition-fast)',
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary-400)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--surface-500)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <Plus size={16} />
                  <span style={{ fontSize: '9px', fontWeight: 600 }}>Photos</span>
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* Mention Selector */}
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                Mention Friends
              </label>
              <input
                type="text"
                placeholder="Search friends to mention..."
                value={mentionSearch}
                onChange={(e) => setMentionSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px var(--space-3)',
                  background: 'var(--surface-850)',
                  border: 'var(--border-subtle)',
                  borderRadius: 'var(--border-radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--text-xs)',
                  marginBottom: 'var(--space-2)',
                }}
              />
              
              {/* Candidate list wrapper */}
              <div style={{
                maxHeight: 120,
                overflowY: 'auto',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                padding: '4px',
                background: 'var(--surface-900)',
                borderRadius: 'var(--border-radius-md)',
                border: '1px solid var(--surface-800)',
              }}>
                {filteredCandidates.map((candidate) => {
                  const isSelected = selectedMentions.some(m => m.userId === candidate.userId);
                  return (
                    <button
                      key={candidate.userId}
                      type="button"
                      onClick={() => toggleMention(candidate)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px var(--space-3)',
                        borderRadius: 'var(--border-radius-full)',
                        fontSize: '11px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: isSelected ? 'hsla(205, 85%, 45%, 0.15)' : 'var(--surface-800)',
                        border: isSelected ? '1px solid var(--primary-400)' : '1px solid var(--surface-700)',
                        color: isSelected ? 'var(--primary-300)' : 'var(--text-secondary)',
                        transition: 'all var(--transition-fast)',
                      }}
                    >
                      {isSelected ? <Check size={10} style={{ color: 'var(--primary-300)' }} /> : <Plus size={10} />}
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: '50%',
                          background: 'var(--gradient-primary)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '7px',
                          color: 'white',
                          marginRight: '2px',
                        }}
                      >
                        {candidate.initials}
                      </span>
                      {candidate.name}
                    </button>
                  );
                })}
                {filteredCandidates.length === 0 && (
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', padding: '4px var(--space-2)' }}>
                    No friends found
                  </span>
                )}
              </div>
            </div>

            {/* Rating Stars Selection */}
            <div>
              <label style={{ display: 'block', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
                Your Rating
              </label>
              <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                {Array.from({ length: 5 }).map((_, index) => {
                  const starValue = index + 1;
                  const isFilled = starValue <= (hoverRating || rating);
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setRating(starValue)}
                      onMouseEnter={() => setHoverRating(starValue)}
                      onMouseLeave={() => setHoverRating(0)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        color: isFilled ? 'var(--warning)' : 'var(--surface-500)',
                        transition: 'transform 0.1s ease',
                      }}
                      className="star-rating-btn"
                    >
                      <Star
                        size={24}
                        fill={isFilled ? 'var(--warning)' : 'none'}
                        strokeWidth={1.5}
                      />
                    </button>
                  );
                })}
                <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)', marginLeft: 'var(--space-2)' }}>
                  {rating} / 5 stars
                </span>
              </div>
            </div>

            {/* Form actions */}
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
                style={{ cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ cursor: 'pointer' }}
              >
                Post Activity
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
