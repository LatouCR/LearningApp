"use client"
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import React from 'react';

interface NavBarProps {
    cursoId: string;
}

const NavBar: React.FC<NavBarProps> = ({ cursoId }) => {

    const pathname = usePathname()
    
    const isActive = (href: string) => {
        return pathname == href;
    }

    return (
        <nav className="w-full h-auto bg-white">
            <ul className="flex w-full py-4 px-10 items-center gap-4">
            <li className="font-normal text-gray-600 hover:text-background h-full hover:border-b-2 hover:border-background/60">
                    <Link href={`/cursos/${cursoId}`}
                        className={isActive(`/cursos/${cursoId}`) ? 'text-black' : ''}
                    >
                        Contenido
                    </Link>
                </li>
                <li className="font-normal text-gray-600 hover:text-background h-full hover:border-b-2 hover:border-background/60">
                    <Link href={`/cursos/${cursoId}/modulos`}
                        className={isActive(`/cursos/${cursoId}/modulos`) ? 'text-black' : ''}
                    >
                        Modulos
                    </Link>
                </li>
                <li className="font-normal text-gray-600 hover:text-background h-full hover:border-b-2 hover:border-background/60">
                    <Link href={`/cursos/${cursoId}/asignaciones`}
                        className={isActive(`/cursos/${cursoId}/asignaciones`) ? 'text-black' : ''}
                    >
                        Asignaciones
                    </Link>
                </li>
                <li className="font-normal text-gray-600 hover:text-background h-full hover:border-b-2 hover:border-background/60">
                    <Link href={`/cursos/${cursoId}/calificaciones`}
                        className={isActive(`/cursos/${cursoId}/calificaciones`) ? 'text-black' : ''}
                    >
                        Calificaciones
                    </Link>
                </li>
                <li className="font-normal text-gray-600 hover:text-background h-full hover:border-b-2 hover:border-background/60">
                    <Link href={`/cursos/${cursoId}/mensajes`}
                        className={isActive(`/cursos/${cursoId}/mensajes`) ? 'text-black' : ''}
                    >
                        Mensajes
                    </Link>
                </li>
                <li className="font-normal text-gray-600 hover:text-background h-full hover:border-b-2 hover:border-background/60">
                    <Link href={`/cursos/${cursoId}/personas`}
                        className={isActive(`/cursos/${cursoId}/personas`) ? 'text-black' : ''}
                    >
                        Personas
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;