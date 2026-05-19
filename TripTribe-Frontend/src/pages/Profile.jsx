import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Globe, MapPin, GitFork, Award, Star, TrendingUp, Map } from 'lucide-react';

const rankColors = {
  poster: 'var(--primary-400)',
  reactor: 'var(--accent-400)',
  contributor: 'var(--teal-400)',
};

export default function Profile() {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="page-content">
      {/* Profile Header */}
      <motion.div className="profile-header card-glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="profile-avatar">{user.initials}</div>
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
          <div className="profile-badges">
            {user.badges.map(b => (
              <span key={b} className="badge badge-primary">
                <Award size={11} /> {b}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div className="stats-grid" style={{ marginBottom: 'var(--space-8)' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        {[
          { icon: <Globe size={20} />, value: user.countriesVisited, label: 'Countries', color: 'var(--primary-400)' },
          { icon: <MapPin size={20} />, value: user.citiesVisited, label: 'Cities', color: 'var(--teal-400)' },
          { icon: <Map size={20} />, value: user.tripsCreated, label: 'Trips', color: 'var(--accent-400)' },
          { icon: <GitFork size={20} />, value: user.tripsForked, label: 'Forks', color: 'var(--warning)' },
          { icon: <TrendingUp size={20} />, value: user.explorerScore, label: 'Explorer Score', color: 'hsl(280, 65%, 55%)' },
        ].map((s, i) => (
          <div className="stat-card card-glass" key={i}>
            <div style={{ color: s.color, marginBottom: 'var(--space-2)' }}>{s.icon}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="profile-grid">
        {/* Rank Tracks */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Award size={20} style={{ color: 'var(--warning)' }} /> Rank Progression
          </h2>

          {Object.entries(user.ranks).map(([track, data]) => (
            <div className="rank-track card-glass" key={track}>
              <div className="rank-track-header">
                <h4 style={{ color: rankColors[track], textTransform: 'capitalize' }}>
                  {track} Track
                </h4>
                <span>{data.points} pts</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                <span className="badge" style={{
                  background: `${rankColors[track]}15`,
                  color: rankColors[track],
                  border: `1px solid ${rankColors[track]}30`,
                }}>
                  <Star size={11} /> Stage {data.stage} · {data.title}
                </span>
              </div>
              <div className="rank-bar">
                <motion.div
                  className="rank-bar-fill"
                  style={{ background: rankColors[track] }}
                  initial={{ width: 0 }}
                  animate={{ width: `${data.progress}%` }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
              </div>
              <div className="rank-label">
                <span>Stage {data.stage}</span>
                <span>{data.progress}%</span>
                <span>Stage {data.stage + 1}</span>
              </div>
            </div>
          ))}

          {/* Explorer Score Ring */}
          <div className="card-glass" style={{ padding: 'var(--space-5)', textAlign: 'center' }}>
            <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)' }}>
              Composite Explorer Score
            </h3>
            <div className="progress-ring" style={{ width: 120, height: 120, margin: '0 auto' }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle className="progress-ring-track" cx="60" cy="60" r="50" strokeWidth="8" />
                <motion.circle
                  className="progress-ring-fill"
                  cx="60" cy="60" r="50" strokeWidth="8"
                  stroke="url(#scoreGradient)"
                  strokeDasharray={314}
                  initial={{ strokeDashoffset: 314 }}
                  animate={{ strokeDashoffset: 314 - (314 * user.explorerScore / 100) }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(205, 85%, 45%)" />
                    <stop offset="100%" stopColor="hsl(172, 70%, 50%)" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="progress-ring-label gradient-text">{user.explorerScore}</span>
            </div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-3)' }}>
              Composite of all rank tracks
            </p>
          </div>
        </motion.div>

        {/* World Map & Expertise */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <Globe size={20} style={{ color: 'var(--teal-400)' }} /> World Progress
          </h2>

          <div className="world-map-container card-glass">
            <h3>Countries Visited</h3>
            <div className="world-map-placeholder">
              <div style={{ textAlign: 'center' }}>
                <Globe size={48} style={{ marginBottom: 'var(--space-3)', opacity: 0.5 }} />
                <p>{user.countriesVisited} countries explored</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>
                  Interactive world map coming soon
                </p>
              </div>
            </div>
          </div>

          {/* Country expertise */}
          <div className="card-glass" style={{ padding: 'var(--space-5)', marginTop: 'var(--space-4)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)' }}>Expertise Badges</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--surface-850)', borderRadius: 'var(--border-radius-md)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>🇯🇵 Japan</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>5 visits · Country Expert</div>
                </div>
                <span className="badge badge-success">1.5× weight</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--surface-850)', borderRadius: 'var(--border-radius-md)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>🗼 Tokyo</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>7 visits · City Expert</div>
                </div>
                <span className="badge badge-teal">Local Insight</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 'var(--space-3)', background: 'var(--surface-850)', borderRadius: 'var(--border-radius-md)' }}>
                <div>
                  <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>🇹🇭 Thailand</div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>3 visits · Country Expert</div>
                </div>
                <span className="badge badge-success">1.5× weight</span>
              </div>
            </div>
          </div>

          {/* Milestones */}
          <div className="card-glass" style={{ padding: 'var(--space-5)', marginTop: 'var(--space-4)' }}>
            <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)' }}>Traveler Milestones</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {[
                { name: 'Country Curious', target: 5, achieved: true },
                { name: 'Wanderer', target: 15, achieved: true },
                { name: 'World Explorer', target: 25, achieved: false, progress: user.countriesVisited },
                { name: 'Global Citizen', target: 50, achieved: false, progress: user.countriesVisited },
              ].map(m => (
                <div key={m.name} style={{
                  display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                  padding: 'var(--space-2)', opacity: m.achieved ? 1 : 0.6,
                }}>
                  <span style={{ fontSize: 'var(--text-lg)' }}>{m.achieved ? '✅' : '🔒'}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: m.achieved ? 600 : 400 }}>{m.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      {m.achieved ? 'Achieved!' : `${m.progress}/${m.target} countries`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
