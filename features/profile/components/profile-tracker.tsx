'use client';

import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { colors } from '@/constants';
import { Profile } from '@/types';
import { calculateProfileCompletion } from '@/utils/helper';
import { GridItem, Stack } from '@chakra-ui/react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { PercentageText } from './percentage-text';

type Props = {
  profile: Profile;
};

export const ProfileTracker = ({ profile }: Props) => {
  const percentage = calculateProfileCompletion({
    avatarUrl: profile.avatarUrl,
    bio: profile.bio,
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    role: profile.role,
  });
  const personalInfo = [
    profile.name,
    profile.email,
    profile.phone,
    profile.role,
  ];
  const personalInfoIsCompleted = personalInfo.every((info) => !!info);
  const heading =
    percentage === 100 ? 'Profile Completed' : 'Complete your profile';
  return (
    <GridItem shadow={'sm'} colSpan={{ base: 1, md: 2 }} gap={5} p={5}>
      <Stack gap={5}>
        <CustomText
          color={colors.black}
          fontWeight={'bold'}
          fontSize={{ base: 'md', md: 'xl' }}
          textAlign={'center'}
        >
          {heading}
        </CustomText>
        <div className="w-[200px] h-[200px] self-center">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={{
              // Customize the root svg element
              root: {},
              // Customize the path, i.e. the "completed progress"
              path: {
                // Path color
                stroke: colors.purple,
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                // Customize transition animation
                transition: 'stroke-dashoffset 0.5s ease 0s',
                // Rotate the path
                transform: 'rotate(0.25turn)',
                transformOrigin: 'center center',
              },
              // Customize the circle behind the path, i.e. the "total progress"
              trail: {
                // Trail color
                stroke: '#d6d6d6',
                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                strokeLinecap: 'butt',
                // Rotate the trail
                transform: 'rotate(0.25turn)',
                transformOrigin: 'center center',
              },
              // Customize the text
              text: {
                // Text color
                fill: colors.purple,
                // Text size
                fontSize: '16px',
              },
              // Customize background - only used when the `background` prop is true
              background: {
                fill: colors.purple,
              },
            }}
          />
        </div>
        <PercentageText
          text="Upload photo"
          percentage={20}
          isCompleted={!!profile.avatarUrl}
        />
        <PercentageText
          text="Personal information"
          percentage={60}
          isCompleted={personalInfoIsCompleted}
        />
        <PercentageText
          text="Bio"
          percentage={20}
          isCompleted={!!profile.bio}
        />
      </Stack>
    </GridItem>
  );
};
