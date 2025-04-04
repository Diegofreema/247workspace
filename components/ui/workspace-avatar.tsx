import { Avatar, Image } from '@chakra-ui/react';
import React from 'react';

type Props = {
  image?: string;
  name: string;
};

export const WorkspaceAvatar = ({ name, image }: Props) => {
  return (
    <Avatar.Root colorPalette={'purple'}>
      <Avatar.Fallback name={name[0]?.toUpperCase()} />
      <Avatar.Image asChild width={38} height={38}>
        <Image
          src={image}
          alt={name}
          borderRadius={200}
          width={35}
          height={35}
          objectFit={'fill'}
        />
      </Avatar.Image>
    </Avatar.Root>
  );
};
