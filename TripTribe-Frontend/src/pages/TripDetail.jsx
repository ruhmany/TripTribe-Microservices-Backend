import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tripService, checkpointService, postService } from '../services/api';
import { TripStatusLabels, TripStatusColors, ActivityTypeLabels, ActivityTypeColors } from '../data/mockData';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, DollarSign, GitFork, Star, Heart, MessageCircle, Share2, Users, ArrowLeft, Award } from 'lucide-react';
import ActivityCheckpoint from '../components/trip/ActivityCheckpoint';
import CreatePostModal from '../components/trip/CreatePostModal';

export default function TripDetail() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [checkpoints, setCheckpoints] = useState({});
  const [postCreationActivity, setPostCreationActivity] = useState(null);

  useEffect(() => {
    tripService.getTripDetails(tripId).then(setTrip);
    checkpointService.getCheckpoints(tripId).then(setCheckpoints);
  }, [tripId]);

  if (!trip) return (
    <div className="page-content">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div className="skeleton" style={{ height: 200, borderRadius: 'var(--border-radius-xl)' }} />
        <div className="skeleton" style={{ height: 40, width: '60%' }} />
        <div className="skeleton" style={{ height: 20, width: '80%' }} />
      </div>
    </div>
  );

  const dayCount = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) + 1;
  const totalBudget = trip.dayDetails.reduce((sum, day) => sum + day.activities.reduce((s, a) => s + a.money, 0), 0);

  // Budget by category
  const budgetByType = {};
  trip.dayDetails.forEach(day => day.activities.forEach(a => {
    const label = ActivityTypeLabels[a.type] || 'Other';
    budgetByType[label] = (budgetByType[label] || 0) + a.money;
  }));

  // Toggle Checkpoint handler
  const handleToggleCheckpoint = async (activityId) => {
    const updatedState = await checkpointService.toggleCheckpoint(tripId, activityId);
    setCheckpoints(prev => ({
      ...prev,
      [activityId]: updatedState,
    }));
  };

  const handlePostCreated = async (postData) => {
    await postService.createPost(postData);
  };

  // Completion calculation
  const totalActivities = trip.dayDetails.reduce((sum, day) => sum + day.activities.length, 0);
  const tripIdNum = trip.tripId.replace('t-', '');
  const completedCount = Object.keys(checkpoints).filter(key => 
    key.startsWith(`a-${tripIdNum}-`) && checkpoints[key]?.completed
  ).length;
  const completionPercentage = totalActivities > 0 ? Math.round((completedCount / totalActivities) * 100) : 0;

  return (
    <div className="page-content">
      <Link to="/explore" style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
        <ArrowLeft size={16} /> Back to Explore
      </Link>

      {/* Header */}
      <motion.div className="trip-detail-header" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
          <span className={`badge badge-${TripStatusColors[trip.status]}`}>{TripStatusLabels[trip.status]}</span>
          {trip.confidenceScore > 0 && <span className="badge badge-primary">🎯 {trip.confidenceScore}% confidence</span>}
        </div>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 800, marginBottom: 'var(--space-2)' }}>{trip.title}</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '700px', lineHeight: 'var(--leading-relaxed)' }}>{trip.description}</p>

        <div className="trip-detail-meta">
          <span className="trip-detail-meta-item"><Calendar size={14} /> {new Date(trip.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} — {new Date(trip.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          <span className="trip-detail-meta-item"><Clock size={14} /> {dayCount} days</span>
          {trip.forkCount > 0 && <span className="trip-detail-meta-item"><GitFork size={14} /> {trip.forkCount} forks</span>}
          {trip.rating > 0 && <span className="trip-detail-meta-item" style={{ color: 'var(--warning)' }}><Star size={14} fill="currentColor" /> {trip.rating} ({trip.ratingCount})</span>}
        </div>

        <div className="trip-detail-actions">
          <button className="btn btn-primary" id="fork-trip-btn"><GitFork size={16} /> Fork This Plan</button>
          <button className="btn btn-secondary"><Heart size={16} /> Save</button>
          <button className="btn btn-secondary"><Share2 size={16} /> Share</button>
        </div>

        {/* Collaborators */}
        {trip.collaborators.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
            <Users size={14} style={{ color: 'var(--text-tertiary)' }} />
            <div className="avatar-group">
              <div className="avatar avatar-sm" style={{ background: trip.coverGradient, fontSize: '10px' }}>{trip.ownerInitials}</div>
              {trip.collaborators.map(c => (
                <div key={c.id} className="avatar avatar-sm" style={{ background: 'var(--gradient-accent)', fontSize: '10px' }}>{c.initials}</div>
              ))}
            </div>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
              {trip.ownerName} + {trip.collaborators.length} collaborator{trip.collaborators.length > 1 ? 's' : ''}
            </span>
          </div>
        )}
      </motion.div>

      {/* Body */}
      <div className="trip-detail-body">
        {/* Timeline */}
        <div>
          <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-6)' }}>Itinerary</h2>

          {/* Checkpoint Progress Card */}
          {totalActivities > 0 && (
            <div className="checkpoint-progress card-glass" style={{ marginBottom: 'var(--space-6)' }}>
              <div className="checkpoint-progress-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  <Award size={16} /> Activity Checkpoints
                </h3>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                  {completedCount} of {totalActivities} completed ({completionPercentage}%)
                </span>
              </div>
              <div className="checkpoint-progress-bar" style={{ height: '8px', background: 'var(--surface-700)', borderRadius: 'var(--border-radius-full)', overflow: 'hidden' }}>
                <div 
                  className={`checkpoint-progress-fill ${completionPercentage === 100 ? 'complete' : ''}`}
                  style={{ 
                    width: `${completionPercentage}%`,
                    height: '100%',
                    borderRadius: 'var(--border-radius-full)',
                    background: completionPercentage === 100 
                      ? 'linear-gradient(90deg, var(--success), hsl(172, 70%, 45%))' 
                      : 'var(--gradient-primary)',
                    transition: 'width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
                  }}
                />
              </div>
            </div>
          )}

          {trip.dayDetails.length > 0 ? (
            <div className="timeline">
              {trip.dayDetails.map((day, dayIndex) => (
                <motion.div
                  key={day.date}
                  className="timeline-day"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: dayIndex * 0.15 }}
                >
                  <div className="timeline-dot" />
                  <div className="timeline-date">
                    Day {dayIndex + 1} — {new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="timeline-activities">
                    {day.activities.map((activity, ai) => {
                      const activityId = `a-${tripIdNum}-${dayIndex}-${ai}`;
                      const isCompleted = !!checkpoints[activityId]?.completed;
                      return (
                        <ActivityCheckpoint
                          key={activityId}
                          activity={activity}
                          activityId={activityId}
                          isCompleted={isCompleted}
                          onToggle={handleToggleCheckpoint}
                          onCreatePost={setPostCreationActivity}
                          index={ai}
                        />
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="empty-state card-glass">
              <Calendar size={48} />
              <h3>No itinerary yet</h3>
              <p>Days and activities haven't been added to this trip</p>
            </div>
          )}
        </div>

        {/* Budget Sidebar */}
        <div>
          <div className="trip-budget-card card-glass">
            <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <DollarSign size={16} /> Budget Breakdown
            </h3>
            {Object.entries(budgetByType).map(([type, amount]) => (
              <div className="budget-item" key={type}>
                <span>{type}</span>
                <span style={{ fontWeight: 600 }}>${amount}</span>
              </div>
            ))}
            <div className="budget-item" style={{ borderTop: '1px solid var(--surface-600)', marginTop: 'var(--space-2)', paddingTop: 'var(--space-3)' }}>
              <span>Total Estimated</span>
              <span className="gradient-text" style={{ fontSize: 'var(--text-lg)' }}>${totalBudget}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="card-glass" style={{ padding: 'var(--space-5)', marginTop: 'var(--space-4)' }}>
            <h3 style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-3)', color: 'var(--text-secondary)' }}>Travel Style</h3>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {trip.tags.map(tag => (
                <span key={tag} className="badge badge-primary">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <CreatePostModal
        isOpen={!!postCreationActivity}
        onClose={() => setPostCreationActivity(null)}
        activity={postCreationActivity}
        trip={trip}
        onPost={handlePostCreated}
      />
    </div>
  );
}
