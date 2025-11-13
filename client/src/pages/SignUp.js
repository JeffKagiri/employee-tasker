import React, { useState } from 'react'
import api from '../api/api'
import '../styles/main.css'

/*
  SignUp Page
  - Registers new users
  - Stores JWT token in localStorage
  - Redirects to /redirect (which routes to dashboard if logged in)
*/
const SignUp = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await api.post('/auth/register', form)
      // Store token in localStorage
      localStorage.setItem('token', res.data.token)
      // Redirect to redirect handler (auto routes to / if logged in)
      window.location.href = '/redirect'
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container" style={{ maxWidth: 400, marginTop: 80 }}>
      <div className="card">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            className="input"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
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
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>
        <p style={{ marginTop: 10 }}>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  )
}

export default SignUp
