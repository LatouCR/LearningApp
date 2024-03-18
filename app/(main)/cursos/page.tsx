import CursoItem from "@/components/CursoItem";

export default async function Page() {


  return (
    <main>
      <header className="flex flex-none border-b border-solid shadow-black/20 w-full h-[105px]">
        <div className="px-10 py-8">
          <h1 className=" text-3xl font-medium">Cursos</h1>
        </div>
      </header>

      <section className="px-10">
        <CursoItem/>
      </section>

    </main>

  );
}