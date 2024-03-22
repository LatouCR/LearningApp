import createSupabaseServerClient from "@/lib/supabase/server";
import CourseActions from "@/components/CourseActions";

import Link from "next/link";

export default async function Home({ params }: { params: { cursoId: string } }) {
    const { cursoId } = params;

    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
        .from("Cursos")
        .select()
        .eq("key", cursoId)

    return (
        <main>

            <header className="flex w-full h-auto bg-white flex-wrap">
                <div className="px-10 pt-8 pb-6 flex items-center border-b border-gray-400 w-full">
                    {data && data.length > 0 && (
                        <>
                            <h1 className="text-2xl font-normal">1CO24-{data[0].curso_id.slice(0, 4).toUpperCase()}G1 {data[0].nombreCurso.toUpperCase()}</h1>
                        </>
                    )}
                </div>

                <CourseActions cursoId={cursoId}/>

            </header>

            <section className="flex justify-center h-svh">

                <div className="grid justify-items-center grid-cols-4 row-gap-y-25 grid-flow-row-dense items-center">

                    <div>
                        <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
                            <Link
                                href={`/cursos/${cursoId}/modulos`}
                            >
                                Modulos
                            </Link>
                        </button>
                    </div>
                    <div>
                        <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
                            <Link href="/cursos/calificaciones">
                                Calificaciones
                            </Link>
                        </button>
                    </div>
                    <div>
                        <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
                            <Link href="/cursos/chat">
                                Chat
                            </Link>
                        </button>
                    </div>
                    <div>
                        <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
                            <Link href="/cursos/personas">
                                Personas
                            </Link>
                        </button>
                    </div>
                </div>
            </section>

        </main>
    )
}
