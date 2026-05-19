import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, demoLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) navigate('/dashboard');
  };

  const handleDemo = () => {
    if (demoLogin()) navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <motion.div
        className="login-card card-glass"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
          <div className="landing-logo" style={{ justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
            <div className="landing-logo-icon"><Sparkles size={20} /></div>
            TripTribe
          </div>
        </div>

        <h1>Welcome Back</h1>
        <p className="login-subtitle">Sign in to continue your adventures</p>

        <form className="login-form" onSubmit={handleSubmit} id="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input
                type="email" id="email" className="form-input"
                style={{ paddingLeft: '36px' }}
                placeholder="your@email.com"
                value={email} onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
              <input
                type="password" id="password" className="form-input"
                style={{ paddingLeft: '36px' }}
                placeholder="••••••••"
                value={password} onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" id="login-btn" style={{ width: '100%' }}>
            Sign In <ArrowRight size={16} />
          </button>
        </form>

        <div className="login-divider" style={{ margin: 'var(--space-6) 0' }}>or</div>

        <button className="btn btn-secondary demo-login-btn" onClick={handleDemo} id="demo-login-btn">
          <Sparkles size={16} /> Try Demo Account
        </button>

        <p style={{ textAlign: 'center', marginTop: 'var(--space-6)', fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
          Don't have an account? <a href="#" style={{ color: 'var(--primary-300)' }}>Sign up free</a>
        </p>
      </motion.div>
    </div>
  );
}
