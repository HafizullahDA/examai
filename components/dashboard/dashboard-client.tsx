'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

import UploadForm from '@/components/dashboard/upload-form'
import StudyMaterialsLibrary from '@/components/dashboard/study-materials-library'
import { getSupabaseBrowserClient } from '@/lib/supabase-browser'

type AspirantProfile = {
  fullName: string
  email: string
  examPreference: string
  joinedOn: string
}

function formatJoinedOn(createdAt?: string) {
  if (!createdAt) {
    return 'Recently joined'
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(createdAt))
}

function mapUserToProfile(user: User): AspirantProfile {
  return {
    fullName:
      typeof user.user_metadata?.full_name === 'string' &&
      user.user_metadata.full_name.trim()
        ? user.user_metadata.full_name
        : 'ExamAI Aspirant',
    email: user.email ?? 'No email available',
    examPreference:
      typeof user.user_metadata?.exam_preference === 'string' &&
      user.user_metadata.exam_preference.trim()
        ? user.user_metadata.exam_preference
        : 'Not selected yet',
    joinedOn: formatJoinedOn(user.created_at),
  }
}

export default function DashboardClient() {
  const router = useRouter()
  const [profile, setProfile] = useState<AspirantProfile | null>(null)
  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  function handleAddMaterial() {
    const uploadSection = document.getElementById('study-material-upload')

    uploadSection?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()
    let isActive = true

    async function loadCurrentAspirant() {
      const { data, error } = await supabase.auth.getUser()

      if (!isActive) {
        return
      }

      if (error || !data.user) {
        router.replace('/login')
        return
      }

      setProfile(mapUserToProfile(data.user))
      setIsCheckingSession(false)
    }

    void loadCurrentAspirant()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!isActive) {
        return
      }

      if (!session?.user) {
        setProfile(null)
        setIsCheckingSession(false)
        router.replace('/login')
        return
      }

      setProfile(mapUserToProfile(session.user))
      setIsCheckingSession(false)
    })

    return () => {
      isActive = false
      subscription.unsubscribe()
    }
  }, [router])

  async function handleLogout() {
    const supabase = getSupabaseBrowserClient()
    setIsLoggingOut(true)
    await supabase.auth.signOut()
    router.replace('/login')
  }

  if (isCheckingSession) {
    return (
      <main className="min-h-screen bg-[#0F1F3D] px-6 py-10 text-white">
        <div className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center">
          <div className="rounded-[28px] border border-white/10 bg-white/5 px-8 py-10 text-center backdrop-blur">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-[#C8A44A]" />
            <p className="mt-4 text-sm text-slate-200">
              Loading your dashboard...
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (!profile) {
    return null
  }

  return (
    <main className="min-h-screen bg-[#0F1F3D] text-slate-900">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(200,164,74,0.18),_transparent_32%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.14),_transparent_24%)]" />
        <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">
          <header className="flex flex-col gap-6 rounded-[32px] border border-white/10 bg-white/6 p-5 text-white shadow-[0_40px_100px_rgba(0,0,0,0.25)] backdrop-blur sm:p-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-2xl">
              <Link
                href="/"
                className="text-3xl font-bold tracking-[0.18em] text-[#C8A44A]"
              >
                ExamAI
              </Link>
              <p className="mt-3 text-lg text-slate-200">
                Turn your notes into exam questions instantly
              </p>
              <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300">
                Upload a PDF, drop a handwritten note image, or paste study
                material to prepare the quiz-generation flow.
              </p>
            </div>

            <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/8 p-5 text-sm text-slate-100 sm:grid-cols-2 xl:min-w-[380px]">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Full Name
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  {profile.fullName}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Email
                </p>
                <p className="mt-2 break-all text-base font-semibold text-white">
                  {profile.email}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Exam Preference
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  {profile.examPreference}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Member Since
                </p>
                <p className="mt-2 text-base font-semibold text-white">
                  {profile.joinedOn}
                </p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center justify-center rounded-full border border-[#C8A44A]/40 bg-[#C8A44A] px-4 py-3 font-semibold text-[#0F1F3D] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </header>

          <section className="grid gap-6">
            <StudyMaterialsLibrary onAddMaterial={handleAddMaterial} />
            <div id="study-material-upload">
              <UploadForm defaultExam={profile.examPreference} />
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
