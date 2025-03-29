import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

type Props = ButtonProps & {};

export const Button = ({ ...props }: Props) => {
  return (
    <ChakraButton width={'100%'} borderRadius={5} size={'lg'} {...props} />
  );
};
