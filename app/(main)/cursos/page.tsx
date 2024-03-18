"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';


export default function Page(): JSX.Element {
 
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
