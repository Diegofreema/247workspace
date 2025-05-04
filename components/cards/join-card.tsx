'use client';
import { APP_URL } from '@/config';
import { colors } from '@/constants';
import { useProtect } from '@/features/auth/api/use-current-user';
import { useJoinWorkspace } from '@/features/workspaces/api/use-join-workspace';
import { useWorkspaceId } from '@/hooks/useWorkspaceId';
import { Card } from '@chakra-ui/react';
import { useTransitionRouter } from 'next-view-transitions';
import { useEffect } from 'react';
import { Button } from '../custom/custom-button';
import { Loading } from '../ui/loading';
import { toaster } from '../ui/toaster';

type Props = {
  name?: string;
  inviteCode?: string;
};

export const JoinCard = ({ inviteCode, name }: Props) => {
  const { data, isError, isPending: isPendingUser } = useProtect();
  // const [storedValue, , removeUrl] = useLocalStorage('redirectUrl', null);

  const { mutateAsync, isPending } = useJoinWorkspace();
  const workspaceId = useWorkspaceId();
  const router = useTransitionRouter();
  const onSubmit = async () => {
    if (!inviteCode) return;
    await mutateAsync(
      { param: { workspaceId }, json: { code: inviteCode } },
      {
        onSuccess: () => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('redirectUrl');
          }
        },
      }
    );
  };
  useEffect(() => {
    if (isPendingUser || isError) return;
    if (!data) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'redirectUrl',
          `${APP_URL}/workspace/${workspaceId}/join/${inviteCode}`
        );
      }

      toaster.create({
        title: 'Please sign in to join a workspace',
        type: 'info',
        duration: 3000,
      });
      router.replace('/signup');
    }
  }, [data, isError, router, workspaceId, isPendingUser, inviteCode]);
  if (isError) {
    throw new Error('Something went wrong');
  }
  if (isPendingUser) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col h-full justify-center">
      <Card.Root bg={colors.white} boxShadow={'lg'}>
        <Card.Body gap="2">
          <Card.Title
            mt="2"
            fontSize={20}
            fontWeight={'bold'}
            color={colors.black}
          >
            Join workspace
          </Card.Title>
          <Card.Description>
            You have been invited to join
            <span className="text-black font-bold"> {name}</span> workspace.
          </Card.Description>
        </Card.Body>
        <Card.Footer justifyContent="flex-end">
          <Button
            variant={'outline'}
            onClick={() => router.replace(`/`)}
            color={colors.black}
            width={'fit-content'}
            px={2}
          >
            Cancel
          </Button>
          <Button
            bg={colors.purple}
            onClick={onSubmit}
            disabled={isPending}
            loading={isPending}
            width={'fit-content'}
            px={2}
          >
            Join workspace
          </Button>
        </Card.Footer>
      </Card.Root>
    </div>
  );
};
