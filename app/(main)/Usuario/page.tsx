'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import profilePicPlaceholder from '@/public/default_profile_avatar.png'; 

export default function Page() {
    const [profilePic, setProfilePic] = useState(profilePicPlaceholder);
    const [userInfo, setUserInfo] = useState({ name: "nombre_estudiante", email: "correo@email", studentId: "placeholder", password: "placeholder" });
    const [isEditing, setIsEditing] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
    };
    return (
        <main>
            <section className="flex flex-col items-center justify-center h-screen">
                <div className="w-48 h-48 relative">
                    <Image src={profilePic} alt="Profile" layout="fill" objectFit="cover" className="rounded-full" />
                </div>
                <h1 className="mt-4 font-bold text-center text-3xl">{userInfo.name}</h1>
                <p className="mt-2 text-center text-xl">{userInfo.email}</p>
                <p className="mt-8 text-left w-full max-w-2xl font-bold text-2xl">Información general</p>
                <div className="mt-4 p-4 border rounded w-full max-w-2xl grid grid-cols-2 gap-4">
                    <div className="text-left font-bold">Nombre:</div>
                    <div className="text-left">{isEditing ? <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} /> : <span>{userInfo.name}</span>}</div>
                    <div className="text-left font-bold">ID del estudiante:</div>
                    <div className="text-left">{isEditing ? <input type="text" name="studentId" value={userInfo.studentId} onChange={handleInputChange} /> : <span>{userInfo.studentId}</span>}</div>
                    <div className="text-left font-bold">Correo:</div>
                    <div className="text-left">{isEditing ? <input type="text" name="email" value={userInfo.email} onChange={handleInputChange} /> : <span>{userInfo.email}</span>}</div>
                    <div className="text-left font-bold">Contraseña:</div>
                    <div className="text-left">
                        {isEditing ? 
                            <div>
                                <div>
                                    <input type={showPassword ? "text" : "password"} name="password" value={userInfo.password} onChange={handleInputChange} />
                                </div>
                                <div>
                                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword(!showPassword)} /> Mostrar contraseña
                                </div>
                            </div>
                            : 
                            <span>******</span>
                        }
                    </div>
                    <button className={`mt-4 self-end col-span-2 rounded-full text-white text-lg font-bold w-1/2 mx-auto ${isEditing ? 'bg-green-500' : 'bg-blue-500'}`} onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Guardar' : 'Editar'}
                    </button>
                </div>
            </section>
        </main>
    );
}