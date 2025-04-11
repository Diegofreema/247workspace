'use client';
import { Button } from '@/components/custom/custom-button';
import { Title } from '@/components/custom/title';
import { Wrapper } from '@/components/ui/wrapper';
import { colors } from '@/constants';
import { IconExclamationCircle } from '@tabler/icons-react';

// Error boundaries must be Client Components

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Wrapper>
      <IconExclamationCircle size={50} color={colors.purple} />
      <Title color={colors.black}>Something went wrong!</Title>
      <Button onClick={() => reset()} px={2} bg={colors.purple} width={'fit'}>
        Try again
      </Button>
    </Wrapper>
  );
}
