import readUserSession from "@/lib/readUserSession";
import { redirect } from "next/navigation";

export default async function Home() {

  const {data} = await readUserSession();
  if(!data.session){
    return redirect("/logIn")
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

