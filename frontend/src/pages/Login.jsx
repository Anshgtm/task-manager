import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../api/api'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', phoneno: '', username: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await loginUser({ ...form, phoneno: Number(form.phoneno) })
      const user = res.data?.data
      localStorage.setItem('taskflowUser', JSON.stringify({ name: user?.name || form.name, username: user?.username || form.username }))
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check that the backend is running.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-decoration decor-one" />
      <div className="auth-decoration decor-two" />
      <section className="login-card">
        <div className="login-brand"><div className="brand-mark large">✓</div><span>TaskFlow</span></div>
        <p className="eyebrow">TASK MANAGER</p>
        <h1>Get things done.</h1>
        <p className="login-copy">Sign in to your workspace and keep your tasks moving.</p>

        <form onSubmit={submit} className="login-form">
          <label>Full name<input name="name" value={form.name} onChange={change} placeholder="Ansh Kumar" required /></label>
          <label>Phone number<input name="phoneno" value={form.phoneno} onChange={change} placeholder="9876543210" inputMode="numeric" required /></label>
          <label>Username<input name="username" value={form.username} onChange={change} placeholder="ansh" maxLength={8} required /></label>
          {error && <div className="error-box">{error}</div>}
          <button className="btn primary full" disabled={loading}>{loading ? 'Signing in...' : 'Enter workspace →'}</button>
        </form>
        <p className="login-note">Your existing Express session handles authentication.</p>
      </section>
    </main>
  )
}
