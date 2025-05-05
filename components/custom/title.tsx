import { cn } from '@/lib/utils';
import { Heading, HeadingProps, Text } from '@chakra-ui/react';
import React from 'react';

type Props = HeadingProps & {
  className?: string;
};

export const Title = ({
  fontSize = '28px',
  as = 'h1',
  className,
  ...props
}: Props) => {
  return (
    <Heading
      as={as}
      fontSize={fontSize}
      className={cn('font-public_sans font-bold', className)}
      fontWeight="bold"
      {...props}
    >
      {props.children}
    </Heading>
  );
};
export const CustomText = ({ className, ...props }: Props) => {
  return (
    <Text
      className={cn('font-sans', className)}
      fontSize={{ base: '14px', md: '16px' }}
      {...props}
    >
      {props.children}
    </Text>
  );
};
