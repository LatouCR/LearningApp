"use client"

import { useState, useEffect } from "react"

//components
import useSupabaseClient from "@/lib/supabase/client";
import DatePopover from '@/components/DatePopOver'

//shadcn 
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Props {
    cursoId: string
}

const AddAsignment: React.FC<Props> = ({ cursoId }) => {

    const [titulo, setTitulo] = useState('');
    const [instrucciones, setInstrucciones] = useState('');
    const [fechaEntrega, setFechaEntrega] = useState(new Date());
    const [puntajeAsig, setPuntajeAsig] = useState('');
    const { toast } = useToast();

    const supabase = useSupabaseClient();
    const [userRole, setUserRole] = useState('');

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

        fetchUserRole();
    }, [supabase]);

    const agregarAsignacion = async () => {
        const startTime = new Date();
        const endTime = fechaEntrega ? new Date(fechaEntrega) : new Date();
        endTime.setHours(23, 59, 59);

        const { data, error } = await supabase
            .from('Tareas')
            .insert([{
                title: titulo,
                curso: cursoId,
                start_time: startTime.toISOString(),
                end_time: endTime.toISOString(),
                instrucciones: instrucciones || null,
                puntaje_asig: puntajeAsig ? parseInt(puntajeAsig) : null,
                pendiente: true,
            }]);

        if (error) {
            console.error('Error al agregar el material:', error);
            toast({
                title: "Error al agregar el material",
                description: error.message,
                className: "text-white"
            });
        } else {
            console.log('Material añadido con éxito:', data);
            toast({
                title: "Material añadid con éxito",
                description: "La asignación fue creada correctamente.",
            });
            setTitulo('');
            setInstrucciones('');
            setFechaEntrega(new Date());
            setPuntajeAsig('');
        }
    };

    return (
        <>
            <Dialog>
                {(userRole === "Profesor") && (
                    <DialogTrigger>
                        <Button
                            className="h-7 bg-background rounded-none inline-flex gap-1 px-4 py-5"
                        >
                            <p className="text-sm text-white">Agregar</p>
                            <Plus size={14} color="white" />
                        </Button>
                    </DialogTrigger>
                )}
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Nueva Asignación</DialogTitle>
                        <DialogDescription>
                            Ingrese los datos solicitados a continuación.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />

                    <div className="gap-4 flex flex-col">
                        <h1 className="font-semibold text-base">
                            Título de la asignación:
                        </h1>
                        <Input className="bg-white" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        <Separator />
                    </div>

                    <div className="gap-4 flex flex-col">
                        <h1 className="font-semibold text-base">
                            Instrucciones:
                        </h1>
                        <Textarea className="h-64 bg-white" value={instrucciones} onChange={(e) => setInstrucciones(e.target.value)} />
                        <Separator />
                    </div>

                    <div className="Date">
                        <h1 className="font-semibold text-base">
                            Fecha de entrega:
                        </h1>
                        <DatePopover selectedDate={fechaEntrega} setSelectedDate={setFechaEntrega} />
                        <Separator />
                    </div>

                    <div className="gap-4 flex flex-col">
                        <h1 className="font-semibold text-base">
                            Puntaje total:
                        </h1>
                        <Input className="bg-white" type="number" value={puntajeAsig} onChange={(e) => setPuntajeAsig(e.target.value)} />
                    </div>

                    <DialogFooter>
                        <DialogClose>
                            <Button className="bg-green-700"
                                onClick={agregarAsignacion}
                            >
                                Crear Asignación
                            </Button>
                        </DialogClose>
                        <DialogClose>
                            <Button variant={'destructive'}>
                                Cancelar
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddAsignment;