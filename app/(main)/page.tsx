"use client"

import Image from "next/image";
import readUserSession from "@/lib/readUserSession";
import { useRouter } from "next/navigation";


import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"

import Link from "next/link";
import { useEffect } from "react";


export default function Home() {

    const router = useRouter()

    const session = async () => {
        const {data} = await readUserSession()
        if (!data?.user) {
            router.push('/logIn')
          }
    }

    useEffect(() => {
        session()
    }, [])

    return (

        <main className="flex flex-col max-w-full min-h-screen w-screen">

            <section className="flex flex-col w-screen h-auto max-w-full">
                <div className="relative w-full bg-cover bg-center">
                    <Image src="/banner-ulacit.png" alt="Banner de ULACIT"
                        width={1720}
                        height={140}
                        quality={80}
                        className="opacity-90 bg-blend-luminosity" />
                    <div className="absolute bottom-0 top-0 z-10 h-full w-full bg-gradient-to-b from-transparent from-70% via-black/50 to-black/80"></div>
                </div>

                <div className="flex w-full mx-auto px-7 mt-7">
                    <h1 className="text-2xl font-normal">
                        Bienvenido a Learning Platform Ulacit
                    </h1>
                </div>

            </section>

            <section className="flex flex-col max-w-full w-screen p-7">
                <span className="grid grid-cols-3 grid-rows-4 gap-4">
                    <article className="p-4 rounded-md flex flex-col gap-1 col-span-1 row-span-1 bg-white">

                    </article>


                    <article className="p-6 rounded-md flex gap-1 col-span-2 row-span-4 bg-white drop-shadow-lg shadow-black">

                        <div className="flex flex-col w-1/2 pr-4">

                            <div className="border-b-2 border-slate-100 pb-4">
                                <h1 className="text-3xl font-semibold">Learning Platform</h1>
                            </div>

                            <div className="py-4 text-xl">
                                <p>ULACIT ofrece a sus estudiantes y docentes un entorno de aprendizaje  moderno, atractivo y accesible,
                                    utilizando la plataforma de educación en  línea “Learning”. Por medio de esta herramienta, el
                                    aprendizaje en línea puede desarrollarse en un entorno sincrónico, con  interacción instantánea;
                                    o asíncrono, como en el caso de debates entre  estudiantes.
                                </p>

                                <br />

                                <p>

                                    Incluye una herramienta anti-plagio, que se usa para  promover la originalidad y crear oportunidades
                                    que ayuden a los alumnos a  citar correctamente las fuentes, al parafrasear. Los estudiantes y
                                    profesores pueden ingresar y hacer uso de la plataforma por medio de  dispositivos móviles,
                                    de tal forma que facilita soluciones de vanguardia  que permiten desarrollar modos flexibles y
                                    escalables para la entrega  de este servicio.
                                </p>

                            </div>


                        </div>

                        <div className="flex flex-col w-1/2">
                            <Carousel
                                plugins={[
                                    Autoplay({
                                        delay: 2000,
                                    }),
                                ]}
                                className="my-auto max-h-[635px]">
                                <CarouselContent className="my-auto">
                                    <CarouselItem>
                                        <img src="/stock1.jpg" className="rounded-sm h-full" />
                                    </CarouselItem>
                                    <CarouselItem>
                                        <img src="/web.jpg" className="rounded-sm" />
                                    </CarouselItem>
                                    <CarouselItem>
                                        <img src="/stock3.jpg" className="rounded-sm max-h-[635px] w-full" />
                                    </CarouselItem>

                                </CarouselContent>
                            </Carousel>
                        </div>

                    </article>


                    <article className="rounded-md flex flex-col gap-1 col-span-1 row-span-3 drop-shadow-md shadow-md shadow-black/40">
                        <Link
                            href="https://www.ulacit.ac.cr"
                        >
                            <img
                                alt="Pagina web oficial de la Ulacit"
                                src="/web.jpg"
                                className="rounded-sm"
                            />
                        </Link>

                    </article>


                </span>


            </section>


        </main>

    );
}

