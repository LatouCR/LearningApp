import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import createSupabaseServerClient from "@/lib/supabase/server";
import ProfileImageHandler from "@/components/ProfileImageHandler";

export default async function name() {
    const supabase = await createSupabaseServerClient()
    const response = await supabase.auth.getUser()
    if (!response.data.user) {
        console.error('No user found');
        return;
    }

    const user = response.data.user;

    const { data } = await supabase
        .from('Usuarios')
        .select('*')
        .eq('id', user.id)
        .single();

    let profilePic = data?.profile_pic


    return (
        <div className="inline-flex items-center w-full mt-auto p-4">
            <Avatar className="border border-white w-11 h-11">
                <ProfileImageHandler profilePicPath={profilePic || undefined} />
            </Avatar>

            <div className="px-4     text-white">
                {data?.nombre_completo?.split(" ").slice(0, 2).join(" ")}
            </div>
        </div>
    )


}