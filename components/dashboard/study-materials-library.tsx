'use client'

import { useDeferredValue, useRef, useState } from 'react'

type MaterialKind = 'PDF' | 'Notes'

type RecentMaterial = {
  title: string
  subject: string
  exam: string
  kind: MaterialKind
  updatedLabel: string
  detail: string
}

type StudyFolder = {
  name: string
  description: string
  itemCount: number
  updatedLabel: string
  topics: string[]
}

type StudyMaterialsLibraryProps = {
  onAddMaterial: () => void
}

const RECENT_MATERIALS: RecentMaterial[] = [
  {
    title: 'Constitutional Amendments Sprint',
    subject: 'Polity',
    exam: 'UPSC GS-II',
    kind: 'PDF',
    updatedLabel: 'Opened 2 hours ago',
    detail: '32 pages',
  },
  {
    title: 'Modern India Freedom Timeline',
    subject: 'History',
    exam: 'UPSC Prelims',
    kind: 'Notes',
    updatedLabel: 'Edited yesterday',
    detail: '9 note blocks',
  },
  {
    title: 'Budget and Fiscal Deficit Brief',
    subject: 'Economy',
    exam: 'SSC CGL',
    kind: 'PDF',
    updatedLabel: 'Reviewed today',
    detail: '14 pages',
  },
  {
    title: 'Climate Treaties Revision Sheet',
    subject: 'Environment',
    exam: 'UPSC GS-III',
    kind: 'Notes',
    updatedLabel: 'Saved 3 days ago',
    detail: '6 note blocks',
  },
]

const STUDY_FOLDERS: StudyFolder[] = [
  {
    name: 'Polity',
    description:
      'Constitution, governance, parliament, and landmark judgments.',
    itemCount: 18,
    updatedLabel: 'Updated this morning',
    topics: ['Fundamental Rights', 'Parliament', 'Amendments'],
  },
  {
    name: 'History',
    description:
      'Ancient, medieval, and modern India notes arranged for quick revision.',
    itemCount: 24,
    updatedLabel: 'Updated yesterday',
    topics: ['Freedom Struggle', 'Art & Culture', 'Dynasties'],
  },
  {
    name: 'Economy',
    description:
      'Budget highlights, banking basics, inflation, and policy notes.',
    itemCount: 13,
    updatedLabel: 'Updated 2 days ago',
    topics: ['Budget', 'Banking', 'Inflation'],
  },
  {
    name: 'Geography',
    description:
      'Maps, climatology, Indian resources, and physical geography summaries.',
    itemCount: 16,
    updatedLabel: 'Updated this week',
    topics: ['Monsoon', 'Rivers', 'Soils'],
  },
]

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path
        d="m21 21-4.35-4.35M10.75 18a7.25 7.25 0 1 1 0-14.5 7.25 7.25 0 0 1 0 14.5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MaterialIcon({ kind }: { kind: MaterialKind }) {
  if (kind === 'PDF') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path
          d="M7 3.75h6.5L18.25 8.5V19A2.25 2.25 0 0 1 16 21.25H8A2.25 2.25 0 0 1 5.75 19V6A2.25 2.25 0 0 1 8 3.75Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.25 3.75V8.5h4.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path
        d="M6.75 5.75A2.25 2.25 0 0 1 9 3.5h8.25A2.25 2.25 0 0 1 19.5 5.75v12.5a.25.25 0 0 1-.39.2l-1.92-1.29a1 1 0 0 0-1.12 0l-1.55 1.04a1 1 0 0 1-1.12 0l-1.55-1.04a1 1 0 0 0-1.12 0l-1.92 1.29a.25.25 0 0 1-.39-.2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 8.25h6M10 12h6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function StudyMaterialsLibrary({
  onAddMaterial,
}: StudyMaterialsLibraryProps) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const normalizedQuery = deferredQuery.trim().toLowerCase()

  const filteredMaterials = RECENT_MATERIALS.filter((material) => {
    if (!normalizedQuery) {
      return true
    }

    return [
      material.title,
      material.subject,
      material.exam,
      material.kind,
      material.detail,
    ].some((value) => value.toLowerCase().includes(normalizedQuery))
  })

  const filteredFolders = STUDY_FOLDERS.filter((folder) => {
    if (!normalizedQuery) {
      return true
    }

    return [
      folder.name,
      folder.description,
      folder.updatedLabel,
      ...folder.topics,
    ].some((value) => value.toLowerCase().includes(normalizedQuery))
  })

  function scrollRecentMaterials(direction: 'left' | 'right') {
    const container = carouselRef.current

    if (!container) {
      return
    }

    const amount = direction === 'left' ? -320 : 320
    container.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <section className="rounded-[30px] border border-white/10 bg-white/6 p-5 text-white shadow-[0_32px_90px_rgba(0,0,0,0.2)] backdrop-blur sm:p-6 lg:p-8">
      <div className="flex flex-col gap-5 border-b border-white/10 pb-6 xl:flex-row xl:items-end xl:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-[#C8A44A]/30 bg-[#C8A44A]/12 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#E3C97B]">
            Study Library
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-white">
            Study Materials Library
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Keep every note, PDF, and revision sheet in one clean workspace so
            students can search fast, revisit recent material, and jump back
            into practice without losing context.
          </p>
        </div>

        <button
          type="button"
          onClick={onAddMaterial}
          className="inline-flex items-center justify-center rounded-[20px] bg-[#C8A44A] px-5 py-3 text-sm font-semibold text-[#0F1F3D] shadow-[0_18px_40px_rgba(200,164,74,0.28)] transition hover:brightness-105"
        >
          Upload PDFs or Paste Notes
        </button>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] border border-white/10 bg-[#102347]/70 p-4 sm:p-5">
          <label
            htmlFor="study-material-search"
            className="mb-3 block text-sm font-semibold text-white"
          >
            Search materials
          </label>
          <div className="flex items-center gap-3 rounded-[22px] border border-white/10 bg-white/8 px-4 py-3 text-slate-300 transition focus-within:border-[#C8A44A]/50 focus-within:bg-white/10">
            <SearchIcon />
            <input
              id="study-material-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by topic, subject, exam, or folder..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/8 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Total Folders
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {STUDY_FOLDERS.length}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/8 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Recent Files
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {RECENT_MATERIALS.length}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/8 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Matching Results
              </p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {filteredMaterials.length + filteredFolders.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-[#C8A44A]/20 bg-[linear-gradient(135deg,rgba(200,164,74,0.16),rgba(255,255,255,0.08))] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F0D894]">
            Quick Workflow
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-white">
            Reopen recent material, then send it straight into quiz generation
          </h3>
          <p className="mt-3 text-sm leading-6 text-slate-200">
            This frontend-first screen is ready for the backend hookup later.
            For now, it gives students a polished library view and a clear path
            back to the generator.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {['Searchable', 'Recent-first', 'Folder based'].map((label) => (
              <span
                key={label}
                className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Recent Materials
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Quick access cards for the notes students opened most recently.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollRecentMaterials('left')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white transition hover:bg-white/14"
              aria-label="Scroll recent materials left"
            >
              <span aria-hidden="true" className="text-lg">
                {'<'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => scrollRecentMaterials('right')}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white transition hover:bg-white/14"
              aria-label="Scroll recent materials right"
            >
              <span aria-hidden="true" className="text-lg">
                {'>'}
              </span>
            </button>
          </div>
        </div>

        {filteredMaterials.length > 0 ? (
          <div
            ref={carouselRef}
            className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {filteredMaterials.map((material) => (
              <article
                key={material.title}
                className="min-w-[280px] max-w-[320px] flex-1 snap-start rounded-[28px] border border-white/10 bg-white/8 p-5 shadow-[0_24px_60px_rgba(0,0,0,0.16)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="rounded-2xl bg-[#FFF8E7] p-3 text-[#8B6914]">
                    <MaterialIcon kind={material.kind} />
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                    {material.kind}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#E3C97B]">
                    {material.subject}
                  </p>
                  <h4 className="mt-2 text-xl font-semibold text-white">
                    {material.title}
                  </h4>
                  <p className="mt-3 text-sm text-slate-300">{material.exam}</p>
                </div>

                <div className="mt-6 flex items-center justify-between text-sm text-slate-300">
                  <span>{material.detail}</span>
                  <span>{material.updatedLabel}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[28px] border border-dashed border-white/15 bg-white/6 px-5 py-10 text-center text-sm text-slate-300">
            No recent materials match that search yet. Try another keyword or
            add a new PDF or note block.
          </div>
        )}
      </div>

      <div className="mt-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-semibold text-white">
              Organized Folders
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Subject buckets such as Polity and History keep revision material
              easy to browse.
            </p>
          </div>
          <p className="text-sm text-slate-400">
            {filteredFolders.length} folders shown
          </p>
        </div>

        {filteredFolders.length > 0 ? (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {filteredFolders.map((folder) => (
              <article
                key={folder.name}
                className="rounded-[28px] border border-white/10 bg-[#102347]/72 p-5 transition hover:border-[#C8A44A]/35 hover:bg-[#132953]/82"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="text-2xl font-semibold text-white">
                      {folder.name}
                    </h4>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      {folder.description}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-center">
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      Items
                    </p>
                    <p className="mt-2 text-xl font-semibold text-white">
                      {folder.itemCount}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {folder.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-slate-200"
                    >
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm text-slate-300">
                  <span>{folder.updatedLabel}</span>
                  <button
                    type="button"
                    onClick={onAddMaterial}
                    className="font-semibold text-[#E3C97B] transition hover:text-[#F4DE9A]"
                  >
                    Add material
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[28px] border border-dashed border-white/15 bg-white/6 px-5 py-10 text-center text-sm text-slate-300">
            No folders match that search yet. Try searching for another topic
            or add fresh material to start a new subject bucket.
          </div>
        )}
      </div>
    </section>
  )
}
