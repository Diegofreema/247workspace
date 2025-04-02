'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import { QueryProvider } from './query-provider';

export function Provider(props: ColorModeProviderProps) {
  return (
    <QueryProvider>
      <NuqsAdapter>
        <ChakraProvider value={defaultSystem}>
          <ColorModeProvider {...props} />
        </ChakraProvider>
      </NuqsAdapter>
    </QueryProvider>
  );
}
