import { FlexBox } from '@/components/custom/flex-box';
import { Title } from '@/components/custom/title';
import { Logo } from '@/components/ui/logo';
import { colors } from '@/constants';
import { Stack, Text } from '@chakra-ui/react';

export const Aside = () => {
  return (
    <FlexBox
      flexDir={'column'}
      py={5}
      px={10}
      bg={colors.purple}
      borderRadius={10}
      minHeight={'100%'}
    >
      <Logo />
      <Stack mt={20} gap={5}>
        <Title fontSize={'48px'} lineHeight={1.3}>
          Organize and manager your task with ease
        </Title>
        <Text className="font-sans ">
          Discover endless opportunities on Freelance Connect, where talented
          freelancers and businesses unite. Jump right in with us!
        </Text>
      </Stack>
    </FlexBox>
  );
};
