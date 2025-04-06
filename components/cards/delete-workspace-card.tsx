'use client';
import { colors } from '@/constants';
import { useDeleteWorkspace } from '@/features/workspaces/api/use-delete-workspace';
import { Button, Card } from '@chakra-ui/react';

export const DeleteWorkspaceCard = () => {
  const { mutateAsync } = useDeleteWorkspace();
  return (
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
        <Button bg={colors.red} onClick={() => {}} width={'fit-content'} px={2}>
          Delete
        </Button>
      </Card.Footer>
    </Card.Root>
  );
};
