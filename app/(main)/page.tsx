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
      <section className="flex w-screen h-screen">
        <div className="relative w-full bg-cover bg-center">
          <img src="/banner-ulacit.png" alt="" className="object-fit w-screen"/>
        </div>
      </section>

    </main>

  );
}

