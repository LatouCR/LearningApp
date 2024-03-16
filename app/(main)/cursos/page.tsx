"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSupabaseClient from '@/lib/supabase/client';
import readUserSession from '@/lib/readUserSession';

export default function Page(): JSX.Element {
  const supabase = useSupabaseClient();
  const [role, setRole] = useState<string | null>(null);
 
  return (
    <main>
      <section className="flex flex-col items-center justify-center h-screen">
        <p className="mb-4">Cursos</p>
        <Link href="/personas" passHref>
          <Button>Personas</Button>
        </Link>
      </section>
    </main>
  );
}

export const config = {
  client: true,
};