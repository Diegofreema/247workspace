import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const Wrapper = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white space-y-4">
      {children}
    </div>
  );
};
