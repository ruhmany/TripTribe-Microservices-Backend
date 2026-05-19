import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, GitFork, Users, Map, Award, Compass, Star, Globe } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.6 } }) };

const features = [
  { icon: <GitFork size={24} />, color: 'var(--primary-500)', title: 'Fork & Remix', desc: 'Clone any trip plan and adapt it to your own pace, budget, and travel style. Full version tracking maintained.' },
  { icon: <Users size={24} />, color: 'var(--teal-400)', title: 'Find Your Tribe', desc: 'Smart-matched travelers heading to the same destination on the same dates. Aligned travel styles guaranteed.' },
  { icon: <Map size={24} />, color: 'var(--accent-400)', title: 'Local Guides', desc: 'Vetted, community-rated insiders who publish their own trip plans and offer on-the-ground expertise.' },
  { icon: <Award size={24} />, color: 'var(--warning)', title: 'Earn Your Rank', desc: 'Three progression tracks with real-world travel perks — hotel discounts, priority placement, and prestige badges.' },
  { icon: <Compass size={24} />, color: 'hsl(280, 65%, 55%)', title: 'Collaborative Rooms', desc: 'Real-time shared editing where friend groups build itineraries together with live conflict-free updates.' },
  { icon: <Globe size={24} />, color: 'hsl(152, 70%, 45%)', title: 'World Tracker', desc: 'A living map of everywhere you\'ve been. Build country expertise and city mastery as you explore.' },
];

export default function Landing() {
  return (
    <div className="landing-page">
      {/* Glows */}
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />
      <div className="hero-glow hero-glow-3" />

      {/* Nav */}
      <nav className="landing-nav" id="landing-nav">
        <div className="landing-logo">
          <div className="landing-logo-icon"><Sparkles size={20} /></div>
          TripTribe
        </div>
        <div className="landing-nav-links">
          <a href="#features" className="landing-nav-link">Features</a>
          <a href="#guides" className="landing-nav-link">Guides</a>
          <Link to="/login" className="btn btn-primary btn-sm">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-section" id="hero">
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="hero-badge">
              <Sparkles size={14} /> The Social Platform for Explorers
            </div>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Plan Together,{' '}
            <span className="gradient-text">Travel Better</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Build collaborative trip plans, fork & remix itineraries from fellow travelers,
            and earn your rank as an explorer. Every journey starts with a tribe.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link to="/login" className="btn btn-primary btn-lg" id="hero-cta">
              Start Exploring
            </Link>
            <a href="#features" className="btn btn-secondary btn-lg">
              See How It Works
            </a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { value: '12.4K', label: 'Trip Plans' },
              { value: '89', label: 'Countries' },
              { value: '4.8K', label: 'Explorers' },
              { value: '340', label: 'Local Guides' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div className="hero-stat-value gradient-text">{s.value}</div>
                <div className="hero-stat-label">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" id="features">
        <div className="section-header">
          <h2 className="section-title">
            Everything You Need to{' '}
            <span className="gradient-text">Explore Smarter</span>
          </h2>
          <p className="section-subtitle">
            TripTribe combines social collaboration, smart matching, and progression rewards
            into the ultimate travel planning platform.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <motion.div
              key={i}
              className="feature-card card-glass"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={fadeUp}
            >
              <div className="feature-icon" style={{ background: `${f.color}15`, color: f.color }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="cta">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Find Your <span className="gradient-text">Tribe</span>?</h2>
          <p>Join thousands of explorers building better trips together.</p>
          <Link to="/login" className="btn btn-primary btn-lg" style={{ position: 'relative' }}>
            Get Started — It's Free
          </Link>
        </motion.div>
      </section>

      <footer className="landing-footer">
        <p>© 2026 TripTribe — Built with ❤️ by explorers, for explorers</p>
      </footer>
    </div>
  );
}
