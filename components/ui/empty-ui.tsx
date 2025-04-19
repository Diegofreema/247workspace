import React from 'react';
import { FlexBox } from '../custom/flex-box';
import { CustomText } from '../custom/title';
import { colors } from '@/constants';

type Props = {
  text: string;
};

export const EmptyUi = ({ text }: Props) => {
  return (
    <FlexBox width={'100%'} justifyContent={'center'}>
      <CustomText title={text} color={colors.black} />
    </FlexBox>
  );
};
