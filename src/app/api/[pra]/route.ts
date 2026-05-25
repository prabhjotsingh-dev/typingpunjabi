import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabaseServer'

export async function GET(request: NextRequest, { params }: { params: { pra: string } }) {
  const supabase = createServerClient()
  const { pra } = params

  let result

  if (pra === 'all') {
    result = await supabase.from('userdata').select('*')
  } else if (pra.endsWith('nextlesson')) {
    const id = pra.slice(0, -10)
    result = await supabase
      .from('userdata')
      .select('*')
      .gt('id', id)
      .limit(1)
      .single()
  } else {
    result = await supabase
      .from('userdata')
      .select('*')
      .eq('id', pra)
      .single()
  }

  const { data, error } = result
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(Array.isArray(data) ? { data } : data)
}

export async function PUT(request: NextRequest, { params }: { params: { pra: string } }) {
  const supabase = createServerClient()
  const body = await request.json()
  const { pra } = params

  // For "nextlesson" PUT: find the next id first, then update it
  let targetId
  if (pra.endsWith('nextlesson')) {
    const currentId = pra.slice(0, -10)
    const { data: nextRow, error: findError } = await supabase
      .from('userdata')
      .select('id')
      .gt('id', currentId)
      .limit(1)
      .single()
    if (findError) return NextResponse.json({ error: findError.message }, { status: 500 })
    targetId = nextRow.id
  } else {
    targetId = pra
  }

  const { data, error } = await supabase
    .from('userdata')
    .update(body)
    .eq('id', targetId)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ result: data })
}