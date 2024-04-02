'use client'

import React, { useState, useEffect } from 'react';
import profilePicPlaceholder from '@/public/default_profile_avatar.png';
import useSupabaseClient from '@/lib/supabase/client';

type ProfileImageHandlerProps = {
    profilePicPath?: string;
};

const ProfileImageHandler: React.FC<ProfileImageHandlerProps> = ({ profilePicPath }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const supabase = useSupabaseClient();

    useEffect(() => {
        if (profilePicPath) {
            setImageUrl(`https://atjodkaqjaniyvdclncw.supabase.co/storage/v1/object/public/profile_pic/${profilePicPath}`);
        } else {
            setImageUrl(profilePicPlaceholder.src);
        }
    
        setIsLoading(false);
    }, [profilePicPath]);
    

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-48 h-48 relative flex items-center justify-center">
            <img
                src={imageUrl}
                alt="Profile Picture"
                className="rounded-full"
            />
        </div>
    );
};

export default ProfileImageHandler;
