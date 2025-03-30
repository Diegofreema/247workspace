import React from 'react';
import { FlexBox } from '../custom/flex-box';

export const FormSeparator = () => {
  return (
    <FlexBox justify={'center'} align={'center'} gap={2} width="100%">
      <div className="my-6 bg-gray-200 max-w-[200px] h-[1px] flex-1" />
      <p className="text-divider">or</p>
      <div className="my-6 bg-gray-200  h-[1px] max-w-[200px] flex-1" />
    </FlexBox>
  );
};
