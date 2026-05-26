'use server'

import { createAuthServerClient } from '@/supabaseServices/supabaseServer'
import { redirect } from 'next/navigation'

export async function loginAction(email: string, password: string) {
  const supabase = await createAuthServerClient()

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  redirect('/')
}
