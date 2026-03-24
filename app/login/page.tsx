'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import AuthShell from '@/components/auth/auth-shell'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'

const supabase = getSupabaseBrowserClient()

export default function Login() {
  const router = useRouter()
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
      router.push('/dashboard')
    }
  }

  return (
    <AuthShell
      eyebrow="Returning Aspirants"
      title="Welcome back to your preparation workspace"
      subtitle="Pick up where you left off, generate fresh practice from your notes, and keep your study momentum alive."
      footer={
        <p className="text-center">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold text-[#8B6914] transition hover:text-[#6A4E10]"
          >
            Create Account
          </Link>
        </p>
      }
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8B6914]">
          Sign In
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">
          Continue your ExamAI journey
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Sign in to access your dashboard, saved quizzes, and your growing
          notes-to-MCQ workflow.
        </p>
      </div>

      <div className="mt-8 space-y-5">
        {error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-900"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleLogin()}
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#C8A44A] focus:bg-white focus:ring-4 focus:ring-[#C8A44A]/15"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-900"
            >
              Password
            </label>
            <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
              Secure Access
            </span>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && handleLogin()}
            placeholder="Your password"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#C8A44A] focus:bg-white focus:ring-4 focus:ring-[#C8A44A]/15"
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#C8A44A] px-6 py-4 text-base font-semibold text-[#0F1F3D] shadow-[0_20px_40px_rgba(200,164,74,0.24)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#0F1F3D]/25 border-t-[#0F1F3D]" />
              Logging in...
            </>
          ) : (
            'Sign In'
          )}
        </button>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          Need a new account? Create one in a minute and you&apos;ll land on
          your dashboard right after login.
        </div>
      </div>
    </AuthShell>
  )
}
