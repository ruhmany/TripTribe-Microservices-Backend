import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TripVisibility } from '../../data/mockData';
import { X, Pencil, Calendar, Eye, FileText } from 'lucide-react';

const visibilityOptions = [
  { value: 1, label: 'Only Me', desc: 'Private draft — only you can see it' },
  { value: 2, label: 'Collaborators', desc: 'Visible to invited collaborators' },
  { value: 3, label: 'Public', desc: 'Anyone can discover and fork' },
];

/**
 * Edit Trip Modal
 * @param {boolean}  isOpen   - controls visibility
 * @param {Function} onClose  - close handler
 * @param {Function} onSubmit - called with updated trip data
 * @param {object}   trip     - current trip object
 */
export default function EditTripModal({ isOpen, onClose, onSubmit, trip }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    visibility: 1,
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && trip) {
      setForm({
        title: trip.title || '',
        description: trip.description || '',
        startDate: trip.startDate || '',
        endDate: trip.endDate || '',
        visibility: trip.visibility || 1,
      });
      setSubmitting(false);
    }
  }, [isOpen, trip]);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        description: form.description.trim(),
        startDate: form.startDate,
        endDate: form.endDate,
        visibility: form.visibility,
      });
      onClose();
    } catch {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="modal"
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={{ maxWidth: '520px' }}
          >
            {/* Header */}
            <div className="modal-header">
              <h2 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <Pencil size={20} /> Edit Trip
              </h2>
              <button onClick={onClose} className="icon-btn" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                {/* Title */}
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-trip-title">
                    <FileText size={13} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
                    Trip Title *
                  </label>
                  <input
                    className="form-input"
                    id="edit-trip-title"
                    value={form.title}
                    onChange={e => update('title', e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                {/* Description */}
                <div className="form-group">
                  <label className="form-label" htmlFor="edit-trip-desc">Description</label>
                  <textarea
                    className="form-input form-textarea"
                    id="edit-trip-desc"
                    value={form.description}
                    onChange={e => update('description', e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Dates Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="edit-trip-start">
                      <Calendar size={13} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="form-input"
                      id="edit-trip-start"
                      value={form.startDate}
                      onChange={e => update('startDate', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="edit-trip-end">
                      <Calendar size={13} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
                      End Date
                    </label>
                    <input
                      type="date"
                      className="form-input"
                      id="edit-trip-end"
                      value={form.endDate}
                      onChange={e => update('endDate', e.target.value)}
                      min={form.startDate}
                    />
                  </div>
                </div>

                {/* Visibility */}
                <div className="form-group">
                  <label className="form-label">
                    <Eye size={13} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
                    Visibility
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                    {visibilityOptions.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => update('visibility', opt.value)}
                        style={{
                          display: 'flex', flexDirection: 'column', gap: '2px',
                          padding: 'var(--space-3) var(--space-4)',
                          borderRadius: 'var(--border-radius-md)',
                          background: form.visibility === opt.value ? 'hsla(205, 85%, 45%, 0.08)' : 'var(--surface-850)',
                          border: form.visibility === opt.value ? '1px solid var(--primary-500)' : 'var(--border-subtle)',
                          textAlign: 'left', transition: 'all var(--transition-fast)', cursor: 'pointer',
                        }}
                      >
                        <span style={{
                          fontWeight: 600, fontSize: 'var(--text-sm)',
                          color: form.visibility === opt.value ? 'var(--primary-300)' : 'var(--text-primary)',
                        }}>
                          {opt.label}
                        </span>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting || !form.title.trim()}>
                  {submitting ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span className="spinner" style={{ width: 14, height: 14 }} /> Saving...
                    </span>
                  ) : (
                    <><Pencil size={16} /> Save Changes</>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
