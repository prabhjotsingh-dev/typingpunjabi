import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/supabaseServices/clients/serverClient'

export async function GET(request: NextRequest, { params }: { params: Promise<{ pra: string }> }) {
  const supabase = await createServerClient()
  const { pra } = await params

  // Get the current anonymous/logged-in user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const userId = user.id
  const progressSelect = `lesson_stats!left(highest_wpm, highest_accuracy)`

  let result

  if (pra === 'all') {
    result = await supabase
      .from('lessons')
      .select(`*, ${progressSelect}`)
      .eq('is_published', true)
      .eq('lesson_stats.profile_id', userId)
      .order('sequence_number')
  } else if (pra.endsWith('nextlesson')) {
    const id = pra.slice(0, -10)

    // Step 1: get current lesson's sequence_number
    const { data: current, error: seqError } = await supabase
      .from('lessons')
      .select('sequence_number')
      .eq('id', id)
      .single()

    if (seqError || !current) {
      return NextResponse.json({ error: 'Current lesson not found' }, { status: 404 })
    }

    // Step 2: get next lesson by sequence_number
    result = await supabase
      .from('lessons')
      .select(`*, ${progressSelect}`)
      .eq('is_published', true)
      .eq('lesson_stats.profile_id', userId)
      .gt('sequence_number', current.sequence_number)
      .order('sequence_number')
      .limit(1)
      .single()
  } else {
    result = await supabase
      .from('lessons')
      .select(`*, ${progressSelect}`)
      .eq('id', pra)
      .eq('lesson_stats.profile_id', userId)
      .single()
  }

  const { data, error } = result
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(Array.isArray(data) ? { data } : data)
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ pra: string }> }) {
  const supabase = await createServerClient()
  const body = await request.json()
  const { pra } = await params

  // Get the current user
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const userId = user.id

  // Resolve lesson id (handle nextlesson suffix)
  let lessonId: string
  if (pra.endsWith('nextlesson')) {
    const currentId = pra.slice(0, -10)
    const { data: current, error: seqError } = await supabase
      .from('lessons')
      .select('sequence_number')
      .eq('id', currentId)
      .single()
    if (seqError || !current) {
      return NextResponse.json({ error: 'Current lesson not found' }, { status: 404 })
    }
    const { data: nextLesson, error: nextError } = await supabase
      .from('lessons')
      .select('id')
      .eq('is_published', true)
      .gt('sequence_number', current.sequence_number)
      .order('sequence_number')
      .limit(1)
      .single()
    if (nextError || !nextLesson) {
      return NextResponse.json({ error: 'Next lesson not found' }, { status: 404 })
    }
    lessonId = nextLesson.id
  } else {
    lessonId = pra
  }

  const {
    wpm = 0, cpm = 0, accuracy = 0,
    correct_chars = 0, incorrect_chars = 0,
    total_chars = 0, duration_seconds = 180,
    lesson_title,
  } = body

  // 1. Insert typing result
  const { error: insertError } = await supabase.from('typing_results').insert({
    profile_id: userId,
    lesson_id: lessonId,
    mode: 'lesson',
    content_source: 'lesson',
    wpm,
    cpm,
    accuracy,
    correct_chars,
    incorrect_chars,
    total_chars,
    duration_seconds,
    is_completed: true,
    lesson_title,
  })
  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 })
  }

  // 2. Compute stars
  const stars = accuracy >= 90 ? 3 : accuracy >= 70 ? 2 : accuracy >= 40 ? 1 : 0

  // 3. Upsert lesson_stats
  const { error: upsertError } = await supabase.from('lesson_stats').upsert(
    {
      profile_id: userId,
      lesson_id: lessonId,
      highest_wpm: wpm,
      highest_accuracy: accuracy,
      lesson_title: lesson_title || "",
      last_played_at: new Date().toISOString(),
    },
    { onConflict: 'profile_id,lesson_id' }
  )
  if (upsertError) {
    return NextResponse.json({ error: upsertError.message }, { status: 500 })
  }

  return NextResponse.json({ success: true, stars })
}