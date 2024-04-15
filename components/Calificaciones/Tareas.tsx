import createSupabaseServerClient from "@/lib/supabase/server";
import Link from "next/link";
import ReclamoBtn from "./ReclamoBtn";
import { format } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface TareasProps {
    cursoId: string;
}

const Tareas: React.FC<TareasProps> = async ({ cursoId }) => {
    const supabase = await createSupabaseServerClient();
    const response = await supabase.auth.getUser();
    const user = response.data.user;
    if (!user) return
    const { data: userData } = await supabase
        .from('Usuarios')
        .select('role')
        .eq('id', user.id)
        .single();

    if (!user) return null;


    try {

        const { data: tareasData } = await supabase
            .from("Tareas")
            .select("id, title, end_time, puntaje_asig, curso")
            .eq("curso", cursoId);

        const { data: registroTareasData } = await supabase
            .from("RegistroTareas")
            .select("*")
            .eq("estudiante_id", user.id)

        console.table(registroTareasData)
        console.table(tareasData)

        return (
            <>
                {(userData?.role === "Estudiante") && (
                    <div className="my-5">
                        <Table className="w-full bg-white border-gray-400 border-x border-y">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Entrega</TableHead>
                                    <TableHead>Subido</TableHead>
                                    <TableHead>Estatus</TableHead>
                                    <TableHead>Nota</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tareasData?.map((tarea) => {
                                    const registroTarea = registroTareasData?.find(
                                        (rt) => rt.tarea_id === tarea.id
                                    );
                                    return (
                                        <TableRow key={tarea.id}>
                                            <TableCell>
                                                <p className="text-lg hover:underline">{tarea.title}</p>
                                            </TableCell>
                                            <TableCell>
                                                {format(new Date(tarea.end_time), "PPP")}
                                            </TableCell>
                                            <TableCell>
                                                {registroTarea?.fecha_entrega
                                                    ? format(new Date(registroTarea.fecha_entrega), "PPP")
                                                    : "Sin Entregar"}
                                            </TableCell>
                                            <TableCell>
                                                {registroTarea?.pendiente == false && registroTarea.puntos_obtenidos ? (
                                                    <Badge className="bg-background">Calificado</Badge>
                                                ) : registroTarea?.pendiente == false ? (
                                                    <Badge className="bg-green-600">Entregado</Badge>
                                                ) : (<Badge className="bg-red-600">Pendiente</Badge>
                                                )}
                                            </TableCell>
                                            <TableCell className="flex-row">
                                                {registroTarea?.puntos_obtenidos
                                                    ? registroTarea.puntos_obtenidos
                                                    : 0}{" "}
                                                / {tarea.puntaje_asig}
                                            </TableCell>
                                            <TableCell className="flex justify-center items-center">
                                                <ReclamoBtn tareaId={registroTarea?.id!} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                )}
                {(userData?.role === "Profesor" && (
                    <>
                        <div>
                            a
                        </div>
                    </>

                ))}

            </>

        )
    } catch (error) {
        console.log("Error message", error);
        return (
            <section className="flex container items-center justify-center">
                <p className="text-2xl">Error al cargar las tareas :(</p>
            </section>
        );
    }
};

export default Tareas;