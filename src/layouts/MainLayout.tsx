import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './MainLayout.css';

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/users', label: 'Users' },
  { to: '/tables', label: 'Tables' },
  { to: '/queries', label: 'Queries' },
];

const MainLayout: React.FC = () => {
  const location = useLocation();
  return (
    <div className="main-layout">
      <aside className="sidebar">
        <div className="logo">DB Admin</div>
        <nav>
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              className={location.pathname === item.to ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="content-area">
        <header className="topbar">
          <span>Welcome, Admin</span>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 