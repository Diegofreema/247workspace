'use client';
import { colors } from '@/constants';
import { Button, Menu, Portal } from '@chakra-ui/react';
import {
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconUsers,
} from '@tabler/icons-react';
import { useTransitionRouter } from 'next-view-transitions';
import { useDeleteProject } from '../api/use-delete-project';
import { useConfirm } from '@/hooks/use-confirm';
import { useProjectId } from '@/hooks/useProjectId';
import { LoadingModal } from '@/components/modals/loading-modal';

type Props = {
  link: string;
};

export const EditActionMenu = ({ link }: Props) => {
  const router = useTransitionRouter();
  const projectId = useProjectId();
  const { mutateAsync, isPending } = useDeleteProject();
  const [DeleteAction, confirm] = useConfirm({
    title: 'Delete Project',
    isPending,
    icon: IconTrash,
  });
  const onNavigate = () => {
    router.push(link);
  };

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      mutateAsync({ param: { projectId } });
    }
  };
  return (
    <>
      <LoadingModal isPending={isPending} />
      <DeleteAction />
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
                onClick={onDelete}
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
