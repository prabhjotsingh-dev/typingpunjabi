import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  const { email, password, username } = await request.json()

  // Basic server-side validation
  if (!email || !password || !username) {
    return NextResponse.json(
      { error: 'Email, password, and username are required.' },
      { status: 400 }
    )
  }

  // Use the admin/service-role client — never exposed to the browser
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // force-confirm since email confirmation is OFF
    user_metadata: { username },
  })

  if (error) {
    // Surface a clean error message to the client
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, userId: data.user?.id })
}
