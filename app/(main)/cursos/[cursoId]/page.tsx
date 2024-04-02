import createSupabaseServerClient from "@/lib/supabase/server";
import readUserSession from "@/lib/readUserSession";
import CourseActions from "@/components/CourseActions";
import { redirect } from "next/navigation";

import { UsersRound, TextSelect, Wrench } from "lucide-react";

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
                            Course Faculty
                        </h1>
                    </div>

                    <article className="w-full rounded h-28 lg:bg-white sm:bg-transparent lg:drop-shadow-md lg:shadow sm:drop-shadow-none sm:shadow-none">
                        <div className="inline-flex p-4 mx-auto h-full items-center gap-4">
                            <div className="rounded-full bg-black h-16 w-16 flex items-center justify-center">
                                <p className="text-white">AV</p>
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
                            Details & Actions
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
                                <h3 className="text-lg leading-3">Roster</h3>
                                <p className="text-sm text-blue-500">View everyone in your course</p>
                            </div>
                        </div>

                        <div className="inline-flex gap-2 items-center">
                            <Wrench size={40} strokeWidth={1.5} />
                            <div className="flex my-auto flex-col">
                                <h3 className="text-lg leading-3">Books & Tools</h3>
                                <p className="text-sm text-blue-500">View course & institution tools</p>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="flex flex-col ml-12">

                    <div className="lg:4/5 sm:full pb-4 border-b-2 border-gray-200">
                        <img src="https://placehold.co/1440x350" alt=""  className="rounded-lg drop-shadow-lg shadow shadow-black/40"/>
                    </div>


                    <div className="py-6">
                        <p>ULACIT offers its students and teachers a  modern, engaging, and accessible learning environment, using the online  education platform Canvas. Through this tool, online learning can take  place in a synchronous environment with instant interaction or  asynchronously, as in the case of debates between students. Students and  teachers can access and use the platform through mobile devices.</p>
                        <br />
                        <p>ULACIT has joined the international  community of higher education institutions that have access to  information resources, innovation, and best practices in virtual  education through the Canvas platform, shared by affiliated Universities  affiliated around the world.  The Instructure&apos;s website offers a wide  range of training materials, including webinars and explanatory videos  aimed at maximizing the platform&apos;s potential. Tutorials, online support,  and materials aimed at both students and teachers are available in  several languages, including English.</p>
                        <br />
                        <p>We invite you to explore this platform  and get the most out of it for your courses. We wish you great success  in this new academic period.</p>

                    </div>


                    <div className="lg:4/5 sm:full py-4 border-t-2 border-gray-200">
                        <div className="inline-flex justify-end w-full items-center gap-2">
                            <p>Links Importantes</p>

                            <div className="rounded-full h-10 w-10 bg-white">

                            </div>

                            
                            <div className="rounded-full h-10 w-10 bg-white">

                            </div>

                            
                            <div className="rounded-full h-10 w-10 bg-white">

                            </div>
                        </div>
                    </div>

                </div>






            </section>

        </main>
    )
}
