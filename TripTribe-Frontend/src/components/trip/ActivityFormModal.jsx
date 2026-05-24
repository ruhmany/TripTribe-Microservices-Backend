import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ActivityTypeLabels } from '../../data/mockData';
import { X, MapPin, Clock, DollarSign, FileText, Tag, Sparkles, Save } from 'lucide-react';

/**
 * Premium Add/Edit Activity Modal
 * @param {boolean}  isOpen    - controls visibility
 * @param {Function} onClose   - close handler
 * @param {Function} onSubmit  - called with form data object
 * @param {string}   dayDate   - the day this activity belongs to (for display)
 * @param {object}   editData  - null = create mode, object = edit mode (pre-fills form)
 */
export default function ActivityFormModal({ isOpen, onClose, onSubmit, dayDate, editData }) {
  const isEdit = !!editData;

  const [form, setForm] = useState({
    title: '',
    notes: '',
    startTime: '09:00',
    endTime: '10:00',
    location: '',
    type: 10,
    amount: 0,
  });
  const [submitting, setSubmitting] = useState(false);

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      if (editData) {
        setForm({
          title: editData.title || '',
          notes: editData.description || editData.notes || '',
          startTime: editData.startTime || '09:00',
          endTime: editData.endTime || '10:00',
          location: editData.location || editData.locationName || '',
          type: editData.type || editData.activityType || 10,
          amount: editData.money || editData.amount || 0,
        });
      } else {
        setForm({ title: '', notes: '', startTime: '09:00', endTime: '10:00', location: '', type: 10, amount: 0 });
      }
      setSubmitting(false);
    }
  }, [isOpen, editData]);

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({
        title: form.title.trim(),
        notes: form.notes.trim(),
        description: form.notes.trim(),
        startTime: form.startTime,
        endTime: form.endTime,
        location: form.location.trim(),
        locationName: form.location.trim(),
        activityType: Number(form.type),
        type: Number(form.type),
        amount: Number(form.amount) || 0,
        money: Number(form.amount) || 0,
      });
      onClose();
    } catch {
      setSubmitting(false);
    }
  };

  const formattedDate = dayDate
    ? new Date(dayDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    : '';

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
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {isEdit ? <Save size={20} /> : <Sparkles size={20} />}
                  {isEdit ? 'Edit Activity' : 'Add Activity'}
                </h2>
                {formattedDate && (
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '2px', display: 'block' }}>
                    {formattedDate}
                  </span>
                )}
              </div>
              <button onClick={onClose} className="icon-btn" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
                {/* Title */}
                <div className="form-group">
                  <label className="form-label" htmlFor="act-title">
                    <FileText size={13} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
                    Activity Title *
                  </label>
                  <input
                    className="form-input"
                    id="act-title"
                    placeholder="e.g., Visit Senso-ji Temple"
                    value={form.title}
                    onChange={e => update('title', e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                {/* Notes */}
                <div className="form-group">
                  <label className="form-label" htmlFor="act-notes">Description / Notes</label>
                  <textarea
                    className="form-input form-textarea"
                    id="act-notes"
                    placeholder="What's the plan? Tips, reservations..."
                    value={form.notes}
                    onChange={e => update('notes', e.target.value)}
                    rows={3}
                  />
                </div>

                {/* Time Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="act-start">
                      <Clock size={13} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
                      Start Time
                    </label>
                    <input
                      type="time"
                      className="form-input"
                      id="act-start"
                      value={form.startTime}
                      onChange={e => update('startTime', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="act-end">
                      <Clock size={13} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
                      End Time
                    </label>
                    <input
                      type="time"
                      className="form-input"
                      id="act-end"
                      value={form.endTime}
                      onChange={e => update('endTime', e.target.value)}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="form-group">
                  <label className="form-label" htmlFor="act-location">
                    <MapPin size={13} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
                    Location
                  </label>
                  <input
                    className="form-input"
                    id="act-location"
                    placeholder="e.g., Asakusa, Tokyo"
                    value={form.location}
                    onChange={e => update('location', e.target.value)}
                  />
                </div>

                {/* Type + Amount Row */}
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="act-type">
                      <Tag size={13} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
                      Category
                    </label>
                    <select
                      className="form-input form-select"
                      id="act-type"
                      value={form.type}
                      onChange={e => update('type', e.target.value)}
                    >
                      {Object.entries(ActivityTypeLabels).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="act-amount">
                      <DollarSign size={13} style={{ marginRight: '4px', verticalAlign: '-2px' }} />
                      Budget
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      id="act-amount"
                      placeholder="0"
                      min="0"
                      step="0.01"
                      value={form.amount}
                      onChange={e => update('amount', e.target.value)}
                    />
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
                  ) : isEdit ? (
                    <><Save size={16} /> Save Changes</>
                  ) : (
                    <><Sparkles size={16} /> Add Activity</>
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
