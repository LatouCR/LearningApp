import createSupabaseServerClient from '@/lib/supabase/server';
import { LogOut } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Button } from "./ui/button";


const CerrarSesion = async () => {
    const logout = async () => {
        "use server"
        const supabase = await createSupabaseServerClient();
        await supabase.auth.signOut();
        return redirect("/");
    };

    return (
        <form action={logout}>
            <Button 
                className=' bg-transparent hover:bg-transparent gap-2 inline-flex items-center p-2'>
                <LogOut size={24}/>
                Cerrar Sesion
            </Button>
        </form>
    )
}

export default CerrarSesion