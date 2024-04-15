import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import createSupabaseServerClient from "@/lib/supabase/server";
import ProfileImageHandler from "@/components/ProfileImageHandler";
import { cn } from "@/lib/utils"

type ComponentProps = {
    className?: string
}

export default async function User({className}: ComponentProps) {
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
        <div className="inline-flex items-center w-full mt-auto">
            <Avatar className={cn("max-w-16 max-h-16", className)}>
                <ProfileImageHandler profilePicPath={profilePic || undefined} />
            </Avatar>

            <div className="px-4 text-inherit">
                {data?.nombre_completo?.split(" ").slice(0, 2).join(" ")}
            </div>
        </div>
    )


}