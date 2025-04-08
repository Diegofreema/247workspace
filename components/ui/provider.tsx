'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import type { ThemeProviderProps } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ColorModeProvider } from './color-mode';
import { QueryProvider } from './query-provider';

export function Provider(props: ThemeProviderProps) {
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
