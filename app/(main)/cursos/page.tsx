"use client"
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import useSupabaseClient from '@/lib/supabase/client';
import readUserSession from '@/lib/readUserSession';

export default function Page(): JSX.Element {
  const supabase = useSupabaseClient();
  const [role, setRole] = useState<string | null>(null);
    // PRUEBA >>>ESTO SE PUEDE ELIMINAR, SOLO ERA UNA PRUEBA(NO FUNCIONO XD)<<< sacar el Usuario loggeado 
  {/*useEffect(() => {
    const fetchData = async () => {
      const userId = await readUserSession();
      console.log('User ID:', userId); 
  
      if (userId) {
        let { data, error } = await supabase
          .from('Usuarios')
          .select('role')
          .eq('id', userId);
  
        console.log('Data:', data); 
        console.log('Error:', error); 
  
        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setRole(data[0]?.role);
        }
      }
    };
  
    fetchData();
  }, [supabase]); */}
  // PLACEHOLDER Boton para ir a Personas y ver la lista de estudiantes y el profesor del curso. Grupos tambien. Se puede modificar o cambiar
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