import createSupabaseServerClient from '@/lib/supabase/server';
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Button } from "./ui/button";


const CerrarSesion = async () => {
    const logout = async () => {
        "use server"
        const supabase = await createSupabaseServerClient();
        await supabase.auth.signOut();
        redirect("/logIn");
    };

    return (
        <form action={logout}>
            <Button 
                className='bg-transparent gap-2 inline-flex justify-start py-2 px-2 w-full items-start hover:bg-transparent'>
                <LogOut size={28}/>
                <h1 className="font-light text-base">
                    Cerrar Sesion
                </h1>                
            </Button>
        </form>
    )
}

export default CerrarSesion