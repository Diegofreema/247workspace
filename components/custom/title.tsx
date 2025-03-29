import { Heading, HeadingProps, Text } from '@chakra-ui/react';
import React from 'react';

type Props = HeadingProps & {};

export const Title = ({ fontSize = '28px', as = 'h1', ...props }: Props) => {
  return (
    <Heading
      as={as}
      fontSize={fontSize}
      className="font-public_sans font-bold"
      fontWeight="bold"
      {...props}
    >
      {props.children}
    </Heading>
  );
};
export const CustomText = ({ ...props }: Props) => {
  return (
    <Text className="font-sans" {...props}>
      {props.children}
    </Text>
  );
};
