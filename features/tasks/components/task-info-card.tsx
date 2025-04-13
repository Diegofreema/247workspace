import { Title } from '@/components/custom/title';
import { Stack } from '@chakra-ui/react';

type Props = {
  label: string;
  value: number;
};

export const TaskInfoCard = ({ label, value }: Props) => {
  return (
    <Stack bg="white" borderRadius={10} gap={2} p={5}>
      <Title fontSize={'15px'} color="black">
        {label}
      </Title>
      <Title fontSize={35} color="black">
        {value}
      </Title>
    </Stack>
  );
};
