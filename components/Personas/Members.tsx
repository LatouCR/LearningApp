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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input";

interface MembersProps {
    cursoId: string;
}

interface UserInfo {
    id: string,
    nombre_completo: string | null,
    role: string
}

const Members: React.FC<MembersProps> = ({ cursoId }) => {
    const [members, setMembers] = useState<UserInfo[]>([]);
    const [searchTerm, setSearchTerm] = useState("");    
    const [selectedRole, setSelectedRole] = useState("todos");
    const supabase = useSupabaseClient();

    const fetchMembers = async () => {
        // Obtener todos los usuarios
        const { data: allUsuarios, error: usuariosError } = await supabase
            .from('Usuarios')
            .select('id, nombre_completo, role');
        console.log('Todos los Usuarios:', allUsuarios); // Depuración

        if (usuariosError || !allUsuarios) {
            console.error('Error al obtener usuarios:', usuariosError);
            return;
        }

        // Obtener los ids de los estudiantes del curso
        const { data: estudiantesCurso, error: estudiantesError } = await supabase
            .from('Matriculas')
            .select('estudiante_id')
            .eq('curso', cursoId);
        console.log('Estudiantes del Curso:', estudiantesCurso); // Depuración

        if (estudiantesError || !estudiantesCurso) {
            console.error('Error al obtener matrículas:', estudiantesError);
            return;
        }

        // Filtrar los usuarios que están en el curso
        const filteredMembers = allUsuarios.filter(user => 
            estudiantesCurso.some(estudiante => estudiante.estudiante_id === user.id));
        console.log('Miembros Filtrados:', filteredMembers); // Depuración

        setMembers(filteredMembers);
    };

    useEffect(() => {
        fetchMembers();
    }, [cursoId]);

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const handleRoleChange = (value: any) => {
        setSelectedRole(value); // Actualizar el estado basado en la selección del menú desplegable
    };

    
    // Filtro de miembros basado en la búsqueda y el rol seleccionado
    const filteredMembers = members?.filter(member => {
        const matchesSearch = searchTerm === "" || member.nombre_completo?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === "todos" || member.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div>
            <div className="flex justify-end w-1/2 ml-auto">
                <Input 
                    className="mr-2 justify-end" 
                    style={{backgroundColor: "white"}} 
                    placeholder="Buscar..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="mr-2 justify-end" 
                    style={{backgroundColor: "white"}} variant="outline">Filtrar</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Role</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={selectedRole} onValueChange={handleRoleChange}>
                            <DropdownMenuRadioItem value="todos">Todos</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Estudiante">Estudiantes</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Profesor">Profesor</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50%]">Nombre del integrante</TableHead>
                        <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredMembers.length > 0 ? (
                        filteredMembers.map(member => (
                            <TableRow key={member.id}>
                                <TableCell className="font-medium">{member.nombre_completo}</TableCell>
                                <TableCell className="text-right">{member.role}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell className="font-medium" colSpan={2}>No hay integrantes</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default Members;

