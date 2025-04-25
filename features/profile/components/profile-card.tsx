import { Profile } from '@/types';
import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { ProfileDetail } from './profile-detail';
import { ProfileTracker } from './profile-tracker';

type Props = {
  data: Profile;
};
export const ProfileCard = ({ data }: Props) => {
  return (
    <SimpleGrid
      columns={5}
      gap={{ base: 5, md: 10 }}
      width={{ base: '100%', md: '75%', lg: '70%' }}
      mx={'auto'}
    >
      <ProfileDetail profile={data} />
      <ProfileTracker profile={data} />
    </SimpleGrid>
  );
};
