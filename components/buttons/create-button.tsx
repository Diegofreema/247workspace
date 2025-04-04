'use client';
import { colors } from '@/constants';
import { ButtonProps } from '@chakra-ui/react';
import { Button } from '../custom/custom-button';

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
  return (
    <Button {...props} bg={bg} px={2}>
      {Icon && Icon} {text && text}
    </Button>
  );
};
