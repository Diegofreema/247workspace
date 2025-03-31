import { For, Stack } from '@chakra-ui/react';
import { FlexBox } from '../custom/flex-box';
import { Logo } from '../ui/logo';
import { routes } from '@/utils/routes';
import { NavLink } from './nav-link';

export const DashboardSidebar = () => {
  return (
    <aside className="p-4">
      <FlexBox flexDirection={'column'} alignItems={'center'} width="100%">
        <Logo isPurple />
        <Stack gap={7} mt={10} width={'100%'}>
          <For each={routes}>
            {(item) => <NavLink key={item.label} item={item} />}
          </For>
        </Stack>
      </FlexBox>
    </aside>
  );
};
