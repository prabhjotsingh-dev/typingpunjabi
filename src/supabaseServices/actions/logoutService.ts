'use server'

import { createAuthServerClient } from '@/supabaseServices/clients/serverClient'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  const supabase = await createAuthServerClient()
  await supabase.auth.signOut()
  redirect('/')
}
