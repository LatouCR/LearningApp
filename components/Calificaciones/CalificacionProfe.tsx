"use client"
import React, { useEffect, useState, useRef } from 'react';
import useSupabaseClient from '@/lib/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { ScrollText } from 'lucide-react';
import { parseISO } from 'date-fns';
import ReclamoBtn from "./ReclamoBtn";
import { ChevronsUpDown, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"

interface Tarea {
    id: number;
    title: string;
    end_time: string;
    puntaje_asig: number | null;
}

interface RegistroTarea {
    id: number;
    tarea_id: number;
    estudiante_id: string;
    fecha_entrega: string;
    pendiente: boolean;
    puntos_obtenidos: number | null;
}

interface Usuario {
    id: string;
    nombre_completo: string;
}

interface CalificacionProfeProps {
    tareasData: Tarea[];
    registroTareasData: RegistroTarea[];
}

const formatDate = (dateString: string) => {
    if (!dateString) return 'Fecha no definida';
    return format(parseISO(dateString), 'dd/MM/yyyy');
};

const CalificacionProfe: React.FC<CalificacionProfeProps> = ({ tareasData, registroTareasData }) => {
    const supabase = useSupabaseClient();
    const [estudiantes, setEstudiantes] = useState<{ [id: string]: string | null }>({});
    const [puntos, setPuntos] = useState<{ [id: number]: string | null }>({});

    const handlePuntosChange = (registroTareaId: number, value: string) => {
        setPuntos({ ...puntos, [registroTareaId]: value });
    };

    const guardarCalificacion = async (registroTareaId: number) => {
        const puntosObtenidos = puntos[registroTareaId];
        if (!puntosObtenidos || isNaN(Number(puntosObtenidos))) {
            alert("Por favor, ingrese un número válido.");
            return;
        }

        try {
            const { error } = await supabase
                .from('RegistroTareas')
                .update({ puntos_obtenidos: Number(puntosObtenidos) })
                .eq('id', registroTareaId);

            if (error) throw error;
            alert("Nota actualizada con éxito!");
            setPuntos({ ...puntos, [registroTareaId]: '' });
        } catch (error) {
            console.error('Error al actualizar la nota:', error);
            alert("Error al actualizar la nota.");
        }
    };

    useEffect(() => {
        const cargarNombresEstudiantes = async () => {
            const { data, error } = await supabase
                .from('Usuarios')
                .select('id, nombre_completo');

            if (error) {
                console.error('Error al cargar nombres de estudiantes:', error);
            } else {
                const estudianteMap = data.reduce((acc, curr) => {
                    acc[curr.id] = curr.nombre_completo;
                    return acc;
                }, {} as { [id: string]: string | null });
                setEstudiantes(estudianteMap);
            }
        };

        cargarNombresEstudiantes();
    }, [supabase]);

    return (
        <div>
            <Accordion type="single" collapsible>
                {tareasData?.map((tarea) => {
                    const registroTarea = registroTareasData?.find((rt) => rt.tarea_id === tarea.id);
                    return (
                        <AccordionItem value={`item-${tarea.id}`} key={tarea.id} className=''>
                            <AccordionTrigger className='w-full h-16 bg-[#FBFBFB] flex p-2 border-gray-400  border-x border-y'>
                                <div className='w-auto flex items-center pr-4 justify-start'>
                                    <ScrollText size={38} strokeWidth={1.3} />
                                </div>

                                <div className='w-auto flex flex-col justify-center mr-auto'>
                                        <p className='text-lg font-medium' style={{ textAlign: 'left' }}>{tarea.title}</p>
                                        <div className='flex flex-row gap-2'>
                                            <div className='text-xs leading-3 text-gray-500 flex flex-row gap-1'><p className='font-semibold'>Entrega:</p> {formatDate(tarea.end_time)}</div>
                                            <span className='text-xs font-semibold leading-3 text-gray-600'>|</span>
                                            <div>
                                                <p className='text-xs leading-3 text-gray-500 gap-0 font-semibold'>{tarea.puntaje_asig || 0} PTS</p>
                                            </div>
                                        </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Table className="w-full bg-white border-gray-400 border-x border-b">
                                    <TableHeader>
                                        <TableRow className='border-gray-400'>
                                            <TableHead>Asignacion</TableHead>
                                            <TableHead>Estudiante</TableHead>
                                            <TableHead>Fecha de Entrega</TableHead>
                                            <TableHead>Estatus</TableHead>
                                            <TableHead>Nota</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {registroTareasData
                                            ?.filter((registroTarea) => registroTarea.tarea_id === tarea.id)
                                            .map((registroTarea) => (
                                                <TableRow key={registroTarea.id}>
                                                    <TableCell>
                                                        <p className="text-lg hover:underline">{tarea.title}</p>
                                                    </TableCell>
                                                    <TableCell>
                                                        {registroTarea ? registroTarea.estudiante_id : 'No disponible'}
                                                    </TableCell>
                                                    <TableCell>
                                                        {format(new Date(registroTarea.fecha_entrega), "PPP") || "Sin Entregar"}
                                                    </TableCell>
                                                    <TableCell>
                                                        {registroTarea.pendiente === false && registroTarea.puntos_obtenidos ? (
                                                            <Badge className="bg-background">Calificado</Badge>
                                                        ) : (
                                                            <Badge className="bg-red-600">Pendiente</Badge>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="flex-row">
                                                        {registroTarea.puntos_obtenidos || 0} / {tarea.puntaje_asig}
                                                    </TableCell>
                                                    <TableCell className="flex justify-center items-center">
                                                        <Dialog>
                                                            <DialogTrigger>
                                                                <Button className="bg-blue-600 mr-2">
                                                                    {registroTarea.puntos_obtenidos === null ? 'Calificar' : 'Editar'}
                                                                </Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-[425px] bg-white">
                                                                <DialogHeader>
                                                                    <DialogTitle>Editar Nota</DialogTitle>
                                                                    <DialogDescription>
                                                                        Ingrese la nueva nota.
                                                                    </DialogDescription>
                                                                </DialogHeader>
                                                                <div className="grid gap-4 py-4">
                                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                                        <Label className="text-right">
                                                                            Puntaje obtenido:
                                                                        </Label>
                                                                        <Input
                                                                            type="number"
                                                                            className="bg-white col-span-3"
                                                                            value={puntos[registroTarea.id] || ''}
                                                                            onChange={(e) => handlePuntosChange(registroTarea.id, e.target.value)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <DialogFooter>
                                                                    <DialogClose>
                                                                        <Button onClick={() => guardarCalificacion(registroTarea.id)}>Guardar</Button>
                                                                    </DialogClose>
                                                                    <DialogClose>
                                                                        <Button variant={'destructive'}>
                                                                            Cancelar
                                                                        </Button>
                                                                    </DialogClose>
                                                                </DialogFooter>
                                                            </DialogContent>
                                                        </Dialog>
                                                        <ReclamoBtn tareaId={registroTarea.id} />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        {registroTareasData.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={6}>No se han hecho entregas de esta asignación</TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </AccordionContent>
                        </AccordionItem>
                    );
                })}
            </Accordion>
        </div>
    );
};

export default CalificacionProfe;