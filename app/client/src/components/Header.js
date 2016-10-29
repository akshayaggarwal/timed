import React from 'react'
import { Link } from 'react-router'

const Header = ({ isAuthenticated, profile, onLoginClick, onLogoutClick }) =>
  <div>
    <h1>Timed</h1>
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/about'>About</Link></li>
    </ul>
    { !isAuthenticated ? (
      <button onClick={() => onLoginClick()}>Login</button>
    ) : (
      <div>
        <img src={profile.picture} height="40px" />
        <span>Welcome, {profile.nickname}</span>
        <button onClick={() => onLogoutClick()}>Logout</button>
      </div>
    )}
  </div>

Header.propTypes = {
  isAuthenticated: React.PropTypes.bool.isRequired,
  profile: React.PropTypes.object,
  onLoginClick: React.PropTypes.func.isRequired,
  onLogoutClick: React.PropTypes.func.isRequired
}

export default Header
