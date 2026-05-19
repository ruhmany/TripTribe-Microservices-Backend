import { useState, useEffect } from 'react';
import { guideService } from '../services/api';
import { motion } from 'framer-motion';
import { Star, MapPin, Award, Search, Calendar } from 'lucide-react';

export default function Guides() {
  const [guides, setGuides] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    guideService.getGuides().then(setGuides);
  }, []);

  const filtered = guides.filter(g =>
    !search || g.name.toLowerCase().includes(search.toLowerCase()) || g.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Local <span className="gradient-text">Guides</span></h1>
        <p>Vetted, community-rated insiders who know their city inside out</p>
      </div>

      {/* Search */}
      <div className="search-bar" style={{ marginBottom: 'var(--space-8)', maxWidth: '500px' }} id="guides-search">
        <Search size={18} style={{ color: 'var(--text-tertiary)' }} />
        <input
          type="text"
          placeholder="Search by name or city..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="guides-grid">
        {filtered.map((guide, i) => (
          <motion.div
            key={guide.id}
            className="guide-card card-glass"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            id={`guide-${guide.id}`}
          >
            <div className="guide-avatar" style={{ background: `linear-gradient(135deg, ${guide.gradientColor}, ${guide.gradientColor}dd)` }}>
              {guide.initials}
            </div>
            <h3>{guide.name}</h3>
            <div className="guide-location">
              <MapPin size={13} style={{ display: 'inline', verticalAlign: '-2px' }} /> {guide.city}
            </div>

            <div className="guide-rating">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={14} fill={j < Math.round(guide.rating) ? 'currentColor' : 'none'} />
              ))}
              <span style={{ color: 'var(--text-secondary)', marginLeft: '4px' }}>
                {guide.rating} ({guide.reviewCount})
              </span>
            </div>

            <span className="badge badge-primary" style={{ marginBottom: 'var(--space-3)' }}>
              <Award size={11} /> {guide.rank}
            </span>

            <div className="guide-specialties">
              {guide.specialties.map(s => (
                <span key={s} style={{
                  fontSize: 'var(--text-xs)', padding: '2px 8px',
                  background: 'var(--surface-700)', borderRadius: 'var(--border-radius-full)',
                  color: 'var(--text-secondary)',
                }}>
                  {s}
                </span>
              ))}
            </div>

            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>
              <Calendar size={11} style={{ verticalAlign: '-1px' }} /> {guide.sessionsCompleted} sessions completed
            </div>

            <button className="btn btn-primary btn-sm" style={{ width: '100%' }}>
              Book a Session
            </button>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state card-glass">
          <Search size={48} />
          <h3>No guides found</h3>
          <p>Try a different search term</p>
        </div>
      )}
    </div>
  );
}
