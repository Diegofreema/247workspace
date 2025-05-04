'use client';

import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { useFormStatus } from 'react-dom';
import { Button } from '../custom/custom-button';

type Props = {
  url: string;
  text: string;
};

export const SubmitButton = ({ text, url }: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      variant={'outline'}
      width={'100%'}
      border={'1px solid #ccc'}
      color="black"
      type="submit"
      disabled={pending}
    >
      {pending ? (
        <LoaderCircle className="animate-spin size-5 text-purple" />
      ) : (
        <Image
          alt="google image"
          src={url}
          width={25}
          height={25}
          objectFit={'contain'}
        />
      )}

      {text}
    </Button>
  );
};
