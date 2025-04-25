'use client';
import { colors } from '@/constants';
import { ButtonProps } from '@chakra-ui/react';
import { Button } from '../custom/custom-button';

type Props = ButtonProps & {
  text?: string;

  icon?: any;
  onClick: () => void;
};
export const CreateButton = ({
  icon: Icon,
  bg = colors.purple,
  onClick,
  text,
  ...props
}: Props) => {
  return (
    <Button {...props} bg={bg} px={2} onClick={onClick}>
      {Icon && Icon} {text && text}
    </Button>
  );
};
