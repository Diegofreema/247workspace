import { FlexBox } from '@/components/custom/flex-box';
import { CustomText } from '@/components/custom/title';
import { colors } from '@/constants';
import React from 'react';

type Props = {
  text: string;
  percentage: number;
  isCompleted: boolean;
};

export const PercentageText = ({ isCompleted, percentage, text }: Props) => {
  return (
    <FlexBox
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
    >
      <CustomText fontWeight={'bold'} color={colors.black}>
        {text}
      </CustomText>
      <CustomText
        fontWeight={'bold'}
        color={isCompleted ? 'green' : colors.grey}
      >
        {percentage}%
      </CustomText>
    </FlexBox>
  );
};
