import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0F1F3D] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(200,164,74,0.22),_transparent_30%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.08),_transparent_22%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-12">
        <header className="flex items-center justify-between py-2">
          <Link
            href="/"
            className="text-2xl font-bold tracking-[0.18em] text-[#C8A44A] sm:text-3xl"
          >
            ExamAI
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/8"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-[#C8A44A] px-4 py-2 text-sm font-semibold text-[#0F1F3D] transition hover:brightness-105"
            >
              Create Account
            </Link>
          </div>
        </header>

        <section className="flex flex-1 items-center py-10 sm:py-14 lg:py-20">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="max-w-3xl">
              <span className="inline-flex rounded-full border border-[#C8A44A]/30 bg-[#C8A44A]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#E3C97B]">
                Notes to MCQs
              </span>

              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Turn your notes into exam-style questions instantly
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                ExamAI helps aspirants paste study notes or upload PDFs and
                handwritten pages, then generate focused practice questions in a
                style that matches their selected exam.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-2xl bg-[#C8A44A] px-6 py-4 text-base font-semibold text-[#0F1F3D] shadow-[0_20px_40px_rgba(200,164,74,0.25)] transition hover:brightness-105"
                >
                  Start Free
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/15 px-6 py-4 text-base font-medium text-white transition hover:bg-white/8"
                >
                  I already have an account
                </Link>
              </div>

              <div className="mt-10 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/6 p-4 backdrop-blur">
                  Paste notes or upload files
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/6 p-4 backdrop-blur">
                  Choose exam, style, and difficulty
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/6 p-4 backdrop-blur">
                  Practice with instant explanations
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/6 p-5 shadow-[0_40px_100px_rgba(0,0,0,0.25)] backdrop-blur sm:p-6">
              <div className="rounded-[28px] border border-[#C8A44A]/20 bg-white p-5 text-slate-900 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8B6914]">
                      Demo Flow
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">
                      From notes to practice
                    </h2>
                  </div>
                  <div className="rounded-full bg-[#FFF8E7] px-3 py-2 text-xs font-semibold text-[#8B6914]">
                    AI Powered
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      1. Add your notes
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Paste text or upload a PDF/image of your study material.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      2. Set your quiz
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Pick exam, difficulty, question count, and question style.
                    </p>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-sm font-semibold text-slate-900">
                      3. Practice smarter
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Review generated questions one by one with explanations.
                    </p>
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
