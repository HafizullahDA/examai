import Link from 'next/link'
import type { ReactNode } from 'react'

type AuthShellProps = {
  eyebrow: string
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

const HIGHLIGHTS = [
  'Upload notes, PDFs, or handwritten pages',
  'Generate exam-style questions with focused explanations',
  'Continue practice from your dashboard after login',
]

export default function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: AuthShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0F1F3D] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(200,164,74,0.22),_transparent_28%),radial-gradient(circle_at_82%_18%,_rgba(255,255,255,0.08),_transparent_22%),radial-gradient(circle_at_bottom_right,_rgba(200,164,74,0.12),_transparent_24%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between py-2">
          <Link
            href="/"
            className="text-2xl font-bold tracking-[0.18em] text-[#C8A44A] sm:text-3xl"
          >
            ExamAI
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/8"
          >
            Back to Home
          </Link>
        </header>

        <section className="flex flex-1 items-center py-8 sm:py-10 lg:py-14">
          <div className="grid w-full items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="order-2 lg:order-1 lg:self-center">
              <span className="inline-flex rounded-full border border-[#C8A44A]/30 bg-[#C8A44A]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#E3C97B]">
                {eyebrow}
              </span>

              <h1 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
                {title}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                {subtitle}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:max-w-3xl">
                {HIGHLIGHTS.map((item) => (
                  <div
                    key={item}
                    className="rounded-3xl border border-white/10 bg-white/6 p-4 text-sm leading-6 text-slate-200 backdrop-blur"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="rounded-[32px] border border-white/10 bg-white/8 p-3 shadow-[0_40px_100px_rgba(0,0,0,0.28)] backdrop-blur sm:p-4">
                <div className="rounded-[28px] border border-[#C8A44A]/18 bg-white p-5 text-slate-900 sm:p-8">
                  {children}
                  <div className="mt-8 border-t border-slate-200 pt-5 text-sm text-slate-600">
                    {footer}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
