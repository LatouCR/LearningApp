"use client"
import React, { useEffect, useState, useRef } from 'react';
import useSupabaseClient from '@/lib/supabase/client';
import { UploadIcon, Eye, ScrollText } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetClose, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";


interface CursoProp {
    cursoId: string;
}


const MaterialCard: React.FC<CursoProp> = ({ cursoId }) => {
    const { toast } = useToast();
    const supabase = useSupabaseClient();
    const [userRole, setUserRole] = useState('');

    const [materiales, setMateriales] = useState<{
        id: number,
        Title: string,
        curso: string,
        date: Date,
        descripcion: string
    }[]>([]);

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

        const fetchAssignments = async () => {
            const { data, error } = await supabase
                .from('Material')
                .select('*')
                .eq('curso', cursoId);

            if (error) {
                console.error('Error al cargar materiales:', error);
            } else {
                const materialesWithDate = data.map((material) => ({
                    ...material,
                    date: new Date(material.date),
                }));
                setMateriales(materialesWithDate);
            }
        };

        fetchAssignments();

        fetchUserRole();
    }, [supabase, cursoId]);

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Fecha no definida'; // O cualquier otro valor por defecto
        return format(parseISO(dateString), 'dd/MM/yyyy');
    };



    return (
        <div>
            {materiales.map((material) => (
                <div key={material.id} className="w-full h-16 bg-white flex border-x border-spacing-0 border-b border-gray-400 p-3">
                    <div className="w-auto flex items-center pr-4 justify-start">
                        <ScrollText size={38} strokeWidth={1.3} />
                    </div>
                    <div className="w-auto flex flex-col justify-center mr-auto">
                        <p className="text-lg font-medium">{material.Title}</p>
                    </div>
                    <div className="flex items-center justify-end w-auto">
                        <Sheet>
                            <SheetTrigger className="h-full w-full ">
                                <Eye className='hover:text-green-800' />
                            </SheetTrigger>
                            <SheetContent className="flex flex-col h-screen justify-between bg-white overflow-auto">
                                <SheetHeader className="flex flex-col justify-start">
                                    <div className="flex flex-col">
                                        <SheetTitle className="mb-2">{material.Title}</SheetTitle>
                                    </div>
                                </SheetHeader>
                                <div className="flex-grow grid gap-4 mb-4">
                                    <div>
                                        <h1 className="pt-[10px] pb-[10px]">
                                            Intrucciones:
                                        </h1>
                                        <SheetDescription>
                                            {material.descripcion}
                                        </SheetDescription>
                                    </div>
                                </div>

                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MaterialCard;

