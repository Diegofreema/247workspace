import { SizeType } from '@/types';
import { Avatar } from '@chakra-ui/react';

type Props = {
  image?: string;
  name: string;
  size?: SizeType;
};

export const WorkspaceAvatar = ({ name, image, size = 'md' }: Props) => {
  return (
    <Avatar.Root colorPalette={'purple'} size={size}>
      <Avatar.Fallback name={name[0]?.toUpperCase()} />
      <Avatar.Image src={image} />
    </Avatar.Root>
  );
};
