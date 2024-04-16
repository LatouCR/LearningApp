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


interface GroupProps {
    cursoId: string;
}

interface UserInfo {
    id: string,
    nombre_completo: string | null,
    role: string
}

const Asistencia: React.FC<GroupProps> = ({ cursoId }) => {
    const [members, setMembers] = useState<UserInfo[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState("todos");
    const supabase = useSupabaseClient();
    const [selectedWeek, setSelectedWeek] = useState("Semana 1")
    const [asistencia, setAsistencia] = useState("");
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [attendanceData, setAttendanceData] = useState<
        { id: string; estado: string }[]
    >([]);

    const handleWeekChange = (value: any) => {
        setSelectedWeek(value) // Update the state based on the dropdown menu selection
    }

    const fetchMembers = async () => {
        // Obtener todos los usuarios
        const { data: allUsuarios, error: usuariosError } = await supabase
            .from('Usuarios')
            .select('id, nombre_completo, cedula, role');
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

    const handleAttendanceChange = (memberId: string, estado: string) => {
        setAttendanceData((prevData) => {
            const existingIndex = prevData.findIndex((item) => item.id === memberId);
            if (existingIndex !== -1) {
                return [
                    ...prevData.slice(0, existingIndex),
                    { id: memberId, estado },
                    ...prevData.slice(existingIndex + 1),
                ];
            } else {
                return [...prevData, { id: memberId, estado }];
            }
        });
    };

    const saveAttendance = async () => {
        try {
            for (const { id, estado } of attendanceData) {
                const { data, error } = await supabase
                    .from('Asistencia')
                    .insert({
                        nombre_completo: filteredMembers.find((m) => m.id === id)?.nombre_completo,
                        estado,
                        Semana: selectedWeek,
                    });
                if (error) {
                    console.error('Error saving attendance:', error);
                }
            }
            console.log('Attendance saved successfully');
        } catch (error) {
            console.error('Error saving attendance:', error);
        }
    };

    // Filtro de miembros basado en la búsqueda y el rol seleccionado
    const filteredMembers = members?.filter(member => {
        const matchesSearch = searchTerm === "" || member.nombre_completo?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === "todos" || member.role === selectedRole;
        return matchesSearch && matchesRole;
    });

    return (
        <div>
            <div className="flex justify-end ml-auto">
                <Input
                    className="mr-2 justify-end"
                    style={{ backgroundColor: "white" }}
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="text-white" variant="outline">
                            Semanas
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Semana 1-15</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup
                            value={selectedWeek}
                            onValueChange={handleWeekChange}
                        >
                            <DropdownMenuRadioItem value="Semana 1">Semana 1</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 2">Semana 2</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 3">Semana 3</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 4">Semana 4</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 5">Semana 5</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 6">Semana 6</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 7">Semana 7</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 8">Semana 8</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 9">Semana 9</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 10">Semana 10</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 11">Semaaa 11</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 12">Semana 12</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 13">Semana 13</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 14">Semana 14</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Semana 15">Semana 15</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Table className='my-4'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre del integrante</TableHead>
                        <TableHead colSpan={3} className='text-center'>Asistencia</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredMembers.length > 0 ? (
                        filteredMembers.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell className="font-medium">{member.nombre_completo}</TableCell>
                                <TableCell>
                                    <button
                                        className={`text-green-700 border border-green-700 hover:bg-green-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:focus:ring-green-800 dark:hover:bg-green-500`}
                                        onClick={() => handleAttendanceChange(member.id, 'Presente')}
                                    >
                                        Presente
                                    </button>
                                </TableCell>
                                <TableCell>
                                    <button
                                        className={`text-yellow-700 border border-yellow-700 hover:bg-yellow-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-yellow-500 dark:text-yellow-500 dark:hover:text-white dark:focus:ring-yellow-800 dark:hover:bg-yellow-500`}
                                        onClick={() => handleAttendanceChange(member.id, 'Tarde')}
                                    >
                                        Tarde
                                    </button>
                                </TableCell>
                                <TableCell>
                                    <button
                                        className={`text-red-700 border border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800 dark:hover:bg-red-500`}
                                        onClick={() => handleAttendanceChange(member.id, 'Ausente')}
                                    >
                                        Ausente
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell className="font-medium" colSpan={2}>
                                No hay integrantes
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            <div className='my-2 flex justify-end'>
                <Button
                    className='justify-end bg-background hover:bg-background/80'
                    onClick={saveAttendance}
                >Guardar asistencia
                </Button>
            </div>



        </div>
    );
};

export default Asistencia;

