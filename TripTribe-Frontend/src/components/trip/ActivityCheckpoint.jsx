import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, DollarSign, Check, Circle, Trash2 } from 'lucide-react';
import { ActivityTypeLabels, ActivityTypeColors } from '../../data/mockData';

export default function ActivityCheckpoint({ activity, activityId, isCompleted, onToggle, onCreatePost, index = 0, showDelete, onDelete }) {
  const typeLabel = ActivityTypeLabels[activity.type] || 'Other';
  const typeColor = ActivityTypeColors[activity.type] || 'hsl(0, 0%, 55%)';

  return (
    <motion.div
      className="checkpoint-item"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div
        className={`activity-card card-glass${isCompleted ? ' checkpoint-completed' : ''}`}
        data-completed={isCompleted}
        style={isCompleted ? {
          borderLeft: '3px solid var(--success)',
          background: 'hsla(152, 70%, 45%, 0.05)',
        } : undefined}
      >
        <div className="checkpoint-content">
          {/* Checkbox */}
          <button
            className="checkpoint-toggle"
            onClick={() => onToggle(activityId)}
            aria-label={isCompleted ? 'Mark as not done' : 'Mark as done'}
            type="button"
          >
            <AnimatePresence mode="wait">
              {isCompleted ? (
                <motion.div
                  key="checked"
                  className="checkpoint-checked"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 'var(--border-radius-full)',
                    background: 'var(--success)',
                    border: '2px solid var(--success)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Check size={16} color="#fff" strokeWidth={3} />
                </motion.div>
              ) : (
                <motion.div
                  key="unchecked"
                  className="checkpoint-unchecked"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 'var(--border-radius-full)',
                    background: 'transparent',
                    border: '2px solid var(--surface-500)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Circle size={14} style={{ opacity: 0.3, color: 'var(--text-tertiary)' }} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Activity details */}
          <div className="checkpoint-details" style={{ flex: 1, minWidth: 0 }}>
            {/* Header row: title, cost, type badge */}
            <div className="checkpoint-header" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              flexWrap: 'wrap',
              marginBottom: 'var(--space-2)',
            }}>
              {/* Type icon */}
              <div style={{
                width: 28,
                height: 28,
                borderRadius: 'var(--border-radius-full)',
                background: `${typeColor}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <MapPin size={14} style={{ color: typeColor }} />
              </div>

              <h4 style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                flex: 1,
                minWidth: 0,
                margin: 0,
              }}>
                {activity.title}
              </h4>

              {activity.money > 0 && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--teal-400)',
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                  <DollarSign size={12} />
                  {activity.money}
                </span>
              )}

              <span className="badge" style={{
                fontSize: '10px',
                padding: '2px 8px',
                background: `${typeColor}22`,
                color: typeColor,
                flexShrink: 0,
              }}>
                {typeLabel}
              </span>

              {showDelete && onDelete && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                  className="btn-ghost"
                  style={{
                    padding: '2px',
                    marginLeft: 'auto',
                    color: 'var(--text-tertiary)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    border: 'none',
                    background: 'none',
                  }}
                  title="Delete activity"
                >
                  <Trash2 size={13} style={{ color: 'var(--text-secondary)' }} />
                </button>
              )}
            </div>

            {/* Time row */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              marginBottom: 'var(--space-1)',
            }}>
              <Clock size={12} />
              {activity.startTime} — {activity.endTime}
            </div>

            {/* Description */}
            {activity.description && (
              <p style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                lineHeight: 'var(--leading-relaxed)',
                margin: 0,
                marginBottom: 'var(--space-1)',
                opacity: isCompleted ? 0.75 : 1,
              }}>
                {activity.description}
              </p>
            )}

            {/* Location */}
            {activity.location && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
              }}>
                <MapPin size={11} />
                {activity.location}
              </div>
            )}

            {/* Create Post Button when checked */}
            {isCompleted && onCreatePost && (
              <motion.div 
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{ marginTop: 'var(--space-3)' }}
              >
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => onCreatePost(activity)}
                  style={{
                    fontSize: '11px',
                    padding: '4px var(--space-3)',
                    background: 'hsla(205, 85%, 45%, 0.1)',
                    border: '1px solid hsla(205, 85%, 45%, 0.2)',
                    color: 'var(--primary-300)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    borderRadius: 'var(--border-radius-full)',
                    cursor: 'pointer'
                  }}
                  type="button"
                >
                  Create Post
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
