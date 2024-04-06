"use client"
import React, { useEffect, useState } from 'react';
import useSupabaseClient from '@/lib/supabase/client';
import { Button } from "@/components/ui/button"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"

interface GroupProps {
    cursoId: string;
}

interface GroupInfo {
    id: string,
    nombre_completo: string | null,
    role: string
    nombreGrupo: string | null,
    grupo_id: string | null
}

interface GruopInterface {
    grupo_id: string,
    nombreGrupo: string,
    curso: string,
}

const Groups: React.FC<GroupProps> = ({ cursoId }) => {
    const [members, setMembers] = useState<GroupInfo[]>([]);
    const supabase = useSupabaseClient();
    const [groupName, setGroupName] = useState('');
    const [groups, setGroups] = useState<GruopInterface[]>([]); 
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const fetchUserRole = async () => {
            const response = await supabase.auth.getUser();
            if (response.data) {
                const user = response.data.user;
                if (user) {
                    const { data, error } = await supabase
                        .from('Usuarios')
                        .select('role')
                        .eq('id', user.id)
                        .single();

                    if (!error && data) {
                        setUserRole(data.role);
                    }
                }
            }
        };

        fetchUserRole();
        fetchGroupsAndMembers();
    }, [supabase, cursoId]);
   

    const handleGroupNameChange = (event: any) => {
        setGroupName(event.target.value);
    };

    const createGroup = async () => {
        if (!groupName.trim()) {
            console.error('El nombre del grupo no puede estar vacío.');
            return;
        }
        try {
            const { data, error } = await supabase
                .from('Grupos')
                .insert([{ nombreGrupo: groupName, curso: cursoId }]);
            
            if (error) throw error;

            console.log('Grupo creado:', data);
            setGroupName(''); // Limpiar el campo después de la creación
            // Puedes agregar aquí acciones adicionales, como actualizar una lista de grupos
        } catch (error) {
            console.error('Error al crear el grupo:', error);
        }
    };

    const fetchMembers = async () => {
        const { data: allUsuarios, error: usuariosError } = await supabase
          .from('Usuarios')
          .select('id, nombre_completo, role');
      
        if (usuariosError || !allUsuarios) {
          console.error('Error al obtener usuarios:', usuariosError);
          return;
        }
      
        const { data: estudiantesCurso, error: estudiantesError } = await supabase
          .from('Matriculas')
          .select('estudiante_id')
          .eq('curso', cursoId);
      
        if (estudiantesError || !estudiantesCurso) {
          console.error('Error al obtener matrículas:', estudiantesError);
          return;
        }
      
        // Filtrar los usuarios que están en el curso
        const filteredMembers = allUsuarios.filter(user =>
          estudiantesCurso.some(estudiante => estudiante.estudiante_id === user.id)
        ).map(user => ({
          id: user.id,
          nombre_completo: user.nombre_completo || "",
          role: user.role,
          nombreGrupo: null,
          grupo_id: null,
          student_id: user.id,
        }));
      
        setMembers(filteredMembers);
      };

      const fetchGroupsAndMembers = async () => {
        try {
          const { data: groupsData, error: groupsError } = await supabase
            .from('Grupos')
            .select('*')
            .eq('curso', cursoId);
      
          if (groupsError) throw groupsError;
      
          const { data: allUsuarios, error: usuariosError } = await supabase
            .from('Usuarios')
            .select('id, nombre_completo, role');
      
          if (usuariosError) throw usuariosError;
      
          const { data: matriculaData, error: matriculaError } = await supabase
            .from('Matriculas')
            .select('estudiante_id, grupo_id')
            .eq('curso', cursoId);
      
          if (matriculaError) throw matriculaError;
      
          const membersWithGroup = allUsuarios.map(user => {
            const matricula = matriculaData.find(m => m.estudiante_id === user.id);
            return {
              id: user.id,
              nombre_completo: user.nombre_completo,
              role: user.role,
              nombreGrupo: null,
              grupo_id: matricula ? matricula.grupo_id : null,
              student_id: user.id,
            };
          }).filter(member => member.role === "Estudiante" && matriculaData.some(m => m.estudiante_id === member.id));
      
          setMembers(membersWithGroup);
          setGroups(groupsData);
        } catch (error) {
          console.error('Error al cargar grupos y miembros:', error);
        }
      };

      const addToGroup = async ( studentId: string, groupId: string) => {
        try {
            const { error } = await supabase
                .from('Matriculas')
                .update({ grupo_id: groupId})
                .eq('estudiante_id', studentId);
            
            if (error) throw error;
        
            console.log(`Usuario ${studentId} agregado al grupo ${groupId}`);
            
            fetchMembers();
        } catch (error) {
            console.error('Error al agregar al grupo:', error);
        }
    };
    const removeFromGroup = async (studentId : string) => {
        try {
            const { error } = await supabase
                .from('Matriculas')
                .update({ grupo_id: null }) // Estableciendo el grupo_id a null
                .eq('estudiante_id', studentId);
            
            if (error) throw error;
    
            console.log(`Usuario ${studentId} removido del grupo`);
            
            // Actualizar la lista de miembros para reflejar el cambio
            fetchMembers();
        } catch (error) {
            console.error('Error al remover del grupo:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-end w-1/2 ml-auto">
                <Dialog>
                    <DialogTrigger asChild>
                        {(userRole === "Profesor" || userRole === "user") && (
                            <Button variant="outline" 
                                className="mr-2 justify-end text-white bg-green-800"                                
                                >Crear Grupo
                            </Button>
                        )}
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]
                         bg-white">
                        <DialogHeader>
                        <DialogTitle>Crear grupo</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nombre del grupo
                                </Label>
                                <Input
                                    id="name"
                                    className="col-span-3"
                                    style={{backgroundColor: "white"}}
                                    value={groupName}
                                    onChange={handleGroupNameChange}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button style={{backgroundColor: "green"}} onClick={createGroup}>Crear</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>    
            </div>
            <div>
                <Accordion type="single" collapsible className="w-full">
                    {groups.map(group => (
                        <AccordionItem className="mt-2" key={group.grupo_id} value={group.grupo_id!}>
                            <AccordionTrigger>{group.nombreGrupo}</AccordionTrigger>
                            <AccordionContent>
                                <div>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                            <TableHead className="w-[50%]">Integrantes</TableHead>
                                            <TableHead className="text-right"></TableHead>
                                            <TableHead className="text-right"></TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {members.filter(member => member.role === "Estudiante" && member.grupo_id === group.grupo_id).length === 0 && (userRole !== "Profesor" && userRole !== "user") ? (
                                                <TableRow>
                                                    <TableCell colSpan={3}>No hay integrantes</TableCell>
                                                </TableRow>
                                            ) : members.filter(member => member.role === "Estudiante" && (member.grupo_id === null || member.grupo_id === group.grupo_id)).map(filteredMember => (
                                                <TableRow key={filteredMember.id}>
                                                    <TableCell>{filteredMember.nombre_completo}</TableCell>
                                                    <TableCell>
                                                        {(userRole === "Profesor" || userRole === "user") && filteredMember.grupo_id === null && (
                                                            <Button className="w-[100%]" style={{backgroundColor: "green"}} onClick={() => addToGroup(filteredMember.id, group.grupo_id!)}>Agregar</Button>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {(userRole === "Profesor" || userRole === "user") && filteredMember.grupo_id === group.grupo_id && (
                                                            <Button 
                                                            className="w-[100%]" 
                                                            variant="destructive" 
                                                            onClick={() => removeFromGroup(filteredMember.id)}
                                                            >
                                                                Remover
                                                            </Button>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
};

export default Groups;

