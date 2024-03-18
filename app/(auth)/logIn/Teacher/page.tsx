"use client";

import TeacherLogin from "./TeachLogin";

export default function LoginPage() {
  return (
    <main className='h-screen w-full bg-black'>
      <div className="absolute w-screen h-screen bg-blend-darken bg-black backdrop-brightness-50">
      <div className="absolute inset-0 bg-black opacity-55 z-10"></div>
        <div className="absolute inset-0 w-full h-full bg-login-background bg-cover bg-center bg-no-repeat"></div>
      </div>
      <section className="relative z-20">
        <TeacherLogin />
      </section>
    </main>


  )
}