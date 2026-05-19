import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { tripService } from '../services/api';
import { TripVisibility, ActivityTypes } from '../data/mockData';
import { motion } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, MapPin, Calendar, Eye, FileText, Sparkles } from 'lucide-react';

const steps = [
  { label: 'Details', icon: <FileText size={14} /> },
  { label: 'Dates', icon: <Calendar size={14} /> },
  { label: 'Visibility', icon: <Eye size={14} /> },
  { label: 'Review', icon: <Sparkles size={14} /> },
];

export default function CreateTrip() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '', description: '', startDate: '', endDate: '',
    visibility: TripVisibility.VisibleToOnlyMe,
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));
  const canNext = step === 0 ? form.title.length > 0 : step === 1 ? form.startDate && form.endDate : true;

  const handleCreate = async () => {
    const trip = await tripService.createTrip({
      ownerId: user.id,
      ownerName: user.name,
      ownerInitials: user.initials,
      title: form.title,
      description: form.description,
      startDate: form.startDate,
      endDate: form.endDate,
      visibility: form.visibility,
      coverGradient: 'linear-gradient(135deg, hsl(205, 85%, 45%), hsl(172, 70%, 50%))',
      tags: ['Adventure'],
    });
    navigate(`/trip/${trip.tripId}`);
  };

  const visibilityOptions = [
    { value: 1, label: 'Only Me', desc: 'Private draft — only you can see it' },
    { value: 2, label: 'Collaborators', desc: 'Visible to invited collaborators' },
    { value: 3, label: 'Public', desc: 'Anyone can discover and fork' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Create a <span className="gradient-text">New Trip</span></h1>
        <p>Plan your next adventure step by step</p>
      </div>

      {/* Wizard Steps */}
      <div className="wizard-steps">
        {steps.map((s, i) => (
          <div key={i} className={`wizard-step ${i === step ? 'active' : ''} ${i < step ? 'completed' : ''}`}>
            <div className="wizard-step-number">
              {i < step ? <Check size={14} /> : s.icon}
            </div>
            <span className="nav-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="create-trip-layout">
        {/* Form */}
        <motion.div className="wizard-form card-glass" key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          {step === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="trip-title">Trip Title *</label>
                <input className="form-input" id="trip-title" placeholder="e.g., Tokyo & Kyoto Cultural Immersion" value={form.title} onChange={e => update('title', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="trip-desc">Description</label>
                <textarea className="form-input form-textarea" id="trip-desc" placeholder="What's this trip about? Destinations, themes, goals..." value={form.description} onChange={e => update('description', e.target.value)} rows={5} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>When are you traveling?</p>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label" htmlFor="start-date">Start Date *</label>
                  <input type="date" className="form-input" id="start-date" value={form.startDate} onChange={e => update('startDate', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="end-date">End Date *</label>
                  <input type="date" className="form-input" id="end-date" value={form.endDate} onChange={e => update('endDate', e.target.value)} min={form.startDate} />
                </div>
              </div>
              {form.startDate && form.endDate && (
                <div className="badge badge-primary" style={{ alignSelf: 'flex-start', padding: 'var(--space-2) var(--space-4)' }}>
                  <Calendar size={14} />
                  {Math.ceil((new Date(form.endDate) - new Date(form.startDate)) / (1000 * 60 * 60 * 24)) + 1} days
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Who can see this trip?</p>
              {visibilityOptions.map(opt => (
                <button key={opt.value} onClick={() => update('visibility', opt.value)}
                  style={{
                    display: 'flex', flexDirection: 'column', gap: '4px',
                    padding: 'var(--space-4)', borderRadius: 'var(--border-radius-md)',
                    background: form.visibility === opt.value ? 'hsla(205, 85%, 45%, 0.08)' : 'var(--surface-850)',
                    border: form.visibility === opt.value ? '1px solid var(--primary-500)' : 'var(--border-subtle)',
                    textAlign: 'left', transition: 'all var(--transition-fast)',
                  }}>
                  <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: form.visibility === opt.value ? 'var(--primary-300)' : 'var(--text-primary)' }}>{opt.label}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>{opt.desc}</span>
                </button>
              ))}
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <h3 style={{ fontSize: 'var(--text-lg)' }}>Review Your Trip</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3) 0', borderBottom: 'var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Title</span>
                  <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{form.title}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3) 0', borderBottom: 'var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Dates</span>
                  <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{form.startDate} → {form.endDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-3) 0', borderBottom: 'var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>Visibility</span>
                  <span style={{ fontWeight: 600, fontSize: 'var(--text-sm)' }}>{visibilityOptions.find(v => v.value === form.visibility)?.label}</span>
                </div>
              </div>
              {form.description && (
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>{form.description}</p>
              )}
            </div>
          )}

          {/* Nav */}
          <div className="wizard-nav">
            <button className="btn btn-secondary" onClick={() => setStep(s => s - 1)} disabled={step === 0} style={{ opacity: step === 0 ? 0.4 : 1 }}>
              <ChevronLeft size={16} /> Back
            </button>
            {step < 3 ? (
              <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={!canNext} style={{ opacity: canNext ? 1 : 0.5 }}>
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleCreate} id="create-trip-submit">
                <Sparkles size={16} /> Create Trip
              </button>
            )}
          </div>
        </motion.div>

        {/* Preview */}
        <div className="trip-preview-card card-glass">
          <h3>Live Preview</h3>
          <div className="card" style={{ overflow: 'hidden' }}>
            <div style={{ height: '80px', background: 'linear-gradient(135deg, hsl(205, 85%, 45%), hsl(172, 70%, 50%))' }} />
            <div style={{ padding: 'var(--space-4)' }}>
              <h4 style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: '4px' }}>
                {form.title || 'Your Trip Title'}
              </h4>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-2)' }}>
                {form.description ? form.description.substring(0, 80) + '...' : 'Add a description to tell others about your trip'}
              </p>
              {form.startDate && form.endDate && (
                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={11} /> {form.startDate} → {form.endDate}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
