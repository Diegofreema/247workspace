import { colors } from '@/constants';
import { Box } from '@chakra-ui/react';
import { Circles } from 'react-loader-spinner';

export const SmallerLoader = () => {
  return (
    <Box minH={200} display="flex" justifyContent="center" alignItems="center">
      <Circles
        height="80"
        width="80"
        color={colors.purple}
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Box>
  );
};
