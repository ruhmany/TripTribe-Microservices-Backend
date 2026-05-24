import { useAuth } from '../../context/AuthContext';
import { Search, Bell, Settings } from 'lucide-react';

export default function Navbar({ collapsed }) {
  const { user } = useAuth();

  return (
    <header className={`navbar ${collapsed ? 'sidebar-collapsed' : ''}`} id="navbar">
      <div className="navbar-left">
        <div className="navbar-search">
          <Search size={16} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
          <input type="text" placeholder="Search trips, destinations, guides..." id="global-search" />
        </div>
      </div>

      <div className="navbar-right">
        <button className="navbar-icon-btn" aria-label="Notifications" id="notifications-btn">
          <Bell size={18} />
          <span className="notification-dot" />
        </button>
        <button className="navbar-icon-btn" aria-label="Settings" id="settings-btn">
          <Settings size={18} />
        </button>
        {user && (
          <div className="navbar-avatar" id="user-avatar">
            {user.initials || (user.email ? user.email.substring(0, 2).toUpperCase() : 'US')}
          </div>
        )}
      </div>
    </header>
  );
}
