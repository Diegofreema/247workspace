import { colors } from '@/constants';
import { Stack } from '@chakra-ui/react';
import { CustomText, Title } from '../custom/title';

type Props = {
  title: string;
  subtitle: string;
};

export const InstructionHeading = ({ title, subtitle }: Props) => {
  return (
    <Stack>
      <Title as="h4" color={colors.black}>
        {title}
      </Title>
      <CustomText fontSize={'16px'} color={colors.grey}>
        {subtitle}
      </CustomText>
    </Stack>
  );
};
