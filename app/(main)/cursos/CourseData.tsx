import createSupabaseServerClient from "@/lib/supabase/server";
import Link from "next/link";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export default async function CursoItem() {
    const supabase = await createSupabaseServerClient();
    const response = await supabase.auth.getUser();
    const user = response.data.user;
    if (!user) return
    const { data: rol } = await supabase
        .from("Usuarios")
        .select('*')
        .eq('id', user.id)
        .single();

    console.log((rol))
    try {
        const { data } = await supabase
            .from("Cursos")
            .select()
        console.table(data)

        return (
            <div className="my-5">
                <Table className="w-full bg-white border-gray-400 border-x border-y">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Curso</TableHead>
                            <TableHead>Instructor</TableHead>
                            <TableHead>Periodo</TableHead>
                            <TableHead>Inscrito como</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((curso, index) => (
                            <TableRow key={curso.curso_id} className="text-gray-600">

                                <TableCell>
                                    <Link
                                        href={`/cursos/${curso.key}`}
                                        key={curso.key}
                                        passHref>
                                        <p className="text-lg hover:underline">
                                            ICO2024-{curso.curso_id.toUpperCase().slice(0, 6)}G1 {curso.nombreCurso}
                                        </p>
                                    </Link>
                                </TableCell>
                                <TableCell>{curso.nombreProfesor}</TableCell>
                                <TableCell>1º CUATRIMESTRE DEL 2024</TableCell>
                                <TableCell>{curso.nombreProfesor == rol?.nombre_completo ? (
                                    <p>Profesor</p>) :
                                    <p>Estudiante</p>
                                } </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

        )

    } catch (error) {
        console.log('Error message', error);
        return (
            <section className="flex container items-center justify-center">
                <p className="text-2xl">Error al cargar los cursos :(</p>
            </section>
        )
    }


}