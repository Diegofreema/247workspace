'use client';
import { colors } from '@/constants';
import { Button } from '../custom/custom-button';
import { ButtonProps } from '@chakra-ui/react';
import { createProjectModal$ } from '@/lib/legend/create-project-modal';

type Props = ButtonProps & {};
export const CreateProject = ({ ...props }: Props) => {
  return (
    <Button
      {...props}
      bg={colors.purple}
      px={2}
      onClick={() => createProjectModal$.setOpen(true)}
    >
      Create a project
    </Button>
  );
};
