'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';
import { QueryProvider } from './query-provider';

export function Provider(props: ColorModeProviderProps) {
  return (
    <QueryProvider>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
    </QueryProvider>
  );
}
