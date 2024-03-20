import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { BookMarked } from "lucide-react"

import Link from "next/link"
import { Button } from "./ui/button"

const CursoNav = () => {
    return (

        <div>
            <Sheet>
                <SheetTrigger>
                    <div className="gap-2 inline-flex items-center">
                        <BookMarked size={24} />
                        <h1 className="font-sm">
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

                        {/*TODO: Crear un  */}
                        <div className="w-full text-wrap text-gray-500">

                            <div className="py-2">
                                <h3 className="text-md font-normal hover:underline hover:text-gray-600">
                                1CO24-130068G1 SISTEMAS DE SOPORTE A DECISIONES
                                </h3>
                                <p className="text-xs font-light text-gray-400">
                                    1 CUATRIMESTRE DEL 2024
                                </p>                                
                            </div>

                            <div className="py-2">
                                <h3 className="text-md font-normal hover:underline hover:text-gray-600">
                                1CO24-130068G1 SISTEMAS DE SOPORTE A DECISIONES
                                </h3>
                                <p className="text-xs font-light text-gray-400">
                                    1 CUATRIMESTRE DEL 2024
                                </p>                                
                            </div>

                            <div className="py-2">
                                <h3 className="text-md font-normal hover:underline hover:text-gray-600">
                                1CO24-130068G1 SISTEMAS DE SOPORTE A DECISIONES
                                </h3>
                                <p className="text-xs font-light text-gray-400">
                                    1 CUATRIMESTRE DEL 2024
                                </p>                                
                            </div>

                            <div className="py-2">
                                <h3 className="text-md font-normal hover:underline hover:text-gray-600">
                                1CO24-130068G1 SISTEMAS DE SOPORTE A DECISIONES
                                </h3>
                                <p className="text-xs font-light text-gray-400">
                                    1 CUATRIMESTRE DEL 2024
                                </p>                                
                            </div>
                        </div>

                        <SheetDescription className="pt-6">
                            Bienvenido a tus cursos! Para acceder a la lista de todos tus cursos, haz click en el link de "Todos los Cursos" y selecciona los cursos que quieres ver.
                        </SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>




        </div>


    )
}

export default CursoNav