import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'  // ← Changed to HashRouter
import Dashboard from './pages/Dashboard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

// PrivateRoute ensures only authenticated users can access protected routes
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? children : <Navigate to="/login" replace />
}

// Wrapper for automatic redirect after login/signup/logout
const RedirectHandler = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    // If logged in, go to dashboard; if not, go to login
    navigate(token ? '/' : '/login', { replace: true })
  }, [navigate])

  return null
}

function App() {
  return (
    <Router>  {/* Now uses HashRouter */}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Handles redirects after login/signup/logout */}
        <Route path="/redirect" element={<RedirectHandler />} />

        {/* Catch-all: redirects unknown routes to redirect handler */}
        <Route path="*" element={<RedirectHandler />} />
      </Routes>
    </Router>
  )
}

export default App