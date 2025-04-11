'use client';
import { colors } from '@/constants';
import { ButtonProps } from '@chakra-ui/react';
import { Button } from '../custom/custom-button';
import { useCreateProjectModalController } from '@/lib/nuqs/use-create-project';

type Props = ButtonProps & {
  text?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
};
export const CreateButton = ({
  icon: Icon,
  bg = colors.purple,
  text,
  ...props
}: Props) => {
  const { open } = useCreateProjectModalController();
  return (
    <Button {...props} bg={bg} px={2} onClick={open}>
      {Icon && Icon} {text && text}
    </Button>
  );
};
