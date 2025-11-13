import React from 'react'


// Navbar shows app name, user name and logout button
const Navbar = ({ onLogout, userName }) => {
  return (
    <header className="navbar">
      <div className="brand">
        <div className="logo">ET</div>
        <div>
          <div style={{ fontSize: 14, opacity: 0.95 }}>Employee TaskTrack</div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Personal task manager</div>
        </div>
      </div>

      <div className="nav-actions">
        <div style={{ marginRight: 12 }}>{userName || 'Guest'}</div>
        <button className="btn ghost" onClick={onLogout}>Log out</button>
      </div>
    </header>
  )
}

export default Navbar
