import { useState, useEffect } from 'react';
import { tripService, exploreService } from '../services/api';
import TripCard from '../components/trip/TripCard';
import { motion } from 'framer-motion';
import { Search, TrendingUp, Flame } from 'lucide-react';

const filterOptions = ['All', 'Cultural', 'Adventure', 'Foodie', 'Budget', 'Luxury', 'Relaxed', 'Solo', 'Couple'];

export default function Explore() {
  const [publicTrips, setPublicTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    tripService.getPublicTrips().then(setPublicTrips);
    exploreService.getTrendingDestinations().then(setDestinations);
  }, []);

  const filtered = publicTrips.filter(t => {
    const matchesSearch = !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || t.tags.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Explore <span className="gradient-text">Adventures</span></h1>
        <p>Discover trip plans from travelers around the world</p>
      </div>

      {/* Trending Destinations */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 'var(--space-8)' }}>
        <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Flame size={18} style={{ color: 'var(--accent-400)' }} /> Trending Destinations
        </h2>
        <div style={{ display: 'flex', gap: 'var(--space-4)', overflowX: 'auto', paddingBottom: 'var(--space-2)' }}>
          {destinations.map((d, i) => (
            <motion.div key={d.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              style={{
                minWidth: '180px', padding: 'var(--space-5)', borderRadius: 'var(--border-radius-lg)',
                background: d.gradient, position: 'relative', overflow: 'hidden', cursor: 'pointer',
                transition: 'transform var(--transition-base)',
              }}
              whileHover={{ scale: 1.04 }}
            >
              <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'white', marginBottom: '2px' }}>{d.name}</h3>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.8)' }}>{d.country}</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.7)', marginTop: 'var(--space-2)' }}>
                {d.planCount} plans
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Search & Filters */}
      <div className="explore-search">
        <div className="search-bar" id="explore-search">
          <Search size={18} style={{ color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Search trips by destination, activity, or keyword..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            id="explore-search-input"
          />
        </div>
        <div className="filter-chips">
          {filterOptions.map(f => (
            <button
              key={f}
              className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <h2 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-5)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        <TrendingUp size={18} style={{ color: 'var(--primary-400)' }} />
        {activeFilter === 'All' ? 'All Published Plans' : `${activeFilter} Plans`}
        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', fontWeight: 400 }}>
          ({filtered.length})
        </span>
      </h2>

      {filtered.length > 0 ? (
        <div className="explore-grid">
          {filtered.map((trip, i) => <TripCard key={trip.tripId} trip={trip} index={i} />)}
        </div>
      ) : (
        <div className="empty-state card-glass">
          <Search size={48} />
          <h3>No trips found</h3>
          <p>Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
