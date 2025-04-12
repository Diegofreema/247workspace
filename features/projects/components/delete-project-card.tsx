'use client';
import { colors } from '@/constants';
import { useConfirm } from '@/hooks/use-confirm';
import { useProjectId } from '@/hooks/useProjectId';
import { Button, Card } from '@chakra-ui/react';
import { LuTrash2 } from 'react-icons/lu';
import { useDeleteProject } from '../api/use-delete-project';

export const DeleteProjectCard = () => {
  const { mutateAsync, isPending } = useDeleteProject();
  const projectId = useProjectId();

  const [DeleteDialog, confirmDelete] = useConfirm({
    title: 'Delete Project',
    colorPalette: 'red',
    icon: LuTrash2,
    isPending,
  });

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    mutateAsync({ param: { projectId } });
  };
  return (
    <>
      <DeleteDialog />
      <Card.Root bg={colors.white} boxShadow={'md'}>
        <Card.Body gap="2">
          <Card.Title
            mt="2"
            fontWeight={'bolder'}
            fontSize={20}
            color={colors.black}
            display={'flex'}
          >
            Danger zone
          </Card.Title>
          <Card.Description>
            Deleting a project is irreversible and will remove all associated
            data permanently
          </Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button
            bg={colors.red}
            onClick={handleDelete}
            disabled={isPending}
            loading={isPending}
            width={'fit-content'}
            px={2}
          >
            Delete
          </Button>
        </Card.Footer>
      </Card.Root>
    </>
  );
};
