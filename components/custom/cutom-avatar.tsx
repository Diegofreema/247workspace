import { Avatar } from '@chakra-ui/react';

type Props = {
  src?: string;
  name: string;
};
export const CustomAvatar = ({ name, src }: Props) => {
  return (
    <Avatar.Root>
      <Avatar.Fallback name={name} />
      <Avatar.Image src={src} />
    </Avatar.Root>
  );
};
