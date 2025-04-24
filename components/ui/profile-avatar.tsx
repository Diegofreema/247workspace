import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type Props = {
  imageUrl?: string;
  name: string;
  className?: string;
};

export const ProfileAvatar = ({ name, imageUrl, className }: Props) => {
  const firstLetter = name?.charAt(0)?.toUpperCase();
  const secondLetter = name?.split(' ')[1]?.charAt(0)?.toUpperCase() ?? '';
  const prefix = `${firstLetter}${secondLetter}`;
  return (
    <Avatar className={cn('bg-purple', className)}>
      <AvatarImage src={imageUrl} alt="profile image" />
      <AvatarFallback className="bg-purple text-white">{prefix}</AvatarFallback>
    </Avatar>
  );
};
