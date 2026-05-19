import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tripService, socialService } from '../services/api';
import TripCard from '../components/trip/TripCard';
import { motion } from 'framer-motion';
import { Plus, TrendingUp, Globe, MapPin, GitFork, MessageCircle, Star, Award, Users, Percent } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const [myTrips, setMyTrips] = useState([]);
  const [feed, setFeed] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    tripService.getUserTrips(user?.id).then(setMyTrips);
    socialService.getFeed().then(setFeed);
    socialService.getFriendMatches().then(setMatches);
  }, [user]);

  const feedIcons = { fork: <GitFork size={14} />, rating: <Star size={14} />, comment: <MessageCircle size={14} />, milestone: <Award size={14} /> };
  const feedColors = { fork: 'var(--primary-400)', rating: 'var(--warning)', comment: 'var(--teal-400)', milestone: 'var(--accent-400)' };

  return (
    <div className="page-content">
      <div className="page-header">
        <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
        </motion.h1>
        <p>Here's what's happening with your adventures</p>
      </div>

      {/* Quick Stats */}
      <motion.div className="stats-grid" style={{ marginBottom: 'var(--space-8)' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        {[
          { icon: <MapPin size={20} />, value: user?.tripsCreated || 0, label: 'Trips Created', color: 'var(--primary-400)' },
          { icon: <Globe size={20} />, value: user?.countriesVisited || 0, label: 'Countries', color: 'var(--teal-400)' },
          { icon: <GitFork size={20} />, value: user?.tripsForked || 0, label: 'Forks', color: 'var(--accent-400)' },
          { icon: <TrendingUp size={20} />, value: user?.explorerScore || 0, label: 'Explorer Score', color: 'var(--warning)' },
        ].map((s, i) => (
          <div className="stat-card card-glass" key={i}>
            <div style={{ color: s.color, marginBottom: 'var(--space-2)' }}>{s.icon}</div>
            <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </motion.div>

      <div className="dashboard-grid">
        {/* Main: My Trips */}
        <div className="trips-section">
          <h2>
            My Trips
            <Link to="/create-trip" className="btn btn-primary btn-sm" id="create-trip-btn">
              <Plus size={14} /> New Trip
            </Link>
          </h2>
          {myTrips.length > 0 ? (
            <div className="trips-grid">
              {myTrips.map((trip, i) => <TripCard key={trip.tripId} trip={trip} index={i} />)}
            </div>
          ) : (
            <div className="empty-state card-glass">
              <MapPin size={48} />
              <h3>No trips yet</h3>
              <p>Start planning your first adventure!</p>
              <Link to="/create-trip" className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }}>Create Trip</Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="dashboard-sidebar">
          {/* Activity Feed */}
          <div className="card-glass" style={{ padding: 'var(--space-5)' }}>
            <h3><MessageCircle size={16} /> Activity</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {feed.slice(0, 4).map(item => (
                <motion.div key={item.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                  style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start', padding: 'var(--space-2) 0', borderBottom: 'var(--border-subtle)' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${feedColors[item.type]}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: feedColors[item.type], flexShrink: 0 }}>
                    {feedIcons[item.type]}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-snug)' }}>
                      <strong>{item.user}</strong> {item.action} <strong style={{ color: 'var(--primary-300)' }}>{item.target}</strong>
                    </p>
                    <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{item.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trip Friend Matches */}
          <div className="card-glass" style={{ padding: 'var(--space-5)' }}>
            <h3><Users size={16} /> Trip Matches</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {matches.map(m => (
                <div key={m.id} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center', padding: 'var(--space-2) 0', borderBottom: 'var(--border-subtle)' }}>
                  <div className="avatar avatar-sm" style={{ background: 'var(--gradient-accent)', fontSize: '10px' }}>
                    {m.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{m.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{m.destination} · {m.dates}</div>
                  </div>
                  <span className="badge badge-success" style={{ fontSize: '11px' }}>
                    <Percent size={10} />{m.compatibility}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
