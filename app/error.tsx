'use client';
import { ErrorComponent } from '@/components/ui/error-component';

// Error boundaries must be Client Components

export default function Error({
  reset,
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorComponent message={error.message} reset={reset} />;
}
