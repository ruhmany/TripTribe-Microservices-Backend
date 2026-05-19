import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard, Compass, PlusCircle, Map, Users, BookOpen,
  ChevronLeft, ChevronRight, LogOut, Sparkles
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/explore', icon: Compass, label: 'Explore' },
  { to: '/create-trip', icon: PlusCircle, label: 'Create Trip' },
  { to: '/guides', icon: Map, label: 'Guides' },
  { to: '/profile', icon: Users, label: 'Profile' },
];

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`} id="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">
            <Sparkles size={18} />
          </div>
          <span>TripTribe</span>
        </div>
        {!collapsed && (
          <button className="sidebar-toggle" onClick={onToggle} aria-label="Collapse sidebar">
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {collapsed && (
        <div style={{ padding: '12px', display: 'flex', justifyContent: 'center' }}>
          <button className="sidebar-toggle" onClick={onToggle} aria-label="Expand sidebar">
            <ChevronRight size={16} />
          </button>
        </div>
      )}

      <nav className="sidebar-nav">
        <div className="sidebar-section-title">Navigation</div>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {user && (
        <div className="sidebar-footer">
          <div className="sidebar-user">
            <div className="avatar avatar-sm" style={{ background: 'var(--gradient-primary)' }}>
              {user.initials}
            </div>
            <div className="sidebar-user-info">
              <div className="sidebar-user-name">{user.name}</div>
              <div className="sidebar-user-role">Explorer</div>
            </div>
            <button className="btn-ghost" onClick={logout} aria-label="Log out" style={{ marginLeft: 'auto', padding: '4px' }}>
              <LogOut size={16} />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
