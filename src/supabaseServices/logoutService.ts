'use server'

import { createAuthServerClient } from '@/supabaseServices/supabaseServer'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  const supabase = await createAuthServerClient()
  await supabase.auth.signOut()
  redirect('/')
}
