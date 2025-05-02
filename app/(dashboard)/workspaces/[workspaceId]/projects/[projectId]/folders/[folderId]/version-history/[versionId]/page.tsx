import React, { Suspense } from 'react';
import { ProjectVersionClient } from './version-client';

const page = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <ProjectVersionClient />
      </Suspense>
    </div>
  );
};

export default page;
