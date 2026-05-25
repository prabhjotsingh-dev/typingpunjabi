'use client'

import { useEffect } from 'react'
import { createClient } from '@/supabaseServices/supabaseClient'

export default function AuthProvider() {
  useEffect(() => {
    const supabase = createClient()

    async function initAuth() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) return

      const { data, error } = await supabase.auth.signInAnonymously()
      if (error || !data.user) {
        console.error('Anonymous sign-in failed:', error?.message)
        return
      }
      await supabase.from('profiles').insert({
        id: data.user.id,
        account_type: 'guest',
      })
    }

    initAuth()
  }, [])

  return null
}
