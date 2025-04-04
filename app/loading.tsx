'use client';
import { FlexBox } from '@/components/custom/flex-box';
import { colors } from '@/constants';

import { Circles } from 'react-loader-spinner';

const loading = () => {
  return (
    <FlexBox
      minH={'100dvh'}
      justifyContent={'center'}
      alignItems={'center'}
      bg="white"
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
  );
};

export default loading;
