import './Navbar.css';

export default function Navbar({ onMenuClick, onNavigate, currentPath }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <button className="menu-toggle" onClick={onMenuClick} aria-label="Toggle menu">
          <span className="hamburger"></span>
        </button>
        <h1 className="navbar-title">Amex Benefits</h1>
      </div>

      <div className="navbar-links">
        <button
          className={`nav-link ${currentPath === '/' ? 'active' : ''}`}
          onClick={() => onNavigate('/')}
        >
          Dashboard
        </button>
        <button
          className={`nav-link ${currentPath === '/upload' ? 'active' : ''}`}
          onClick={() => onNavigate('/upload')}
        >
          Upload
        </button>
        <button
          className={`nav-link ${currentPath === '/claims' ? 'active' : ''}`}
          onClick={() => onNavigate('/claims')}
        >
          Claims
        </button>
        <button
          className={`nav-link ${currentPath === '/benefits' ? 'active' : ''}`}
          onClick={() => onNavigate('/benefits')}
        >
          Benefits
        </button>
      </div>

      <div className="navbar-actions">
        <div className="user-menu">
          <span className="user-name">Card Holder</span>
          <div className="avatar">CH</div>
        </div>
      </div>
    </nav>
  );
}