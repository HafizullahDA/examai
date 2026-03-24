'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import AuthShell from '@/components/auth/auth-shell'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'

const supabase = getSupabaseBrowserClient()

export default function SignUp() {
  const router = useRouter()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSignUp() {
    setError('')
    if (!fullName || !email || !password) {
      setError('Please fill all required fields.')
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
        data: { full_name: fullName },
      },
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
      <AuthShell
        eyebrow="Account Ready"
        title="Your account has been created"
        subtitle="One last step: confirm your email, then sign in and head to your dashboard."
        footer={
          <p className="text-center">
            Returning already?{' '}
            <Link
              href="/login"
              className="font-semibold text-[#8B6914] transition hover:text-[#6A4E10]"
            >
              Go to Login
            </Link>
          </p>
        }
      >
        <div className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF8E7] text-3xl font-semibold text-[#8B6914]">
            OK
          </div>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900">
            Check your inbox
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            We&apos;ve sent a confirmation email. Once you verify your account,
            sign in to start generating practice from your notes.
          </p>
          <Link
            href="/login"
            className="mt-8 inline-flex rounded-2xl bg-[#C8A44A] px-6 py-4 text-base font-semibold text-[#0F1F3D] shadow-[0_20px_40px_rgba(200,164,74,0.24)] transition hover:brightness-105"
          >
            Go to Login
          </Link>
        </div>
      </AuthShell>
    )
  }

  return (
    <AuthShell
      eyebrow="Join ExamAI"
      title="Create a clean, focused study workspace"
      subtitle="Set up your account once and unlock a faster way to turn notes into meaningful practice."
      footer={
        <p className="text-center">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-[#8B6914] transition hover:text-[#6A4E10]"
          >
            Login
          </Link>
        </p>
      }
    >
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8B6914]">
          Sign Up
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">
          Create your free account
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Your dashboard, saved quiz history, and future notes-to-MCQ workflow
          will stay connected to this account.
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
            htmlFor="fullName"
            className="block text-sm font-semibold text-slate-900"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            placeholder="Your full name"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#C8A44A] focus:bg-white focus:ring-4 focus:ring-[#C8A44A]/15"
          />
        </div>

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
            placeholder="you@example.com"
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#C8A44A] focus:bg-white focus:ring-4 focus:ring-[#C8A44A]/15"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-slate-900"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#C8A44A] focus:bg-white focus:ring-4 focus:ring-[#C8A44A]/15"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-slate-900"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirm}
              onChange={(event) => setConfirm(event.target.value)}
              placeholder="Repeat your password"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base text-slate-900 outline-none transition focus:border-[#C8A44A] focus:bg-white focus:ring-4 focus:ring-[#C8A44A]/15"
            />
          </div>
        </div>

        <button
          onClick={handleSignUp}
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-[#C8A44A] px-6 py-4 text-base font-semibold text-[#0F1F3D] shadow-[0_20px_40px_rgba(200,164,74,0.24)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#0F1F3D]/25 border-t-[#0F1F3D]" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push('/login')}
          className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 px-6 py-4 text-base font-medium text-slate-700 transition hover:bg-slate-50"
        >
          I already have an account
        </button>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
          You&apos;ll choose your target exam inside the quiz workflow when you
          upload notes or paste study material.
        </div>
      </div>
    </AuthShell>
  )
}
