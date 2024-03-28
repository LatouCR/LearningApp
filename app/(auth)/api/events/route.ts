import createSupabaseServerClient from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient()

  const {data} = await supabase.from('Tareas').select()
  return NextResponse.json(data)
  
}