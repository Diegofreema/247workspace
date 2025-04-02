import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

type Props = ButtonProps & {};

export const Button = ({ width = '100%', px = 3, ...props }: Props) => {
  return (
    <ChakraButton width={width} px={px} borderRadius={5} size={'lg'} {...props}>
      {props.children}
    </ChakraButton>
  );
};
