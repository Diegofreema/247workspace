'use client';
import { LoaderCircle } from 'lucide-react';

const loading = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <LoaderCircle className="animate-spin text-purple" />
    </div>
  );
};

export default loading;
