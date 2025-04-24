import { Profile } from '@/types';
import { GridItem } from '@chakra-ui/react';
import React from 'react';

type Props = {
  profile: Profile;
};

export const ProfileTracker = ({ profile }: Props) => {
  return (
    <GridItem shadow={'sm'} colSpan={{ base: 1, md: 2 }}>
      ProfileTracker
    </GridItem>
  );
};
