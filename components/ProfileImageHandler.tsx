import Image from 'next/image';

interface ProfileImageHandlerProps {
  profilePicPath: string | undefined;
}

const ProfileImageHandler: React.FC<ProfileImageHandlerProps> = ({ profilePicPath }) => {
  const profileImageUrl = profilePicPath
    ? `https://atjodkaqjaniyvdclncw.supabase.co/storage/v1/object/public/profile_pic/${profilePicPath}`
    : '/default-profile-pic.png'; // Use a default profile picture if profilePicPath is undefined

  return (
    <img
    src={profileImageUrl}
    alt="Profile Picture"
    className="rounded-full h-auto w-auto"
/>
  );
};

export default ProfileImageHandler;