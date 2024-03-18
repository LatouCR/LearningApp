import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {


  const supabase = await createSupabaseServerClient();
   const {data, error } = await supabase.auth.getUser()
   if (error || !data?.user) {
     redirect('/logIn')
   }
  return (
    <main>
      <section className="flex items-center justify-center h-screen">
        <p>Herramientas</p>
      </section>

    </main>

  );
}