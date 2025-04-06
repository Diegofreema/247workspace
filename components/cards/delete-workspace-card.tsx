'use client';
import { colors } from '@/constants';
import { useDeleteWorkspace } from '@/features/workspaces/api/use-delete-workspace';
import { useConfirm } from '@/hooks/use-confirm';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { Button, Card } from '@chakra-ui/react';
import { LuTrash2 } from 'react-icons/lu';

export const DeleteWorkspaceCard = () => {
  const { mutateAsync, isPending } = useDeleteWorkspace();
  const workspaceId = useWorkspaceId();
  const [DeleteDialog, confirmDelete] = useConfirm({
    title: 'Delete Workspace',
    colorPalette: 'red',
    btnColor: colors.red,
    icon: LuTrash2,
  });

  const handleDelete = async () => {
    const ok = await confirmDelete();
    if (!ok) return;
    mutateAsync({ param: { workspaceId } });
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
            Deleting a workspace is irreversible and will remove all associated
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
