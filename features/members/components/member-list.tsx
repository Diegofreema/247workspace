'use client';
import { Box } from '@chakra-ui/react';

import { colors } from '@/constants';

// import { Loading } from '@/components/ui/loading';
// import { useWorkspaceId } from '@/hooks/useWorkspaceId';
// import { useGetMembers } from '../api/use-get-members';
import { Member } from './member';

export const MemberList = () => {
  // const workspaceId = useWorkspaceId();
  // const { data, isPending, isError } = useGetMembers({ workspaceId });
  // if (isError) return <Box>Failed to load members</Box>;
  // if (isPending) return <Loading />;

  // console.log(data);

  return (
    <Box bg={colors.white} p={4} flex={1} minHeight={'88vh'}>
      <Member />
    </Box>
  );
};
