import { Stack } from '@chakra-ui/react';
import React from 'react';
import { CustomText, Title } from '../custom/title';
import { colors } from '@/constants';

type Props = {
  title?: string;
  subTitle?: string;
};

export const Heading = ({
  title = 'Tasks',
  subTitle = 'View all tasks here',
}: Props) => {
  return (
    <Stack mb={3}>
      <Title
        color={colors.black}
        lineHeight={1.2}
        fontSize={{ base: 'md', md: 'lg' }}
      >
        {title}
      </Title>
      <CustomText color={colors.grey}>{subTitle}</CustomText>
    </Stack>
  );
};
