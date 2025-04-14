import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  imageUrl?: string;
  name: string;
};

export const ProfileAvatar = ({ name, imageUrl }: Props) => {
  const firstLetter = name?.charAt(0)?.toUpperCase();
  const secondLetter = name?.split(' ')[1]?.charAt(0)?.toUpperCase() ?? '';
  const prefix = `${firstLetter}${secondLetter}`;
  return (
    <Avatar className="bg-purple">
      <AvatarImage src={imageUrl} alt="profile image" />
      <AvatarFallback className="bg-purple text-white">{prefix}</AvatarFallback>
    </Avatar>
  );
};
