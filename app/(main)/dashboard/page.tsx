import readUserSession from "@/lib/readUserSession";
import { redirect } from "next/navigation";

export default async function Page() {
  const {data} = await readUserSession();
  if(!data.session){
    return redirect("/logIn")
  }

    return (
      <main>
        <section className="flex items-center justify-center h-screen">
          <p>Dashboard</p>
        </section>
 
      </main>
  
    );
  }