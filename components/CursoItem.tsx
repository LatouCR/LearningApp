import createSupabaseServerClient from "@/lib/supabase/server";
import Link from "next/link";
import dynamic from "next/dynamic";

import { Info } from "lucide-react";
import Image from "next/image";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default async function StudentForm() {
    const supabase = await createSupabaseServerClient();

    try {
        const { data } = await supabase
            .from("Cursos")
            .select()

        console.log("Cursos Cargados Exitosamente");
        console.table(data);

        return (
            <div className="">
                <article className="grid grid-cols-4">
                    {data?.map(curso => (
                        <Link
                            key={curso.key}
                            href={`/cursos/${curso.key}`}
                            passHref
                        >
                            <Card key={curso.curso_id}
                                className="max-w-[375px] max-h-[284px] mr-4 my-4 rounded-md border-none drop-shadow-lg hover:drop-shadow-2xl"
                            >
                                <CardHeader
                                    className="relative p-0 h-36 overflow-hidden bg-cover bg-center rounded-t-md">
                                    <img
                                        src="/location.jpg"
                                        alt="Curso Ulacit"
                                        className="w-full"
                                    />
                                    <div className="absolute z-10 h-full w-full bg-gradient-to-b from-transparent from-40% via-black/50 to-black/80"></div>
                                </CardHeader>
                                <CardContent
                                    className="px-4 py-2 overflow-hidden">
                                    <CardDescription>ICO2024-{curso.curso_id.toUpperCase().slice(0, 6)}G1</CardDescription>
                                    <CardTitle className="text-xl">{curso.nombreCurso}</CardTitle>
                                </CardContent>

                                <CardFooter
                                    className="border-t border-black p-4 text-sm "
                                >
                                    <div className=" inline-flex items-center gap-3">
                                        <p className="w-auto">Nombre del Profesor</p>

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info
                                                        className="ml-6"
                                                        size={18}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    className="bg-slate-900 rounded-none"
                                                >
                                                    <div className="p-4 flex-wrap text-white">
                                                        <p className="text-lg pb-5 font-bold">Informacion del Curso</p>
                                                        <p>Prof. {curso.profesor_ID?.slice(0, 8)}</p>
                                                    </div>

                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>

                    ))}
                </article>
            </div>

        )

    } catch (error) {
        console.log('Error message', error);
        return (
            <div>
                empty
            </div>

        )
    }


}