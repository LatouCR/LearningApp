import readUserSession from '@/lib/readUserSession';
import createSupabaseServerClient from '@/lib/supabase/server';
import { LogOut } from 'lucide-react';

import { Button } from "./ui/button";

import React from 'react'

const CerrarSesion = async () => {

    const logoutAction = async () => {
        'use server';
        const supabase = await createSupabaseServerClient();
        await supabase.auth.signOut();
    };

    const { data } = await readUserSession();
    return (
        <div>
            <Button 
            onClick={logoutAction}
            >
                <LogOut size={24} />
                Cerrar Sesion
                </Button>
        </div>
    )
}

export default CerrarSesion