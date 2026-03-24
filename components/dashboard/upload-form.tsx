'use client'

import { useRef, useState } from 'react'

const EXAM_OPTIONS = ['UPSC Civil Services', 'SSC CGL', 'JKPSC'] as const
const DIFFICULTY_OPTIONS = ['Easy', 'Medium', 'Hard'] as const
const QUESTION_OPTIONS = [5, 10, 15] as const
const STYLE_OPTIONS = [
  'MCQ',
  'Statement-Based',
  'Match the Following',
  'Mixed',
] as const
const ACCEPTED_FILE_TYPES = [
  'application/pdf',
  'image/png',
  'image/jpeg',
]

type InputMode = 'text' | 'file'

type UploadFormProps = {
  defaultExam?: string
}

export default function UploadForm({ defaultExam }: UploadFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [inputMode, setInputMode] = useState<InputMode>('text')
  const [notes, setNotes] = useState('')
  const [selectedExam, setSelectedExam] = useState(
    EXAM_OPTIONS.includes(defaultExam as (typeof EXAM_OPTIONS)[number])
      ? (defaultExam as (typeof EXAM_OPTIONS)[number])
      : EXAM_OPTIONS[0]
  )
  const [difficulty, setDifficulty] =
    useState<(typeof DIFFICULTY_OPTIONS)[number]>('Medium')
  const [questionCount, setQuestionCount] =
    useState<(typeof QUESTION_OPTIONS)[number]>(10)
  const [style, setStyle] = useState<(typeof STYLE_OPTIONS)[number]>('Mixed')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  function resetMessages() {
    setErrorMessage('')
    setStatusMessage('')
  }

  function validateFile(file: File) {
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setErrorMessage('Please upload a PDF, PNG, or JPG file.')
      return false
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Please upload a file smaller than 10 MB.')
      return false
    }

    return true
  }

  function handleFileSelection(file: File | null) {
    resetMessages()

    if (!file) {
      setSelectedFile(null)
      return
    }

    if (!validateFile(file)) {
      return
    }

    setSelectedFile(file)
  }

  async function handleGenerate() {
    resetMessages()

    if (inputMode === 'text') {
      if (!notes.trim()) {
        setErrorMessage('Paste your notes before generating questions.')
        return
      }

      if (notes.trim().length < 80) {
        setErrorMessage(
          'Please paste a little more detail so the quiz can be meaningful.'
        )
        return
      }
    }

    if (inputMode === 'file' && !selectedFile) {
      setErrorMessage('Upload a PDF or image before generating questions.')
      return
    }

    setIsGenerating(true)

    await new Promise((resolve) => {
      setTimeout(resolve, 900)
    })

    setStatusMessage(
      'Frontend validation is ready. In Step 2, this button will call the AI backend and return your quiz.'
    )
    setIsGenerating(false)
  }

  return (
    <section className="rounded-[28px] border border-[#C8A44A]/25 bg-white/95 p-5 shadow-[0_30px_80px_rgba(5,14,33,0.16)] backdrop-blur sm:p-6 lg:p-8">
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-6">
        <span className="w-fit rounded-full border border-[#C8A44A]/30 bg-[#FFF8E7] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#8B6914]">
          Notes To MCQ
        </span>
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Upload notes or paste study material
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Choose how your aspirants want to generate a quiz. This first step
            wires the protected dashboard, polished upload flow, and frontend
            validation.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6">
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setInputMode('text')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              inputMode === 'text'
                ? 'bg-[#0F1F3D] text-white shadow-lg shadow-[#0F1F3D]/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Paste Notes
          </button>
          <button
            type="button"
            onClick={() => setInputMode('file')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              inputMode === 'file'
                ? 'bg-[#0F1F3D] text-white shadow-lg shadow-[#0F1F3D]/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Upload PDF / Image
          </button>
        </div>

        {inputMode === 'text' ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <label
              htmlFor="notes"
              className="mb-3 block text-sm font-semibold text-slate-900"
            >
              Paste your study notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder={`Paste your study notes here...\nExample: The Karkota Dynasty was founded by\nDurlabhavardhana in 625 AD. Lalitaditya Muktapida\nwas its greatest ruler...`}
              className="min-h-56 w-full resize-y rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-900 outline-none transition focus:border-[#C8A44A] focus:ring-4 focus:ring-[#C8A44A]/15"
            />
            <div className="mt-3 flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
              <span>Clear, detailed notes generate better exam-style questions.</span>
              <span>{notes.length} characters</span>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <label className="mb-3 block text-sm font-semibold text-slate-900">
              Upload handwritten notes or PDF
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(event) => {
                event.preventDefault()
                setIsDragging(true)
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(event) => {
                event.preventDefault()
                setIsDragging(false)
                handleFileSelection(event.dataTransfer.files[0] ?? null)
              }}
              className={`flex min-h-56 w-full flex-col items-center justify-center rounded-[24px] border border-dashed px-6 text-center transition ${
                isDragging
                  ? 'border-[#C8A44A] bg-[#FFF8E7]'
                  : 'border-slate-300 bg-white hover:border-[#C8A44A]/60 hover:bg-[#FFFDF7]'
              }`}
            >
              <div className="rounded-full bg-[#0F1F3D] p-3 text-white">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    d="M12 16V4m0 0-4 4m4-4 4 4M5 16.5v1A2.5 2.5 0 0 0 7.5 20h9a2.5 2.5 0 0 0 2.5-2.5v-1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="mt-5 space-y-2">
                <p className="text-base font-semibold text-slate-900">
                  Drag and drop your file here
                </p>
                <p className="text-sm text-slate-500">
                  Accepts PDF, PNG, and JPG up to 10 MB
                </p>
                <span className="inline-flex rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-600">
                  Click to browse
                </span>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              className="hidden"
              onChange={(event) =>
                handleFileSelection(event.target.files?.[0] ?? null)
              }
            />
            <div className="mt-3 text-xs text-slate-500">
              {selectedFile
                ? `Selected file: ${selectedFile.name}`
                : 'No file selected yet.'}
            </div>
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-[1.2fr_1fr] 2xl:grid-cols-[1.2fr_1fr_1fr_1.25fr]">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <label
              htmlFor="exam"
              className="mb-3 block text-sm font-semibold text-slate-900"
            >
              Select Your Exam
            </label>
            <select
              id="exam"
              value={selectedExam}
              onChange={(event) =>
                setSelectedExam(
                  event.target.value as (typeof EXAM_OPTIONS)[number]
                )
              }
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#C8A44A] focus:ring-4 focus:ring-[#C8A44A]/15"
            >
              {EXAM_OPTIONS.map((exam) => (
                <option key={exam} value={exam}>
                  {exam}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-sm font-semibold text-slate-900">
              Difficulty
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {DIFFICULTY_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setDifficulty(option)}
                  className={`min-h-11 rounded-2xl px-3 py-3 text-center text-sm font-medium transition ${
                    difficulty === option
                      ? 'bg-[#0F1F3D] text-white'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-sm font-semibold text-slate-900">
              Questions
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {QUESTION_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setQuestionCount(option)}
                  className={`min-h-11 rounded-2xl px-3 py-3 text-center text-sm font-medium transition ${
                    questionCount === option
                      ? 'bg-[#0F1F3D] text-white'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-sm font-semibold text-slate-900">Style</p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {STYLE_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setStyle(option)}
                  className={`min-h-11 rounded-2xl px-3 py-3 text-center text-sm font-medium leading-5 transition ${
                    style === option
                      ? 'bg-[#0F1F3D] text-white'
                      : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={isGenerating}
          className="inline-flex w-full items-center justify-center gap-3 rounded-[22px] bg-[#C8A44A] px-6 py-4 text-base font-semibold text-[#0F1F3D] shadow-[0_20px_40px_rgba(200,164,74,0.28)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isGenerating ? (
            <>
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#0F1F3D]/30 border-t-[#0F1F3D]" />
              Generating your questions...
            </>
          ) : (
            'Generate MCQs with AI'
          )}
        </button>

        {(errorMessage || statusMessage) && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm ${
              errorMessage
                ? 'border-rose-200 bg-rose-50 text-rose-700'
                : 'border-emerald-200 bg-emerald-50 text-emerald-700'
            }`}
          >
            {errorMessage || statusMessage}
          </div>
        )}
      </div>
    </section>
  )
}
