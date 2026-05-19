import { Link } from 'react-router-dom';
import { Calendar, GitFork, Star, MapPin, Users } from 'lucide-react';
import { TripStatusLabels, TripStatusColors } from '../../data/mockData';
import { motion } from 'framer-motion';

export default function TripCard({ trip, index = 0 }) {
  const dayCount = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link to={`/trip/${trip.tripId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card card-hover" id={`trip-card-${trip.tripId}`}>
          {/* Cover gradient */}
          <div style={{
            height: '120px',
            background: trip.coverGradient,
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            padding: 'var(--space-4)',
          }}>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              <span className={`badge badge-${TripStatusColors[trip.status]}`}>
                {TripStatusLabels[trip.status]}
              </span>
              {trip.confidenceScore > 0 && (
                <span className="badge badge-primary">
                  🎯 {trip.confidenceScore}%
                </span>
              )}
            </div>
          </div>

          <div className="card-body">
            <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
              {trip.title}
            </h3>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--text-secondary)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: 'var(--space-4)',
              lineHeight: 'var(--leading-relaxed)',
            }}>
              {trip.description}
            </p>

            {/* Meta row */}
            <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Calendar size={13} /> {dayCount} days
              </span>
              {trip.forkCount > 0 && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <GitFork size={13} /> {trip.forkCount}
                </span>
              )}
              {trip.rating > 0 && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--warning)' }}>
                  <Star size={13} fill="currentColor" /> {trip.rating}
                </span>
              )}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-4)' }}>
              {trip.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 'var(--text-xs)',
                  padding: '2px 8px',
                  background: 'var(--surface-700)',
                  borderRadius: 'var(--border-radius-full)',
                  color: 'var(--text-secondary)',
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div className="avatar avatar-sm" style={{ background: trip.coverGradient, fontSize: '10px' }}>
                  {trip.ownerInitials}
                </div>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  {trip.ownerName}
                </span>
              </div>
              {trip.collaborators.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                  <Users size={12} /> +{trip.collaborators.length}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
