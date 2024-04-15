"use client"
import React, { useEffect, useState, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetClose, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import useSupabaseClient from '@/lib/supabase/client';
import { UploadIcon, Eye, ScrollText } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { format, parseISO } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";

interface MaterialProps {
    assignment: {
        id: number,
        title: string,
        end_time: Date,
        instrucciones: string | null,
        puntaje_asig: number | null,
    },
    userRole: string
}


const SingleAssignmentCard = ({ assignment }: MaterialProps) => {
    const { toast } = useToast();
    const supabase = useSupabaseClient();
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileKey, setFileKey] = useState(''); // Estado para almacenar la clave del archivo
    const [isTaskSubmitted, setIsTaskSubmitted] = useState(false);
    const [userRole, setUserRole] = useState('');


    // Se consigue el rol del usuario
    useEffect(() => {
        const fetchUserRole = async () => {
            const response = await supabase.auth.getUser();
            if (!response.error) {
                const user = response.data.user;
                const { data, error } = await supabase
                    .from('Usuarios')
                    .select('role')
                    .eq('id', user.id)
                    .single();
                if (!error && data) {
                    setUserRole(data.role);
                }
            }
        };
        const checkIfTaskSubmitted = async () => {
            const response = await supabase.auth.getUser();
            if (response.error) {
                console.error('Error obteniendo datos del usuario:', response.error);
                return;
            }

            console.log('Respuesta de getUser:', response); // Añadido para depuración

            const user = response.data.user;
            console.log('Usuario obtenido:', user); // Añadido para depuración

            const { data, error } = await supabase
                .from('RegistroTareas')
                .select('*')
                .eq('tarea_id', assignment.id)
                .eq('estudiante_id', user.id)
                .maybeSingle();

            console.log('Respuesta de RegistroTareas:', data, error); // Añadido para depuración

            if (!error && data) {
                setIsTaskSubmitted(true);
            }
        };


        fetchUserRole();
        checkIfTaskSubmitted();
    }, [supabase, assignment.id]);

    //Se maneja la carga/subida del archivo
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const fileName = `tareas/${Date.now()}-${file.name}`;
        try {
            const { error } = await supabase.storage
                .from('archivos_tareas') // Cambiar Material
                .upload(fileName, file);

            if (error) throw error;

            setFileKey(fileName); // Guardar la clave del archivo
            toast({
                title: "Éxito",
                description: "Archivo cargado con éxito."
            });
        } catch (error) {
            console.error('Error subiendo el archivo:', error);
            toast({
                title: "Error",
                description: "Error al subir el archivo."
            });
        }
    };



    //Se registra la entrega de la asignacion

    const handleEntregar = async () => {
        const response = await supabase.auth.getUser();

        if (response.error) {
            console.error('Error al obtener el usuario:', response.error);
            return;
        }

        const user = response.data.user;

        if (!user) {
            console.error('El usuario no está autenticado.');
            return;
        }

        if (!fileKey) {
            console.error('No se ha subido ningún archivo.');
            return;
        }

        if (assignment.id === null) {
            console.error('La asignación no tiene un id válido.');
            return;
        }

        const tareaId = assignment.id;
        const endTime = new Date();

        try {
            const { error } = await supabase
                .from('RegistroTareas')
                .insert([{
                    estudiante_id: user.id,
                    tarea_id: tareaId,
                    archivo_key: fileKey,
                    fecha_entrega: endTime.toISOString(),
                    pendiente: false
                }]);

            if (error) {
                throw error;
            }

            console.log('Tarea entregada con éxito.');
            setFileKey(''); // Restablecer fileKey a una cadena vacía después de entregar
        } catch (error) {
            console.error('Error al entregar la tarea:', error);
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Fecha no definida'; // O cualquier otro valor por defecto
        return format(parseISO(dateString), 'dd/MM/yyyy');
    };

    return (
        <div className='w-full h-16 bg-white flex border-x border-spacing-0 border-b border-gray-400 p-3'>

            <div className='w-auto flex items-center pr-4 justify-start'>
                <ScrollText size={38} strokeWidth={1.3} />
            </div>

            <div className='w-auto flex flex-col justify-center mr-auto'>
                <p className='text-lg font-medium'>{assignment.title}</p>
                <div className='flex flex-row gap-2'>
                    <div className='text-xs leading-3 text-gray-500 flex flex-row gap-1'><p className='font-semibold'>Entrega:</p> {formatDate(assignment.end_time.toISOString())}</div>
                    <span className='text-xs font-semibold leading-3 text-gray-600'>|</span>
                    <div>
                        <p className='text-xs leading-3 text-gray-500 gap-0 font-semibold'>{assignment.puntaje_asig || 0} PTS</p>
                    </div>
                </div>
            </div>


            <div className='flex items-center justify-end w-auto'>
                {userRole === "Estudiante" && (
                    <div className='mr-2'>
                        <Badge
                            className="ml-2"
                            variant={isTaskSubmitted ? "destructive" : "destructive"}
                            style={isTaskSubmitted ? { backgroundColor: 'green' } : {}}
                        >
                            {isTaskSubmitted ? "Entregado" : "Pendiente"}
                        </Badge>

                    </div>

                )}
                <Sheet>
                    <SheetTrigger className="h-full w-full ">
                        <Eye className='hover:text-green-800' />
                    </SheetTrigger>
                    <SheetContent className="flex flex-col h-screen justify-between bg-white overflow-auto">
                        <SheetHeader className="flex flex-col justify-start">
                            <div className="flex flex-col">
                                <SheetTitle className="mb-2">{assignment.title}</SheetTitle>
                                {userRole === "Estudiante" && (
                                    <Badge
                                        className="justify-center mb-2"
                                        variant={isTaskSubmitted ? "destructive" : "destructive"}
                                        style={isTaskSubmitted ? { backgroundColor: 'green' } : {}}
                                    >
                                        {isTaskSubmitted ? "Entregado" : "Pendiente"}
                                    </Badge>
                                )}
                                <Badge className="justify-center mb-2" variant="outline">Fecha de entrega: {formatDate(assignment.end_time.toISOString())}</Badge>
                                <Separator />
                            </div>
                        </SheetHeader>
                        <div className="flex-grow grid gap-4 mb-4">
                            <div>
                                <h1 className="pt-[10px] pb-[10px]">
                                    Intrucciones:
                                </h1>
                                <SheetDescription>
                                    {assignment.instrucciones}
                                </SheetDescription>
                            </div>
                            {userRole === "Estudiante" && !isTaskSubmitted && (
                                <>
                                    <input
                                        type="file"
                                        ref={fileInput}
                                        onChange={handleFileChange}
                                        style={{ display: 'none' }}
                                    />
                                    <Button
                                        variant="outline"
                                        style={{ backgroundColor: 'white' }}
                                        onClick={() => fileInput.current?.click()}
                                    >
                                        <UploadIcon className="mr-2 h-4 w-4" />
                                        {fileKey !== null ? "Archivo Cargado" : "Subir Archivo"}
                                    </Button>
                                </>
                            )}
                        </div>
                        <div className="flex items-center">
                            <Label className="text-2xl text-right">
                                Valor:
                            </Label>
                            <Badge className="ml-2" style={{ backgroundColor: 'green' }}>{assignment.puntaje_asig || 0} PTS</Badge>
                        </div>
                        <div className="flex flex-col justify-end">
                            <Separator className="mt-4" />
                            {userRole === "Estudiante" && !isTaskSubmitted && (
                                <SheetClose className="h-[45px] w-full mt-4">
                                    <Button className="h-[45px] w-full" style={{ backgroundColor: 'green' }} onClick={handleEntregar}>Entregar</Button>
                                </SheetClose>
                            )}
                            <SheetClose className="h-[45px] w-full mt-4">
                                <Button className="h-[45px] w-full" style={{ backgroundColor: 'red' }}>
                                    {userRole === "Estudiante" && !isTaskSubmitted ? "Cancelar" : "Cerrar"}
                                </Button>
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

        </div>
    );
};

const AssignmentCard = ({ cursoId, userRole }: any) => {
    const [assignments, setAssignments] = useState<{
        curso: string,
        end_time: Date,
        id: number,
        instrucciones: string | null,
        pendiente: boolean,
        puntaje_asig: number | null,
        start_time: Date,
        title: string
    }[]>([]);
    const supabase = useSupabaseClient();

    useEffect(() => {
        const fetchAssignments = async () => {
            const { data, error } = await supabase
                .from('Tareas')
                .select('*')
                .eq('curso', cursoId);

            if (error) {
                console.error('Error al cargar asignaciones:', error);
            } else {
                const assignmentsWithDates = data.map((assignment) => ({
                    ...assignment,
                    end_time: new Date(assignment.end_time),
                    start_time: new Date(assignment.start_time),
                }));
                setAssignments(assignmentsWithDates);
            }
        };

        fetchAssignments();
    }, [cursoId]); // Añade cursoId a la lista de dependencias para reaccionar a los cambios

    return (
        <div className='flex flex-col'>
            <div className='w-full h-16 bg-white flex text-center items-center p-3 border-gray-400 border-x border-y '>
                <p className='text-xl'>Tareas Pendientes</p>
            </div>
            {assignments.map((assignment) => (
                <SingleAssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    userRole={userRole}
                />
            ))}
        </div>
    );
};

export default AssignmentCard;

