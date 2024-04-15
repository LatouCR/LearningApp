"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import useSupabaseClient from '@/lib/supabase/client';

interface ReclamoItemProps {
    tareaId: number;
}

const ReclamoBtn = ({ tareaId }: ReclamoItemProps) => {
    const supabase = useSupabaseClient();
    const [comentarioEst, setComentarioEst] = useState('');
    const [comentarioProf, setComentarioProf] = useState('');
    const [userRole, setUserRole] = useState('');
    const [reclamoOpen, setReclamoOpen] = useState(false);
    const [reclamoClosed, setReclamoClosed] = useState(false);

    // Cargar el rol del usuario y estado de reclamo al montar el componente
    useEffect(() => {
        const fetchData = async () => {
            const userResponse = await supabase.auth.getUser();
            if (!userResponse.error) {
                const user = userResponse.data.user;
                const { data: userData, error: userError } = await supabase
                    .from('Usuarios')
                    .select('role')
                    .eq('id', user.id)
                    .single();

                if (!userError && userData) {
                    setUserRole(userData.role);
                }
            }

            const tareaResponse = await supabase
                .from('RegistroTareas')
                .select('reclamo_open, comentario_est, comentario_prof, reclamo_closed')
                .eq('id', tareaId)
                .single();

            if (!tareaResponse.error) {
                setReclamoOpen(tareaResponse.data.reclamo_open);
                setComentarioEst(tareaResponse.data.comentario_est || '');
                setComentarioProf(tareaResponse.data.comentario_prof || '');
                setReclamoClosed(tareaResponse.data.reclamo_closed);
            }
        };

        fetchData();
    }, [supabase, tareaId]);

    const enviarReclamo = async () => {
        if (userRole === 'Estudiante' && !reclamoOpen) {
            const { error } = await supabase
                .from('RegistroTareas')
                .update({ comentario_est: comentarioEst, reclamo_open: true })
                .match({ id: tareaId });

            if (error) {
                console.error('Error enviando el reclamo:', error);
            } else {
                alert('Reclamo enviado exitosamente.');
            }
        }
    };

    const responderReclamo = async () => {
        if (userRole === 'Profesor' && reclamoOpen) {
            const { error } = await supabase
                .from('RegistroTareas')
                .update({ comentario_prof: comentarioProf, reclamo_closed: true })
                .match({ id: tareaId });

            if (error) {
                console.error('Error respondiendo al reclamo:', error);
            } else {
                alert('Respuesta enviada exitosamente.');
            }
        }
    };

    return (
        <div>
            {((userRole === 'Estudiante') || (userRole === 'Profesor' && reclamoOpen)) && (
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="destructive">Reclamo</Button>
                    </SheetTrigger>
                    <SheetContent className="justify-between bg-white overflow-auto">
                        <SheetHeader>
                            <SheetTitle>Reclamo para la Tarea</SheetTitle>
                            <SheetDescription>
                                A continuación, podrás dejar tu reclamo sobre la calificación de esta asignación.
                            </SheetDescription>
                            <Separator />
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            {userRole === 'Estudiante' && !reclamoOpen && (
                                <div className="grid grid-cols-1 items-center gap-4">
                                    <Label className="text-left">
                                        Deja aquí tu comentario:
                                    </Label>
                                    <Textarea 
                                        className="h-[300px]"
                                        style={{backgroundColor: 'white'}}
                                        value={comentarioEst}
                                        onChange={(e) => setComentarioEst(e.target.value)}
                                    />
                                </div>
                            )}
                            {userRole === 'Estudiante' && reclamoOpen && (
                                <div className="grid grid-cols-1 items-center gap-4">
                                    <Label className="text-left">
                                        Comentario del estudiante:
                                    </Label>
                                    <Label className="text-right mt-2 text-gray-500">
                                        {comentarioEst}
                                    </Label>
                                    <Label className="text-left">
                                        Comentario del profesor:
                                    </Label>
                                    <Label className="text-right mt-2 text-gray-500">
                                        {comentarioProf || "Tu reclamo aun esta siendo revisado"}
                                    </Label>
                                </div>
                            )}
                            {userRole === 'Profesor' && reclamoOpen && !reclamoClosed &&  (
                                <div className="grid grid-cols-1 items-center gap-4">
                                    <Label className="text-left">
                                        Comentario del estudiante: 
                                    </Label>
                                    <Label className="text-right mt-2 text-gray-500">
                                        {comentarioEst}
                                    </Label>
                                    <Label className="text-left">
                                        Responde al reclamo aquí:
                                    </Label>
                                    <Textarea 
                                        className="h-[300px]"
                                        style={{backgroundColor: 'white'}}
                                        value={comentarioProf}
                                        onChange={(e) => setComentarioProf(e.target.value)}
                                    />
                                    
                                </div>
                            )}
                            {userRole === 'Profesor' && reclamoOpen && reclamoClosed && (
                                <div className="grid grid-cols-1 items-center gap-4">
                                    <Label className="text-left">
                                        Comentario del estudiante:
                                    </Label>
                                    <Label className="text-right mt-2 text-gray-500">
                                        {comentarioEst}
                                    </Label>
                                    <Label className="text-left">
                                        Comentario del profesor:
                                    </Label>
                                    <Label className="text-right mt-2 text-gray-500">
                                        {comentarioProf}
                                    </Label>
                                </div>
                            )}
                        </div>
                        <SheetFooter>
                            <SheetClose>
                                {userRole === 'Estudiante' && !reclamoOpen && !reclamoClosed && (
                                    <Button onClick={enviarReclamo} className="mr-2">Enviar</Button>
                                )}
                                {userRole === 'Profesor' && reclamoOpen && !reclamoClosed &&  (
                                    <Button onClick={responderReclamo} className="mr-2">Contestar</Button>
                                )}
                                <Button className="mt-2" variant="destructive">Cerrar</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
            )}
        </div>
    );
};

export default ReclamoBtn;
