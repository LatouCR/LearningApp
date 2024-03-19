import createSupabaseServerClient from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home({ params }: { params: { cursoId: string } }) {
    const { cursoId } = params;

    const supabase = await createSupabaseServerClient();
    const { data } = await supabase
        .from("Cursos")
        .select()
        .eq("key", cursoId)

    console.log(cursoId)
    console.table(data)

    return (
        <main>

            <header className="flex flex-none border-b border-gray-400 w-full h-[105px] bg-white">
                <div className="px-10 py-8">
                    {data && data.length > 0 && (
                        <>
                            <h1 className="text-3xl font-medium">{data[0].nombreCurso}</h1>
                        </>
                    )}
                </div>
            </header>

            <section className="flex justify-center h-svh">

                <div className="grid justify-items-center grid-cols-4 row-gap-y-25 grid-flow-row-dense items-center">

                    <img src="/modulos.png" width={200} height={200} />
                    <img src="/calificaciones.png" width={200} height={200} />
                    <img src="/chat.png" width={200} height={200} />
                    <img src="/personas.png" width={200} height={200} />

                    <div>
                        <button className="bg-transparent hover:bg-purple-500 text-purple-700 font-semibold hover:text-white py-2 px-4 border border-purple-500 hover:border-transparent rounded">
                            <Link href="/cursos/modulos">
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
