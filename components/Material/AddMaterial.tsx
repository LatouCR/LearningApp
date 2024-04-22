"use client"

import { useState, useEffect, useRef } from "react"

//components
import useSupabaseClient from "@/lib/supabase/client";

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

import { Plus, UploadIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Props {
    cursoId: string
}

const AddMaterial: React.FC<Props> = ({ cursoId }) => {

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const { toast } = useToast();
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileKey, setFileKey] = useState(''); // Estado para almacenar la clave del archivo
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

    const agregarMaterial = async () => {
        const startTime = new Date();

        const { data, error } = await supabase
            .from('Material')
            .insert([{
                Title: titulo,
                curso: cursoId,
                date: startTime.toISOString(),
                descripcion: descripcion,
                archivo_key: fileKey
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
            setDescripcion('');
        }
    };

    //Se maneja la carga/subida del archivo
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const fileName = `material/${Date.now()}-${file.name}`;
        try {
            const { error } = await supabase.storage
                .from('material')
                .upload(fileName, file);

            if (error) throw error;

            setFileKey(fileName); // Guardar la clave del archivo
            toast({
                title: "Éxito",
                description: "Archivo cargado con éxito.",
                variant: "success"
            });
        } catch (error) {
            console.error('Error subiendo el archivo:', error);
            toast({
                title: "Error",
                description: "Error al subir el archivo."
            });
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
                        <DialogTitle>Nuevo Material</DialogTitle>
                        <DialogDescription>
                            Ingrese los datos solicitados a continuación.
                        </DialogDescription>
                    </DialogHeader>
                    <Separator />

                    <div className="gap-4 flex flex-col">
                        <h1 className="font-semibold text-base">
                            Título del Material:
                        </h1>
                        <Input className="bg-white" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                        <Separator />
                    </div>

                    <div className="gap-4 flex flex-col">
                        <h1 className="font-semibold text-base">
                            Descripcion:
                        </h1>
                        <Textarea className="h-64 bg-white" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        <Separator />
                    </div>

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

                    <DialogFooter>
                        <DialogClose>
                            <Button className="bg-green-700"
                                onClick={agregarMaterial}
                            >
                                Añadir Material
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

export default AddMaterial; 