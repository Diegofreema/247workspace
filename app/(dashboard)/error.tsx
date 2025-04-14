'use client';
import { Button } from '@/components/custom/custom-button';
import { CustomText, Title } from '@/components/custom/title';
import { ErrorComponent } from '@/components/ui/error-component';
import { Wrapper } from '@/components/ui/wrapper';
import { colors } from '@/constants';
import { IconExclamationCircle } from '@tabler/icons-react';

// Error boundaries must be Client Components

export default function Error({
  reset,
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Wrapper>
      <ErrorComponent message={error.message} reset={reset} />
    </Wrapper>
  );
}
