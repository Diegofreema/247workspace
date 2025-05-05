import React from 'react';

type Props = {
  length: number;
  maxLength: number;
};

export const TextCounter = ({ length, maxLength }: Props) => {
  return (
    <p className="text-black font-bold">
      {length}/{maxLength}
    </p>
  );
};
