import { FlexBox } from '@/components/custom/flex-box';
import { Title } from '@/components/custom/title';
import { colors } from '@/constants';
import { Image, Stack, Text } from '@chakra-ui/react';

export const Aside = () => {
  return (
    <FlexBox
      flexDir={'column'}
      py={5}
      px={10}
      bg={colors.purple}
      borderRadius={10}
      flex={1}
    >
      {/* <Logo isPurple={false} /> */}
      <Stack mt={20} gap={5}>
        <Image
          alt="image"
          src="/smart.png"
          objectFit={'contain'}
          width={300}
          height={400}
          alignSelf={'center'}
        />
        <Title
          fontSize={{ base: '30px', md: '48px' }}
          lineHeight={1.3}
          color="white"
        >
          Organize and manager your task with ease
        </Title>
        <Text
          className="font-sans text-white"
          fontSize={{ base: '16px', md: '20px' }}
        >
          Discover endless opportunities on Freelance Connect, where talented
          freelancers and businesses unite. Jump right in with us!
        </Text>
      </Stack>
    </FlexBox>
  );
};
