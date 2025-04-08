'use client';
import { colors } from '@/constants';

import { useUpdateWorkspaceInviteCode } from '@/features/workspaces/api/use-update-workspace-invite-code';
import { useConfirm } from '@/hooks/use-confirm';
import { Button, Card, IconButton, Input } from '@chakra-ui/react';
import { IconCopy, IconRestore } from '@tabler/icons-react';
import { toaster } from '../ui/toaster';

type Props = {
  inviteCode: string;
  workspaceId: string;
};

export const InviteCodeCard = ({ inviteCode, workspaceId }: Props) => {
  const { mutateAsync, isPending } = useUpdateWorkspaceInviteCode();

  const [ResetDialog, confirmReset] = useConfirm({
    title: 'Reset invite link',
    icon: IconRestore,
    isPending,
  });

  const handleReset = async () => {
    const ok = await confirmReset();
    if (!ok) return;
    mutateAsync({ param: { workspaceId } });
  };
  const fullInviteLink = `${window.location.origin}/workspace/${workspaceId}/join/${inviteCode}`;

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(fullInviteLink)
      .then(() => {
        toaster.create({
          title: 'Invite link copied!',
          type: 'info',
        });
      })
      .catch(() => {
        toaster.create({
          title: 'Failed to copy invite link!',
          type: 'info',
        });
      });
  };

  return (
    <>
      <ResetDialog />
      <Card.Root bg={colors.white} boxShadow={'lg'}>
        <Card.Body gap="2">
          <Card.Title
            mt="2"
            fontSize={20}
            fontWeight={'bold'}
            color={colors.black}
          >
            Invite link
          </Card.Title>
          <Card.Description>
            Use this invite to add members to your workspace.
          </Card.Description>
          <div className="w-full flex items-center">
            <Input
              flex={1}
              disabled
              border={0}
              color={colors.grey}
              value={fullInviteLink}
            />
            <IconButton onClick={copyToClipboard}>
              <IconCopy color={colors.iconGrey} />
            </IconButton>
          </div>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button
            bg={colors.red}
            onClick={handleReset}
            disabled={isPending}
            loading={isPending}
            width={'fit-content'}
            px={2}
          >
            Reset
          </Button>
        </Card.Footer>
      </Card.Root>
    </>
  );
};
