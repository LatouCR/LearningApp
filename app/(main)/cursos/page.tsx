import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import CursoItem from "@/components/CursoItem";


export default async function Page() {

  const supabase = await createSupabaseServerClient();
  const {data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/logIn')
  }

  return (
    <main>
      <header className="flex flex-none border-b border-gray-400 w-full h-[105px] bg-white">
        <div className="px-10 py-8">
          <h1 className=" text-3xl font-medium">Cursos</h1>
        </div>
      </header>
      <section className="px-10">
        <CursoItem/>
      </section>

    </main>

  );
}