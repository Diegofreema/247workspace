import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

type Props = ButtonProps & {};

export const Button = ({ ...props }: Props) => {
  console.log(props.loading);

  return (
    <ChakraButton
      width={'100%'}
      disabled
      loading
      borderRadius={5}
      size={'lg'}
      {...props}
    >
      {props.children}
    </ChakraButton>
  );
};
