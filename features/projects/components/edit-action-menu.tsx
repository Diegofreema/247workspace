'use client';
import { ConfirmDialog } from '@/components/modals/confirm-dialog';
import { colors } from '@/constants';
import { useProjectId } from '@/hooks/useProjectId';
import { Button, Menu, Portal } from '@chakra-ui/react';
import {
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconUsers,
} from '@tabler/icons-react';
import { useTransitionRouter } from 'next-view-transitions';
import { useState } from 'react';
import { useDeleteProject } from '../api/use-delete-project';

type Props = {
  link: string;
};

export const EditActionMenu = ({ link }: Props) => {
  const router = useTransitionRouter();
  const [isOpen, setIsOpen] = useState(false);
  const projectId = useProjectId();
  const { mutateAsync, isPending } = useDeleteProject();

  const onNavigate = () => {
    router.push(link);
  };

  const onDelete = async () => {
    mutateAsync(
      { param: { projectId } },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };
  return (
    <>
      <ConfirmDialog
        confirmButtonText="Delete"
        isSubmitting={isPending}
        onCancel={() => setIsOpen(false)}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={onDelete}
        title="Delete Project"
        subtitle="Are you sure you want to delete this project?, this action cannot be undone"
      />
      <Menu.Root>
        <Menu.Trigger asChild>
          <Button variant="outline" size="md" disabled={isPending}>
            <IconDotsVertical color={colors.iconGrey} size={35} />
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content bg={colors.white}>
              <Menu.Item
                value="edit"
                color={colors.black}
                disabled={isPending}
                onClick={onNavigate}
              >
                <IconEdit /> Edit Project
              </Menu.Item>
              <Menu.Item
                value="manage"
                color={colors.black}
                disabled={isPending}
              >
                <IconUsers /> Manage members
              </Menu.Item>
              <Menu.Item
                value="delete"
                color={colors.red}
                disabled={isPending}
                onClick={() => setIsOpen(true)}
              >
                <IconTrash /> Delete Project
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </>
  );
};
