import createSupabaseServerClient from "@/lib/supabase/server";
import Link from "next/link";
import dynamic from "next/dynamic";

import { Info, MessageSquareDot } from "lucide-react";
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

export default async function CursoItem({ imageList }: {
    imageList: string[]
}) {
    const supabase = await createSupabaseServerClient();

    try {
        const { data } = await supabase
            .from("Cursos")
            .select()

        console.log("Cursos Cargados Exitosamente");
        console.table(data);

        return (
            <div className="my-5">
                <article className="grid lg:grid-cols-4 sm:grid-cols-2 gap-2 gap-y-8">
                    {data?.map((curso, index) => (
                        <Card key={curso.curso_id}
                            className="max-w-[375px] max-h-[284px] rounded-md border-none drop-shadow-lg hover:drop-shadow-2xl"
                        >
                            <Link
                                key={curso.key}
                                href={`/cursos/${curso.key}`}
                                passHref
                                className="w-fit h-fit"
                            >
                                <CardHeader
                                    className="relative p-0 h-36 overflow-hidden bg-cover bg-center rounded-t-md">
                                    <img
                                        src={imageList[(index + 1) % imageList.length]} alt="Curso Ulacit"
                                        className="w-full"
                                    />
                                    <div className="absolute z-10 h-full w-full bg-gradient-to-b from-transparent from-40% via-black/60 to-black/80"></div>
                                </CardHeader>
                                <CardContent
                                    className="px-4 py-2 overflow-hidden">
                                    <CardDescription>ICO2024-{curso.curso_id.toUpperCase().slice(0, 6)}G1</CardDescription>
                                    <CardTitle className="text-xl">{curso.nombreCurso}</CardTitle>
                                </CardContent>

                            </Link>

                            <CardFooter
                                className="border-t border-black px-4 py-2 text-sm "
                            >
                                <div className=" inline-flex items-center w-full">
                                    <p className="w-full">{curso.nombreProfesor}</p>

                                    <div className="inline-flex gap-3 mx-auto justify-end w-auto">

                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info
                                                        className="ml-6"
                                                        size={18}
                                                    />
                                                </TooltipTrigger>
                                                <TooltipContent
                                                    className="bg-slate-800 rounded-none"
                                                >
                                                    <div className="flex-wrap text-white p-2">
                                                        <h1 className="font-medium">Informacion del Curso</h1>
                                                        <p>Prof. {curso.nombreProfesor}</p>
                                                        <p>ID: {curso.curso_id.slice(0,12)}</p>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>


                                        <Link href={`/cursos/${curso.key}/mensajes`}>
                                            <MessageSquareDot
                                                className="hover:text-background hover:fill-background/40"
                                                size={18}
                                            />
                                        </Link>
                                    </div>
                                </div>
                            </CardFooter>
                        </Card>

                    ))}
                </article>
            </div>

        )

    } catch (error) {
        console.log('Error message', error);
        return (
            <div className="flex container mx-auto w-full">
                Error al cargar los cursos
            </div>  

        )
    }


}