import './Sidebar.css';

export default function Sidebar({ isOpen, onClose, onNavigate, currentPath }) {
  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/upload', label: 'Upload Receipt', icon: '📤' },
    { path: '/claims', label: 'Claims', icon: '📋' },
    { path: '/benefits', label: 'Benefits', icon: '✨' },
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="sidebar-close" onClick={onClose}>×</button>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`sidebar-link ${currentPath === item.path ? 'active' : ''}`}
              onClick={() => {
                onNavigate(item.path);
                onClose();
              }}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span className="sidebar-label">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-card">
            <h4>Need Help?</h4>
            <p>Check our guide to understand the claims process.</p>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: 'var(--space-sm)' }}>
              View Guide
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}