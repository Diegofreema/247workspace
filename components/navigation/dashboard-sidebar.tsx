import { For, Stack } from '@chakra-ui/react';
import { FlexBox } from '../custom/flex-box';
import { Logo } from '../ui/logo';
import { routes } from '@/utils/routes';
import { NavLink } from './nav-link';
import { Suspense } from 'react';
import { ReusableSkeleton } from '../skeletons/link-skeleton';
import { LogoutBtn } from '../buttons/logout-button';
import { WorkspaceSwitcher } from './workspace-switcher';

export const DashboardSidebar = () => {
  return (
    <aside className="p-4 h-full">
      <FlexBox
        flexDirection={'column'}
        alignItems={'center'}
        width="100%"
        height={'100%'}
      >
        <Logo isPurple />
        <Stack gap={7} mt={10} height={'100%'} width={'100%'}>
          <Suspense fallback={<ReusableSkeleton />}>
            <WorkspaceSwitcher />
          </Suspense>
          <For each={routes}>
            {(item) => (
              <Suspense key={item.label} fallback={<ReusableSkeleton />}>
                <NavLink key={item.label} item={item} />
              </Suspense>
            )}
          </For>
          <LogoutBtn className="mt-auto" />
        </Stack>
      </FlexBox>
    </aside>
  );
};
