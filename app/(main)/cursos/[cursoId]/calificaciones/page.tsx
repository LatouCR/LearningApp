import createSupabaseServerClient from "@/lib/supabase/server";
import readUserSession from "@/lib/readUserSession";
import CourseActions from "@/components/CourseActions";
import { redirect } from "next/navigation";
import ReclamoBtn from "@/components/Calificaciones/ReclamoBtn";
import Tareas from "@/components/Calificaciones/Tareas";

export default async function Grades({ params }: { params: { cursoId: string } }) {

    const {data: ses} = await readUserSession();
    if (!ses?.user){
        redirect("/logIn")
    }

    const { cursoId } = params;

    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
        .from("Cursos")
        .select()
        .eq("key", cursoId)

    return (
        <main>

            <header className="flex w-full h-auto flex-wrap shadow-black/40 shadow sm:bg-zinc-800 lg:bg-white">
                <div className="px-10 pt-8 pb-6 flex items-center border-b border-gray-400 w-full sm:text-white lg:text-background sm:justify-center lg:justify-start">
                    {data && data.length > 0 && (
                        <span>
                            <p className="text-xs font-normal">ICO24 {data[0].curso_id.slice(0, 4).toUpperCase()}G1</p>
                            <h1 className="text-2xl font-normal">1CO24-{data[0].curso_id.slice(0, 4).toUpperCase()}G1 {data[0].nombreCurso.toUpperCase()}</h1>
                        </span>
                    )}
                </div>

                <CourseActions cursoId={cursoId} />

            </header>

            <section className="flex flex-col h-auto px-10 py-[18px]">
                <div>
                    <Tareas cursoId={cursoId}/>
                </div>

            </section>

        </main>

    );
}