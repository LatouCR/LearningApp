import createSupabaseServerClient from "@/lib/supabase/server";
import CourseActions from "@/components/CourseActions";

export default async function Grades({ params }: { params: { cursoId: string } }) {
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
                            <h1 className="text-xl font-normal">Calificaciones de: {data[0].nombreCurso.toUpperCase()}</h1>
                        </>
                    )}
                </div>

                <CourseActions cursoId={cursoId} />

            </header>
            <section className="flex items-center justify-center h-screen">
                <p>Aqui van los modulos</p>
            </section>

        </main>

    );
}