import { SizeType } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

type Props = {
  image?: string;
  name: string;
  size?: SizeType;
};

export const WorkspaceAvatar = ({ name, image, size = 'md' }: Props) => {
  return (
    <Avatar className="bg-purple">
      <AvatarImage src={image} alt="profile image" />
      <AvatarFallback className="bg-purple text-white">
        {name[0]?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};
