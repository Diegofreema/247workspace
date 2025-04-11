import { FlexBox } from '@/components/custom/flex-box';
import { CustomText, Title } from '@/components/custom/title';
import { colors } from '@/constants';
import { Image, Stack } from '@chakra-ui/react';
import { IconArrowNarrowLeft } from '@tabler/icons-react';
import { Link } from 'next-view-transitions';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <Image
        src="/not-found.png"
        alt="Not Found"
        width={'auto'}
        height={'auto'}
        objectFit="cover"
      />

      <Stack mt={5} gap={4}>
        <Title color={'black'} textAlign={'center'}>
          Page not found
        </Title>
        <CustomText color={colors.grey} textAlign={'center'}>
          This Page doesn`t exist or was removed! We suggest you back to home.
        </CustomText>
        <FlexBox justifyContent={'center'}>
          <Link
            href="/"
            className="bg-purple px-3 py-4 rounded-md text-white w-fit flex items-center gap-2"
          >
            <IconArrowNarrowLeft color={colors.white} /> Back to home
          </Link>
        </FlexBox>
      </Stack>
    </div>
  );
};

export default NotFound;
