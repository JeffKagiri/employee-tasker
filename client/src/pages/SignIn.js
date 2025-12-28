import React, { useState } from 'react'
import api from '../api/api'
import { Link } from 'react-router-dom'
import '../styles/main.css'

/*
  SignIn Page
  - Logs in a user
  - Stores JWT token in localStorage
  - Redirects to /redirect (which handles navigation to dashboard)
*/
const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await api.post('/auth/login', form)
      // Store token in browser for session persistence
      localStorage.setItem('token', res.data.token)
      // Redirect to redirect handler (auto routes to / if logged in)
      window.location.href = '/redirect'
    } catch (err) {
      setError(err.response?.data?.msg || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: 80 }}>
      <div className="card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            className="input"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          {error && <div style={{ color: '#c53030', marginBottom: 10 }}>{error}</div>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: 10 }}>
          Don’t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
