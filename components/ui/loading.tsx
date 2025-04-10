import React from 'react';
import { FlexBox } from '../custom/flex-box';
import { Circles } from 'react-loader-spinner';
import { colors } from '@/constants';
import { Logo } from './logo';

export const Loading = () => {
  return (
    <FlexBox minH={'100dvh'} flexDirection={'column'} bg="white" width={'100%'}>
      <FlexBox
        width="100%"
        flex={1}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Circles
          height="80"
          width="80"
          color={colors.purple}
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </FlexBox>
      <Logo isPurple className="self-center mb-10" />
    </FlexBox>
  );
};
