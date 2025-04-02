'use client';
import { colors } from '@/constants';
import { createProjectModal$ } from '@/lib/legend/create-project-modal';
import { ButtonProps } from '@chakra-ui/react';
import { Button } from '../custom/custom-button';

type Props = ButtonProps & {
  text?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
};
export const CreateProject = ({
  icon: Icon,

  bg = colors.purple,

  text,
  ...props
}: Props) => {
  return (
    <Button
      {...props}
      bg={bg}
      px={2}
      onClick={() => createProjectModal$.setOpen(true)}
    >
      {Icon && Icon} {text && text}
    </Button>
  );
};
