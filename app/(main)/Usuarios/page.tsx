'use client'
import { useEffect, useState, useRef } from 'react';
import useSupabaseClient from '@/lib/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import ProfileImageHandler from '@/components/ProfileImageHandler';
import { Pencil } from 'lucide-react';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableCell, TableRow } from '@/components/ui/table';


interface UserInfo {
    id: string,
    nombre_completo: string | null,
    correo?: string | undefined,
    cedula: number | null,
    password: string
}

export default function Page() {
    const { toast } = useToast();
    const supabase = useSupabaseClient();
    const [profilePic, setProfilePic] = useState<string | undefined>(undefined);
    const [userInfo, setUserInfo] = useState<UserInfo>();
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const fileInput = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const response = await supabase.auth.getUser();
            if (response.error) {
                console.error('Error obteniendo datos del usuario:', response.error);
                return;
            }
            const user = response.data.user;

            const { data, error } = await supabase
                .from('Usuarios')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error obteniendo información del usuario:', error);
            } else {
                setUserInfo({
                    id: user.id,
                    nombre_completo: data.nombre_completo,
                    correo: data.correo,
                    cedula: data.cedula,
                    password: ''
                });
                if (data.profile_pic) {
                    setProfilePic(data.profile_pic);
                }
            }
        };

        fetchUserData();
    }, [supabase]);

    const toggleEdit = () => {
        setIsEditing(!isEditing); // Alternar el estado de edición
    };



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserInfo((prevUserInfo) => {
            if (!prevUserInfo) return undefined;

            return {
                ...prevUserInfo,
                [name]: value === '' ? null : value,
            };
        });
    };

    const handleProfilePicChange = async (event: any) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const newFileName = `profile_pics/${Date.now()}-${file.name}`;

        try {
            const { error } = await supabase.storage.from('profile_pic').upload(newFileName, file);
            if (error) throw error;

            setFileName(newFileName); // Almacenar el nombre del archivo
            toast({ title: "Éxito", description: "Imagen de perfil cargada con éxito." });
        } catch (error) {
            console.error('Error subiendo la imagen de perfil:', error);
            toast({ title: "Error", description: "Error al subir la imagen de perfil." });
        }
    };

    const handleChangePassword = async (newPassword: string) => {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) {
            console.error('Error al cambiar la contraseña:', error);
        } else {
        }
    };

    const handleSave = async () => {
        if (isEditing && userInfo) {
            const updates = {
                nombre_completo: userInfo.nombre_completo,
                correo: userInfo.correo,
                cedula: userInfo.cedula,
                profile_pic: fileName // Usar el nombre del archivo aquí
            };

            try {
                const { error } = await supabase.from('Usuarios').update(updates).eq('id', userInfo.id);
                if (error) throw error;

                console.log('Información del usuario actualizada con éxito.');
                toast({ title: "Éxito", description: "Información del usuario actualizada correctamente." });
            } catch (error) {
                console.error('Error al actualizar la información del usuario:', error);
                toast({ title: "Error", description: "No se pudo actualizar la información del usuario." });
            }

            setIsEditing(false);
        }
    };

    return (
        <main>
            <section className="flex flex-col w-screen h-auto max-w-full overflow-hidden">
                <div className="w-full bg-cover bg-center z-10 h-[105px] relative">
                    <Image src="/banner-ulacit.png" alt="Banner de ULACIT"
                        width={1720}
                        height={140}
                        quality={60}
                        className="opacity-90 blur-xl w-auto h-auto" />
                </div>

                <div className='flex items-center justify-center'>
                    <div className="w-40 h-40 rounded-full bg-slate-100 absolute z-20 mt-10 items-center justify-center flex">
                        <div className='rounded-full w-36 h-36'>
                            <Avatar className='w-full h-full border border-slate-200'>
                                <ProfileImageHandler profilePicPath={profilePic} />
                            </Avatar>
                        </div>
                    </div>

                    {isEditing &&
                        <div className='bg-white w-10 h-10 absolute z-40 rounded-full ml-28 mt-32 flex items-center justify-center'>

                            <Pencil
                                size={26}
                                className='hover:cursor-pointer hover:text-background text-gray-400'
                                onClick={() => fileInput.current?.click()}
                            />
                        </div>
                    }

                </div>
            </section>

            <section className='w-full h-full flex flex-col items-center justify-center mt-10'>
                <div className='z-20 items-center justify-center text-center flex flex-col'>
                    <h1 className="font-bold text-center text-2xl">{userInfo?.nombre_completo}</h1>
                    <span className="text-center text-lg">{userInfo?.correo}</span>
                </div>

                <div className='flex flex-col items-center justify-center max-w-4xl w-full'>

                    <h1 className='text-xl font-bold my-4'>
                        Informacion General:
                    </h1>

                    <Table className='border border-slate-200 bg-white'>
                        <TableRow className='border border-slate-300'>
                            <TableCell className='font-bold'>
                                Nombre:
                            </TableCell>
                            <TableCell>
                                {isEditing ?
                                    <input type="text" name="nombre_completo" value={userInfo?.nombre_completo} onChange={handleInputChange} />
                                    : <span>
                                        {userInfo?.nombre_completo}
                                    </span>}
                            </TableCell>
                        </TableRow>
                        <TableRow className='border border-slate-300'>
                            <TableCell className='font-bold'>
                                Cédula del estudiante:
                            </TableCell>
                            <TableCell>
                                {isEditing ?
                                    <input type="text" name="cedula" value={userInfo?.cedula} onChange={handleInputChange} /> :
                                    <span>
                                        {userInfo?.cedula}
                                    </span>}
                            </TableCell>
                        </TableRow>
                        <TableRow className='border border-slate-300'>
                            <TableCell className='font-bold'>
                                Correo:
                            </TableCell>
                            <TableCell>
                                {isEditing ?
                                    <input type="text" name="cedula" value={userInfo?.correo} onChange={handleInputChange} /> :
                                    <span>
                                        {userInfo?.correo}
                                    </span>}
                            </TableCell>
                        </TableRow>
                        <TableRow className='border border-slate-300'>
                            <TableCell className='font-bold'>
                                Contraseña:
                            </TableCell>
                            <TableCell>
                                {isEditing ?
                                    <div>
                                        <div>
                                            <input type={showPassword ? "text" : "password"} name="password" value={userInfo?.password} onChange={handleInputChange} />
                                        </div>
                                        <div>
                                            <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> Mostrar contraseña
                                        </div>
                                    </div>
                                    :
                                    <span>******</span>
                                }
                            </TableCell>
                        </TableRow>
                    </Table>
                </div>

                <input
                    type="file"
                    ref={fileInput}
                    onChange={handleProfilePicChange}
                    style={{ display: 'none' }}
                />
                <div className='flex justify-center items-center w-full'>
                    <button
                        className={`m-2 text-white ${isEditing ? 'bg-green-600 rounded-sm p-2' : 'bg-blue-600 rounded-sm p-2 w-60'}`}
                        onClick={isEditing ? handleSave : toggleEdit}
                    >
                        {isEditing ? 'Guardar' : 'Editar'}
                    </button>
                </div>



            </section>




        </main>
    );
}