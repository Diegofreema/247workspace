'use client';
import { colors } from '@/constants';
import { Button } from '../custom/custom-button';
import { ButtonProps } from '@chakra-ui/react';
import { createWorkspaceModal$ } from '@/lib/legend/create-workspace-modal-store';

type Props = ButtonProps & {};
export const CreateProject = ({ ...props }: Props) => {
  return (
    <Button
      {...props}
      bg={colors.purple}
      px={2}
      onClick={() => createWorkspaceModal$.setOpen(true)}
    >
      Create a workspace
    </Button>
  );
};
