import { Flex, FlexProps } from '@chakra-ui/react';

type Props = FlexProps & {};

export const FlexBox = ({ ...props }: Props) => {
  return <Flex {...props} />;
};
