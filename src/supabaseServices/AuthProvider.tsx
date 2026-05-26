'use client'

import { useEffect, useState, createContext, useContext } from 'react'
import { createClient } from '@/supabaseServices/supabaseClient'
import { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

export function useAuth() {
  return useContext(AuthContext)
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    async function initAuth() {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        setUser(session.user)
        setLoading(false)
        return
      }

      const { data, error } = await supabase.auth.signInAnonymously()
      if (error || !data.user) {
        console.error('Anonymous sign-in failed:', error?.message)
        setLoading(false)
        return
      }
      
      setUser(data.user)
      setLoading(false)
      
      await supabase.from('profiles').upsert({
        id: data.user.id,
        account_type: 'guest',
      }, { onConflict: 'id' })
    }

    initAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setUser(session.user)
        setLoading(false)
      } else {
        setUser(null)
        setLoading(false)
        if (event === 'SIGNED_OUT') {
          setLoading(true)
          const { data, error } = await supabase.auth.signInAnonymously()
          if (!error && data.user) {
            setUser(data.user)
            await supabase.from('profiles').upsert({
              id: data.user.id,
              account_type: 'guest',
            }, { onConflict: 'id' })
          }
          setLoading(false)
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
