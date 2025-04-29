import { Box } from '@chakra-ui/react';
import { LoaderCircle } from 'lucide-react';

export const SmallerLoader = () => {
  return (
    <Box minH={200} display="flex" justifyContent="center" alignItems="center">
      <LoaderCircle className="size-10 animate-spin text-purple" />
    </Box>
  );
};
