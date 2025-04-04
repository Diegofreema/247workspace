import { Avatar } from '@chakra-ui/react';
import React from 'react';

type Props = {
  image?: string;
  name: string;
};

export const WorkspaceAvatar = ({ name, image }: Props) => {
  if (image) {
    return (
      <Avatar.Root colorPalette={'purple'}>
        <Avatar.Fallback name={name[0]?.toUpperCase()} />
        <Avatar.Image src={image} />
      </Avatar.Root>
    );
  }

  return (
    <Avatar.Root colorPalette={'purple'}>
      <Avatar.Fallback name={name[0]?.toUpperCase()} />
    </Avatar.Root>
  );
};
