'use client'
import Link from 'next/link'
import { useState } from 'react'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'

const supabase = getSupabaseBrowserClient()

export default function SignUp() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [exam, setExam] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSignUp() {
    setError('')
    if (!fullName || !email || !password || !exam) {
      setError('Please fill all fields and select an exam.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setLoading(true)
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, exam_preference: exam }
      }
    })
    setLoading(false)
    if (signUpError) {
      setError(signUpError.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <main style={{
        backgroundColor: '#0F1F3D', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Segoe UI, sans-serif', padding: '20px'
      }}>
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.05)',
          border: '1px solid #C8A44A', borderRadius: '16px',
          padding: '60px 40px', textAlign: 'center', maxWidth: '480px'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
          <h2 style={{ color: '#C8A44A', fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' }}>
            Account Created!
          </h2>
          <p style={{ color: '#aaa', marginBottom: '30px' }}>
            Check your email to confirm your account. Then you can log in.
          </p>
          <Link href="/login" style={{
            backgroundColor: '#C8A44A', color: '#0F1F3D',
            padding: '14px 32px', borderRadius: '8px',
            fontWeight: 'bold', textDecoration: 'none', fontSize: '16px'
          }}>Go to Login</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{
      backgroundColor: '#0F1F3D', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: 'Segoe UI, sans-serif', padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(200,164,74,0.3)',
        borderRadius: '16px', padding: '48px 40px',
        width: '100%', maxWidth: '480px'
      }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link href="/" style={{
            fontSize: '32px', fontWeight: 'bold',
            color: '#C8A44A', textDecoration: 'none', letterSpacing: '2px'
          }}>ExamAI</Link>
          <p style={{ color: '#888', marginTop: '8px', fontSize: '15px' }}>
            Create your free account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            backgroundColor: 'rgba(220,50,50,0.15)',
            border: '1px solid rgba(220,50,50,0.4)',
            borderRadius: '8px', padding: '12px 16px',
            color: '#ff6b6b', fontSize: '14px', marginBottom: '20px'
          }}>{error}</div>
        )}

        {/* Full Name */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
            Full Name
          </label>
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            placeholder="Hafizullah Lone"
            style={{
              width: '100%', padding: '12px 16px',
              backgroundColor: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(200,164,74,0.3)',
              borderRadius: '8px', color: '#fff',
              fontSize: '15px', boxSizing: 'border-box' as const,
              outline: 'none'
            }}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={{
              width: '100%', padding: '12px 16px',
              backgroundColor: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(200,164,74,0.3)',
              borderRadius: '8px', color: '#fff',
              fontSize: '15px', boxSizing: 'border-box' as const,
              outline: 'none'
            }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Minimum 6 characters"
            style={{
              width: '100%', padding: '12px 16px',
              backgroundColor: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(200,164,74,0.3)',
              borderRadius: '8px', color: '#fff',
              fontSize: '15px', boxSizing: 'border-box' as const,
              outline: 'none'
            }}
          />
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '6px' }}>
            Confirm Password
          </label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            placeholder="Repeat your password"
            style={{
              width: '100%', padding: '12px 16px',
              backgroundColor: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(200,164,74,0.3)',
              borderRadius: '8px', color: '#fff',
              fontSize: '15px', boxSizing: 'border-box' as const,
              outline: 'none'
            }}
          />
        </div>

        {/* Exam Selector */}
        <div style={{ marginBottom: '28px' }}>
          <label style={{ color: '#aaa', fontSize: '13px', display: 'block', marginBottom: '10px' }}>
            Select Your Exam
          </label>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['UPSC Civil Services', 'SSC CGL'].map(e => (
              <button
                key={e}
                onClick={() => setExam(e)}
                style={{
                  flex: 1, padding: '12px',
                  backgroundColor: exam === e ? '#C8A44A' : 'rgba(255,255,255,0.05)',
                  border: exam === e ? '2px solid #C8A44A' : '2px solid rgba(200,164,74,0.3)',
                  borderRadius: '8px',
                  color: exam === e ? '#0F1F3D' : '#ccc',
                  fontWeight: exam === e ? 'bold' : 'normal',
                  cursor: 'pointer', fontSize: '14px'
                }}
              >{e}</button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSignUp}
          disabled={loading}
          style={{
            width: '100%', padding: '14px',
            backgroundColor: loading ? '#8B6914' : '#C8A44A',
            color: '#0F1F3D', border: 'none',
            borderRadius: '8px', fontWeight: 'bold',
            fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Creating Account...' : 'Create Account →'}
        </button>

        {/* Login Link */}
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#888', fontSize: '14px' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#C8A44A', textDecoration: 'none', fontWeight: 'bold' }}>
            Login
          </Link>
        </p>

      </div>
    </main>
  )
} 
