import createSupabaseServerClient from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Page() {


  const supabase = await createSupabaseServerClient();
   const {data, error } = await supabase.auth.getUser()
   if (error || !data?.user) {
     redirect('/logIn')
   }
  return (
    <main>
      <section className="flex items-center justify-center h-screen">
        <p>Calendario</p>
      </section>

    </main>

  );
}