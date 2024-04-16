import createSupabaseServerClient from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient()
  
  const response = await supabase.auth.getUser()
  const user = response.data.user;
  if (!user) return;

  const {data: matricula} = await supabase
  .from("Matriculas")
  .select()
  .eq('estudiante_id', user.id);

  const {data: tareas} = await supabase
  .from('Tareas')
  .select()
  .in('curso', matricula?.map(curso => curso.curso) || [])

  return NextResponse.json(tareas)
  
}