'use client'
import Link from 'next/link'
import { useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'

const supabase = getSupabaseBrowserClient()

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    setError('')
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    setLoading(true)
    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)
    if (loginError) {
      setError('Invalid email or password. Please try again.')
    } else {
      window.location.href = '/dashboard'
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(200,164,74,0.3)',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '15px',
    boxSizing: 'border-box' as const,
    outline: 'none',
  }

  return (
    <main style={{
      backgroundColor: '#0F1F3D',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif',
      padding: '20px',
    }}>
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(200,164,74,0.3)',
        borderRadius: '16px',
        padding: '48px 40px',
        width: '100%',
        maxWidth: '440px',
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#C8A44A',
            textDecoration: 'none',
            letterSpacing: '2px',
          }}>ExamAI</Link>
          <p style={{ color: '#888', marginTop: '8px', fontSize: '15px' }}>
            Welcome back. Continue your preparation.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(220,50,50,0.15)',
            border: '1px solid rgba(220,50,50,0.4)',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#ff6b6b',
            fontSize: '14px',
            marginBottom: '20px',
          }}>{error}</div>
        )}

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{
            color: '#aaa',
            fontSize: '13px',
            display: 'block',
            marginBottom: '6px',
          }}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="you@example.com"
            style={inputStyle}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '8px' }}>
          <label style={{
            color: '#aaa',
            fontSize: '13px',
            display: 'block',
            marginBottom: '6px',
          }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Your password"
            style={inputStyle}
          />
        </div>

        {/* Forgot Password */}
        <div style={{ textAlign: 'right', marginBottom: '24px' }}>
          <Link href="/forgot-password" style={{
            color: '#C8A44A',
            fontSize: '13px',
            textDecoration: 'none',
          }}>Forgot password?</Link>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: loading ? '#8B6914' : '#C8A44A',
            color: '#0F1F3D',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginBottom: '20px',
          }}
        >
          {loading ? 'Logging in...' : 'Login →'}
        </button>

        {/* Divider */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '20px',
        }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(200,164,74,0.2)' }} />
          <span style={{ color: '#555', fontSize: '13px' }}>or</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(200,164,74,0.2)' }} />
        </div>

        {/* Sign Up Link */}
        <p style={{
          textAlign: 'center',
          color: '#888',
          fontSize: '14px',
          margin: 0,
        }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{
            color: '#C8A44A',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}>Create Account</Link>
        </p>

      </div>
    </main>
  )
}

