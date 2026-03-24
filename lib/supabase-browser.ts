import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let browserClient: SupabaseClient | undefined

export function getSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase environment variables are missing.')
  }

  browserClient = createClient(supabaseUrl, supabaseAnonKey)
  return browserClient
}
