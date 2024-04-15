import createSupabaseServerClient from "@/lib/supabase/server";
import readUserSession from "@/lib/readUserSession";
import CourseActions from "@/components/CourseActions";
import { redirect } from "next/navigation";
import Link from "next/link";


import { UsersRound, TextSelect, Wrench, Youtube, Instagram, Twitter } from "lucide-react";

export default async function Home({ params }: { params: { cursoId: string } }) {

    const { data: ses } = await readUserSession();
    if (!ses?.user) {
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

            <section className="flex h-auto px-10 py-8">

                <div className="flex flex-col gap-y-5 lg:w-1/5 min-w-[360px] sm:w-full">

                    <div className="w-full border-b-2 border-gray-400 h-fit">
                        <h1 className=" text-2xl pb-3">
                            Facultad del Curso
                        </h1>
                    </div>

                    <article className="w-full rounded h-28 lg:bg-white sm:bg-transparent lg:drop-shadow-md lg:shadow sm:drop-shadow-none sm:shadow-none">
                        <div className="inline-flex p-4 mx-auto h-full items-center gap-4">
                            <div className="rounded-full bg-black h-16 w-16 flex items-center justify-center">
                                {data && data.length > 0 && <p className="text-white">{data[0].nombreProfesor?.slice(0, 2).toUpperCase()}</p>}
                            </div>

                            <div className="flex flex-col gap-1">
                                {data && data.length > 0 && <p>{data[0].nombreProfesor}</p>}
                                <div className="w-fit rounded-xl border border-purple-800 text-purple-800 px-4 py">
                                    Instructor
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="w-full border-b-2 border-gray-400 h-fit">
                        <h1 className=" text-2xl pb-3">
                            Detalles & Acciones
                        </h1>
                    </div>

                    <div className="w-full gap-5 flex flex-col">

                        <div className="inline-flex gap-2 items-center">
                            <TextSelect size={40} />
                            <p className="text-lg font-normal">1º CUATRIMESTRE DEL 2024</p>
                        </div>

                        <div className="inline-flex gap-2 items-center">
                            <UsersRound size={40} strokeWidth={1.5} />
                            <div className="flex my-auto flex-col">
                                <h3 className="text-lg leading-4">Personas</h3>
                                <Link href="/cursos">
                                    <p className="text-sm text-blue-500 hover:underline">Ver a todos del curso</p>
                                </Link>
                            </div>
                        </div>

                        <div className="inline-flex gap-2 items-center">
                            <Wrench size={40} strokeWidth={1.5} />
                            <div className="flex my-auto flex-col">
                                <h3 className="text-lg leading-4">Libros & Herramientas</h3>
                                <Link href="/herramientas">
                                    <p className="text-sm text-blue-500 hover:underline">Ver curso & herramientas de institucion</p>
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="flex flex-col ml-12">

                    <div className="lg:4/5 sm:full pb-4 border-b-2 border-gray-200">
                        <img src="/Welcome.jpg" alt="" className="rounded-lg drop-shadow-lg shadow shadow-black/40" />
                    </div>


                    <div className="py-6">
                        <p>ULACIT ofrece a sus estudiantes y profesores un entorno de aprendizaje moderno, atractivo y accesible, utilizando la plataforma de educación en línea Learning. A través de esta herramienta, el aprendizaje en línea puede tener lugar en un entorno síncrono con interacción instantánea o asíncrono, como en el caso de los debates entre estudiantes. Alumnos y profesores pueden acceder a la plataforma y utilizarla a través de dispositivos móviles.</p>
                        <br />
                        <p>ULACIT se ha unido a la comunidad internacional de instituciones de educación superior que tienen acceso a recursos de información, innovación y mejores prácticas en educación virtual a través de la plataforma Canvas, compartida por Universidades afiliadas de todo el mundo.El sitio web de Instructure&apos;s ofrece una amplia gama de materiales de formación, incluyendo seminarios web y vídeos explicativos destinados a maximizar el potencial de la plataforma&apos;s.Los tutoriales, el soporte en línea y los materiales dirigidos tanto a estudiantes como a profesores están disponibles en varios idiomas, incluido el inglés.</p>
                        <br />
                        <p>Le invitamos a explorar esta plataforma y a sacarle el máximo partido para sus cursos. Le deseamos mucho éxito en este nuevo periodo académico.</p>

                    </div>


                    <div className="lg:4/5 sm:full py-4 border-t-2 border-gray-200">
                        <div className="inline-flex justify-end w-full items-center gap-2">
                            <p>Links Importantes</p>

                            <div className="rounded-full h-10 w-10 bg-white flex items-center justify-center">
                                <Link href="https://twitter.com/ulacitcostarica">
                                    <Twitter fill="black"/>
                                </Link>

                            </div>


                            <div className="rounded-full h-10 w-10 bg-white flex items-center justify-center">
                                <Link href="https://www.instagram.com/ulacitcr/?hl=es">
                                    <Instagram />
                                </Link>

                            </div>


                            <div className="rounded-full h-10 w-10 bg-white flex items-center justify-center">
                                <Link href="https://www.youtube.com/user/Ulacitcr">
                                    <Youtube />
                                </Link>

                            </div>
                        </div>
                    </div>

                </div>






            </section>

        </main>
    )
}
