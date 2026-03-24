import type { Metadata } from 'next'

import DashboardClient from '@/components/dashboard/dashboard-client'

export const metadata: Metadata = {
  title: 'ExamAI Dashboard',
  description: 'Protected dashboard for ExamAI aspirants.',
}

export default function DashboardPage() {
  return <DashboardClient />
}
