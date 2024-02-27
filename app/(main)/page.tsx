import Image from "next/image";

export default function Home() {
  return (
    <main>
      <section className="flex w-screen h-screen">
        <div className="relative w-full bg-cover bg-center">
          <img src="/banner-ulacit.png" alt="" className="object-fit w-screen"/>
        </div>
      </section>

    </main>

  );
}

