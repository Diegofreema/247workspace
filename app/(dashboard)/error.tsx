'use client';
import { ErrorComponent } from '@/components/ui/error-component';
import { Wrapper } from '@/components/ui/wrapper';

// Error boundaries must be Client Components

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Wrapper>
      <ErrorComponent message={'Please try again'} reset={reset} />
    </Wrapper>
  );
}
