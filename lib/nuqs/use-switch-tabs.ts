import { useQueryState } from 'nuqs';

export const useSwitchTabs = () => {
  const [tab, setTab] = useQueryState('tabs', { defaultValue: 'table' });

  return { tab, setTab };
};
