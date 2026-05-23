import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users, MapPin, Calendar, Search, GitFork, Globe,
  Filter, UserPlus, UserCheck, Clock, Star, ChevronDown,
} from 'lucide-react';
import { friendService } from '../services/api';

const AVATAR_GRADIENTS = [
  'var(--gradient-primary)',
  'var(--gradient-accent)',
  'linear-gradient(135deg, hsl(172, 70%, 40%), hsl(205, 80%, 45%))',
  'linear-gradient(135deg, hsl(280, 65%, 50%), hsl(320, 75%, 55%))',
];

const TRAVEL_STYLES = [
  'Cultural', 'Adventure', 'Foodie', 'Budget',
  'Luxury', 'Relaxed', 'Solo', 'Couple', 'Mid-range',
];

function getRingColor(pct) {
  if (pct > 80) return 'hsl(152, 70%, 45%)';
  if (pct >= 60) return 'hsl(205, 85%, 50%)';
  return 'hsl(30, 90%, 52%)';
}

function CompatibilityRing({ value, size = 80 }) {
  const r = 35;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (value / 100) * circumference;
  const color = getRingColor(value);

  return (
    <div className="progress-ring">
      <svg viewBox="0 0 80 80" width={size} height={size}>
        <circle className="progress-ring-track" cx="40" cy="40" r={r} strokeWidth="5" />
        <motion.circle
          className="progress-ring-fill"
          cx="40" cy="40" r={r}
          strokeWidth="5"
          stroke={color}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </svg>
      <span className="progress-ring-label" style={{ color }}>{value}%</span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="friend-match-card card-glass skeleton-card">
      <div style={{ display: 'flex', gap: 'var(--space-4)', alignItems: 'center', padding: 'var(--space-5)' }}>
        <div className="skeleton-circle" style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--surface-700)', flexShrink: 0 }} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ width: '60%', height: 14, borderRadius: 6, background: 'var(--surface-700)' }} />
          <div style={{ width: '40%', height: 12, borderRadius: 6, background: 'var(--surface-700)' }} />
          <div style={{ width: '80%', height: 12, borderRadius: 6, background: 'var(--surface-700)' }} />
        </div>
        <div className="skeleton-circle" style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--surface-700)', flexShrink: 0 }} />
      </div>
    </div>
  );
}

function MatchCard({ match, index, onConnect }) {
  const gradient = AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length];

  return (
    <motion.div
      className="friend-match-card card-glass card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
    >
      <div className="match-card-inner">
        {/* Left — avatar & name */}
        <div className="match-card-left">
          <div className="avatar avatar-lg" style={{ background: gradient, fontSize: 'var(--text-base)' }}>
            {match.initials}
          </div>
          <div className="match-card-identity">
            <span className="match-name">{match.name}</span>
            <span className="badge badge-warning" style={{ fontSize: '11px' }}>
              <Star size={10} /> {match.explorerScore}
            </span>
          </div>
        </div>

        {/* Center — details */}
        <div className="match-card-center">
          <div className="match-detail-row">
            <MapPin size={14} />
            <span>{match.destination}</span>
          </div>
          <div className="match-detail-row">
            <Calendar size={14} />
            <span>{match.dates}</span>
          </div>
          <div className="match-detail-row">
            {match.matchReason === 'same_plan' ? (
              <>
                <GitFork size={14} />
                <span>
                  Forked:{' '}
                  <Link to={`/trip/${match.planId}`} className="match-plan-link">
                    {match.planTitle}
                  </Link>
                </span>
              </>
            ) : (
              <>
                <Globe size={14} />
                <span>Same destination</span>
              </>
            )}
          </div>
          <div className="match-tags">
            {match.tags.map(tag => (
              <span key={tag} className="badge badge-teal" style={{ fontSize: '10px', padding: '1px 6px' }}>
                {tag}
              </span>
            ))}
          </div>
          {match.mutualConnections > 0 && (
            <div className="match-detail-row match-mutual">
              <Users size={12} />
              <span>{match.mutualConnections} mutual connection{match.mutualConnections > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Right — compatibility + action */}
        <div className="match-card-right">
          <CompatibilityRing value={match.compatibility} />
          {match.status === 'suggested' && (
            <button className="btn btn-primary btn-sm" onClick={() => onConnect(match.id)}>
              <UserPlus size={14} /> Connect
            </button>
          )}
          {match.status === 'requested' && (
            <button className="btn btn-secondary btn-sm match-btn-disabled" disabled>
              <Clock size={14} /> Request Sent
            </button>
          )}
          {match.status === 'connected' && (
            <span className="badge badge-success match-connected-badge">
              <UserCheck size={12} /> Connected
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function MatchSection({ title, icon, matches, onConnect, startIndex = 0 }) {
  if (!matches.length) return null;

  return (
    <div className="match-section">
      <h2 className="match-section-title">
        {icon}
        {title}
        <span className="match-section-count">{matches.length}</span>
      </h2>
      <div className="match-list">
        {matches.map((m, i) => (
          <MatchCard key={m.id} match={m} index={startIndex + i} onConnect={onConnect} />
        ))}
      </div>
    </div>
  );
}

export default function TripFriends() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchTypeFilter, setMatchTypeFilter] = useState('all');
  const [destinationSearch, setDestinationSearch] = useState('');
  const [styleFilter, setStyleFilter] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLoading(true);
    friendService
      .getMatches({
        matchType: matchTypeFilter,
        destination: destinationSearch,
        travelStyle: styleFilter,
      })
      .then(data => {
        setMatches(data);
        setLoading(false);
      });
  }, [matchTypeFilter, destinationSearch, styleFilter]);

  const handleConnect = async (matchId) => {
    await friendService.sendRequest(matchId);
    setMatches(prev =>
      prev.map(m => (m.id === matchId ? { ...m, status: 'requested' } : m))
    );
  };

  const toggleStyle = (style) => {
    setStyleFilter(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  // Stats
  const totalCount = matches.length;
  const connectedCount = matches.filter(m => m.status === 'connected').length;
  const pendingCount = matches.filter(m => m.status === 'requested').length;

  // Filtered sections
  const samePlanMatches = matches.filter(m => m.matchReason === 'same_plan');
  const sameDestMatches = matches.filter(m => m.matchReason === 'same_destination');

  return (
    <div className="page-content trip-friends-page">
      {/* ── Page Header ── */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1>
          <Users size={28} style={{ marginRight: 'var(--space-3)', verticalAlign: 'middle' }} />
          Find Your <span className="gradient-text">Tribe</span>
        </h1>
        <p>Discover travelers heading to the same destination on the same dates</p>

        <motion.div
          className="stats-grid"
          style={{ marginTop: 'var(--space-6)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {[
            { value: totalCount, label: 'Total Matches', color: 'var(--primary-400)' },
            { value: connectedCount, label: 'Connected', color: 'var(--success)' },
            { value: pendingCount, label: 'Pending Requests', color: 'var(--warning)' },
          ].map((s, i) => (
            <div className="stat-card card-glass" key={i}>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Filter Bar ── */}
      <motion.div
        className="match-filters card-glass"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Match type pills */}
        <div className="match-type-pills">
          {[
            { key: 'all', label: 'All Matches', icon: null },
            { key: 'same_plan', label: 'Same Plan', icon: <GitFork size={14} /> },
            { key: 'same_destination', label: 'Same Destination', icon: <Globe size={14} /> },
          ].map(opt => (
            <button
              key={opt.key}
              className={`filter-chip${matchTypeFilter === opt.key ? ' active' : ''}`}
              onClick={() => setMatchTypeFilter(opt.key)}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>

        {/* Search + toggle */}
        <div className="match-filter-row">
          <div className="search-bar" style={{ flex: 1 }}>
            <Search size={18} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search by destination..."
              value={destinationSearch}
              onChange={e => setDestinationSearch(e.target.value)}
            />
          </div>
          <button
            className={`btn btn-ghost btn-icon${showFilters ? ' active' : ''}`}
            onClick={() => setShowFilters(f => !f)}
            title="Toggle style filters"
          >
            <Filter size={18} />
          </button>
        </div>

        {/* Travel style chips */}
        {showFilters && (
          <motion.div
            className="filter-chips"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.25 }}
          >
            {TRAVEL_STYLES.map(style => (
              <button
                key={style}
                className={`filter-chip${styleFilter.includes(style) ? ' active' : ''}`}
                onClick={() => toggleStyle(style)}
              >
                {style}
              </button>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* ── Loading State ── */}
      {loading && (
        <div className="match-list" style={{ marginTop: 'var(--space-6)' }}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {/* ── Match Sections ── */}
      {!loading && matches.length > 0 && (
        <>
          {matchTypeFilter === 'all' ? (
            <>
              <MatchSection
                title="Same Plan Matches"
                icon={<GitFork size={20} />}
                matches={samePlanMatches}
                onConnect={handleConnect}
                startIndex={0}
              />
              <MatchSection
                title="Same Destination Matches"
                icon={<Globe size={20} />}
                matches={sameDestMatches}
                onConnect={handleConnect}
                startIndex={samePlanMatches.length}
              />
            </>
          ) : (
            <MatchSection
              title={matchTypeFilter === 'same_plan' ? 'Same Plan Matches' : 'Same Destination Matches'}
              icon={matchTypeFilter === 'same_plan' ? <GitFork size={20} /> : <Globe size={20} />}
              matches={matches}
              onConnect={handleConnect}
            />
          )}
        </>
      )}

      {/* ── Empty State ── */}
      {!loading && matches.length === 0 && (
        <motion.div
          className="empty-state card-glass"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          style={{ marginTop: 'var(--space-8)' }}
        >
          <Users size={48} />
          <h3>No matches found</h3>
          <p>Try adjusting your filters or explore new destinations</p>
        </motion.div>
      )}
    </div>
  );
}
