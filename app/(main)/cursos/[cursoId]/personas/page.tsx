import createSupabaseServerClient from "@/lib/supabase/server";
import CourseActions from "@/components/CourseActions";
import { Separator } from "@/components/ui/separator"

import Members from "@/components/Personas/Members";
import Groups from "@/components/Personas/Groups";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default async function People({ params }: { params: { cursoId: string } }) {
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


      <section className="flex items-start justify-start h-screen m-5">
        <Tabs defaultValue="integrantes" className="w-[1000px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="integrantes" style={{ color: "lightgray" }}>Todos</TabsTrigger>
            <TabsTrigger value="grupos" style={{ color: "lightgray" }}>Grupos</TabsTrigger>
          </TabsList>
          <TabsContent value="integrantes">
            <Card className="border-0">
              <CardHeader>
                <CardTitle>Lista de integrantes</CardTitle>
                <Separator />
              </CardHeader>
              <CardContent className="space-y-2">
                <Members cursoId={cursoId} />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="grupos">
            <Card className="border-0">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Grupos</CardTitle>
                </div>
                <Separator />
              </CardHeader>
              <CardContent className="space-y-2">
                <Groups cursoId={cursoId} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

    </main>

  );
}