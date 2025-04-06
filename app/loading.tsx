'use client';
import { FlexBox } from '@/components/custom/flex-box';
import { Logo } from '@/components/ui/logo';
import { colors } from '@/constants';

import { Circles } from 'react-loader-spinner';

const loading = () => {
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

export default loading;
