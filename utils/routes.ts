import {
  IconBriefcase2,
  IconBriefcase2Filled,
  IconFile,
  IconFileFilled,
  IconLayout2,
  IconLayout2Filled,
  IconSortAscending2,
  IconSortAscending2Filled,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react';

export const routes = [
  {
    label: 'Home',
    path: '/',
    icon: IconLayout2,
    activeIcon: IconLayout2Filled,
  },
  {
    label: 'Tasks',
    path: '/tasks',
    icon: IconSortAscending2,
    activeIcon: IconSortAscending2Filled,
  },
  {
    label: 'Team',
    path: '/team',
    icon: IconUsers,
    activeIcon: IconUsersGroup,
  },
  {
    label: 'Documents',
    path: '/documents',
    icon: IconFile,
    activeIcon: IconFileFilled,
  },
  {
    label: 'Projects',
    path: '/projects',
    icon: IconBriefcase2,
    activeIcon: IconBriefcase2Filled,
  },
];
