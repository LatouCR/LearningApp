"use client";

import Link from "next/link";

import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <main className='h-screen w-full bg-black'>
      <div className="absolute w-screen h-screen bg-blend-darken bg-black backdrop-brightness-50">
        <div className="absolute inset-0 bg-black opacity-55 z-10"></div>
        <img src="/campus.jpg" alt="imagen del campus de la universidad" className="w-screen h-screen" />
      </div>
      <section className="relative z-20">

        <div className="p-6">
          <img src="https://canvas.ulacit.ac.cr/wp-content/uploads/2023/03/Logo-ULACIT_blanco.png" alt="Logo Ulacit" />
        </div>

        <div className="max-w-screen-xl w-full m-auto">
          <div className="text-white text-center mb-10">
            <h2 className="text-2xl">Bienvenido a </h2>
            <h1 className="text-5xl font-bold">LEARNING</h1>
            <h2 className="text-2xl">facilitando la enseñanza y aprendizaje</h2>
          </div>


          <div className="flex items-center justify-center gap-8">

            <Card
              className="rounded-xl border-[0px] hover:border-4 hover:border-white"
            >
              <CardContent className="overflow-hidden max-h-64 max-w-64 p-0">
                <Link href="logIn/Student">
                  <img src="/student.jpg" alt="Login de estudiante ulacit" className="h-64 w-auto rounded-t-lg" />
                </Link>

              </CardContent>
              <CardFooter
                className="bg-amber-600 flex items-center justify-center p-3 text-white font-semibold text-sm rounded-b-md"
              >
                Estudiante
              </CardFooter>
            </Card>

            <Card
              className="rounded-xl border-[0px] hover:border-4 hover:border-white"
            >
              <CardContent className="overflow-hidden max-h-64 max-w-64 p-0">
                <Link href="logIn/Teacher">
                  <img src="/teacher.jpg" alt="Login de estudiante ulacit" className="h-64 w-60 rounded-t-lg" />
                </Link>

              </CardContent>
              <CardFooter
                className="bg-amber-600 flex items-center justify-center p-3 text-white font-semibold text-sm rounded-b-md"
              >
                Profesor
              </CardFooter>
            </Card>



          </div>

          <div className="flex w-full items-center justify-center">
            <p className="text-center py-2 text-white font-light">© 2024 learning.ulacit.ac.cr / All rights reserved</p>
          </div>


        </div>




      </section>
    </main>

  )
}