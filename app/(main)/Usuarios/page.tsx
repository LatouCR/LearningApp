'use client'
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import useSupabaseClient from '@/lib/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import ProfileImageHandler from '@/components/ProfileImageHandler'; 

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
            <section className="flex flex-col items-center justify-center h-full">
                <div className="w-48 h-48 relative">
                    <ProfileImageHandler profilePicPath={profilePic} />
                </div>
                <h1 className="mt-4 font-bold text-center text-3xl">{userInfo?.nombre_completo}</h1>
                <p className="mt-2 text-center text-xl">{userInfo?.correo}</p>
                <p className="mt-8 text-left w-full max-w-2xl font-bold text-2xl">Información general</p>
                <div className="mt-4 p-4 border rounded w-full max-w-2xl grid grid-cols-2 gap-4">
                    <div className="text-left font-bold">Nombre:</div>
                    <div className="text-left">{isEditing ? <input type="text" name="nombre_completo" value={userInfo?.nombre_completo} onChange={handleInputChange} /> : <span>{userInfo?.nombre_completo}</span>}</div>
                    <div className="text-left font-bold">Cédula del estudiante:</div>
                    <div className="text-left">{isEditing ? <input type="text" name="cedula" value={userInfo?.cedula} onChange={handleInputChange} /> : <span>{userInfo?.cedula}</span>}</div>
                    <div className="text-left font-bold">Correo:</div>
                    <div className="text-left">{isEditing ? <input type="text" name="correo" value={userInfo?.correo} onChange={handleInputChange} /> : <span>{userInfo?.correo}</span>}</div>
                    <div className="text-left font-bold">Contraseña:</div>
                    <div className="text-left">
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
                    </div>
                    <input 
                        type="file" 
                        ref={fileInput} 
                        onChange={handleProfilePicChange} 
                        style={{ display: 'none' }} 
                    />
                    {isEditing && (
                        <button 
                            className={`mt-2 self-end col-span-2 text-white bg-blue-500 rounded-full`}
                            onClick={() => fileInput.current?.click()}
                        >
                            Cambiar imagen de perfil
                        </button>
                    )}
                    <button
                        className={`mt-2 self-end col-span-2 text-white ${isEditing ? 'bg-green-500 rounded-full' : 'bg-blue-500 rounded-full'}`}
                        onClick={isEditing ? handleSave : toggleEdit}
                    >
                        {isEditing ? 'Guardar' : 'Editar'}
                    </button>

                </div>
            </section>
        </main>
    );
}