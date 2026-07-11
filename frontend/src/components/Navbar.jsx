import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function Navbar() {
  const { isAuthenticated, logout, username } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="app-header">
      <nav className="navbar">
        <Link className="brand" to={isAuthenticated ? '/dashboard' : '/login'}>
          Task Manager
        </Link>

        <div className="nav-actions">
          {isAuthenticated ? (
            <>
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
              {username && <span className="nav-user">{username}</span>}
              <button className="btn btn-outline" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
              <NavLink className="btn btn-primary" to="/register">
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
