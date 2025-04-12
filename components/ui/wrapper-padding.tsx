import { cn } from '@/lib/utils';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const WrapperWithPadding = ({ children, className }: Props) => {
  return (
    <div className={cn('min-h-screen bg-white p-4', className)}>{children}</div>
  );
};
