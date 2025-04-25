import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { colors } from '@/constants';
import { Profile } from '@/types';
import React from 'react';

type Props = {
  profile: Profile;
};

export const ProjectInfoDisplay = ({ profile }: Props) => {
  const details = [
    { label: 'Full name', value: profile?.name },
    { label: 'Email', value: profile?.email },
    { label: 'Address', value: profile?.role },
    { label: 'Phone', value: profile?.phone },
  ];
  return (
    <FlexBox alignItems={'center'} gap={4}>
      {details.map((details, index) => (
        <LabelValue
          key={index}
          label={details.label}
          value={details.value ?? 'N/A'}
        />
      ))}
    </FlexBox>
  );
};

const LabelValue = ({ label, value }: { label: string; value: string }) => {
  return (
    <FlexBox flexDir={'column'} gap={2}>
      <CustomText color={colors.iconGrey} fontSize={'sm'}>
        {label}
      </CustomText>
      <CustomText color={colors.black} fontSize={'md'} fontWeight={'bold'}>
        {value}
      </CustomText>
    </FlexBox>
  );
};
