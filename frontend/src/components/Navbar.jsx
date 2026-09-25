export default function Navbar({ username, onLogout }) {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="brand-mark">✓</div>
        <div>
          <strong>TaskFlow</strong>
          <span>Personal workspace</span>
        </div>
      </div>
      <div className="nav-right">
        <div className="user-chip"><span className="avatar">{(username || 'U').slice(0, 1).toUpperCase()}</span><span>{username || 'User'}</span></div>
        <button className="logout-btn" onClick={onLogout}>Log out</button>
      </div>
    </header>
  )
}
