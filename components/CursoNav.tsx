import createSupabaseServerClient from "@/lib/supabase/server"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { BookMarked } from "lucide-react"

import Link from "next/link"

const CursoNav = async () => {

    const supabase = await createSupabaseServerClient();

    const response = await supabase.auth.getUser()
    const user = response.data.user;
    if (!user) return;
    const { data } = await supabase
        .from("Matriculas")
        .select()
        .eq('estudiante_id', user.id)

    const {data: cursos} = await supabase
    .from("Cursos")
    .select('curso_id, key, nombreCurso')
    .in('key', data?.map(key => key.curso) || [])

    return (

        <div>
            <Sheet>
                <SheetTrigger>
                    <div className="gap-2 inline-flex items-center py-1 px-0">
                        <BookMarked size={28} />
                        <h1 className="font-light text-base">
                            Cursos
                        </h1>
                    </div>
                </SheetTrigger>
                <SheetContent side={"left"} className="bg-white ml-[200px] z-10 border-none shadow-lg shadow-black/40">
                    <SheetHeader>
                        <SheetTitle className="">
                            <div className="text-2xl font-medium pb-4 border-b border-gray-400">
                                Cursos
                            </div>

                            <Link href="/cursos">
                                <div
                                    className="text-base font-normal py-6 border-b border-gray-400 text-gray-400 hover:text-gray-600 hover:underline">
                                    Todos los Cursos
                                </div>
                            </Link>
                        </SheetTitle>

                        <div className="w-full text-wrap text-gray-500">
                            {cursos?.map((curso) => (
                                <div className="py-2" key={curso.key}>
                                    <Link
                                    key={curso.key}
                                    href={`/cursos/${curso.key}`}
                                    passHref
                                    >
                                        <h3 className="text-md font-normal hover:underline hover:text-gray-600">
                                            {curso.nombreCurso}
                                        </h3>
                                        <p className="text-xs font-light text-gray-400">
                                            1 CUATRIMESTRE DEL 2024
                                        </p>
                                    </Link>
                                </div>
                            ))}


                        </div>

                        <SheetDescription className="pt-6">
                            Bienvenido a tus cursos! Para acceder a la lista de todos tus cursos, haz click en el link de &ldquo;Todos los Cursos&rdquo; y selecciona los cursos que quieres ver.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </div>


    )
}

export default CursoNav