import { CreateWorkspaceForm } from '@/components/form/create-workspace-form';
import { CreateProjectModal } from '@/components/modals/create-project-modal';
import { CreateTaskModal } from '@/components/modals/create-task-modal';
import { EditProjectModal } from '@/components/modals/edit-project-modal';
import { EditTaskModal } from '@/components/modals/edit-task-modal';
import { DashboardSidebar } from '@/components/navigation/dashboard-sidebar';
import { MobileSidebar } from '@/components/navigation/mobile-sidebar';
import { NavigationHeader } from '@/components/navigation/navigation-header';
import { Box } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <Box className="min-h-screen bg-gray-200 flex relative">
      <CreateWorkspaceForm />
      <CreateProjectModal />
      <CreateTaskModal />
      <EditTaskModal />
      <EditProjectModal />
      <Box
        position="fixed"
        left={0}
        top={0}
        bottom={0}
        width={{ base: 0, md: 200, lg: 300 }}
        bg="white"
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
        hideBelow={'md'}
        zIndex={5}
      >
        <DashboardSidebar />
      </Box>
      <MobileSidebar />
      <Box
        minH={'dvh'}
        width="100%"
        ml={{ base: 0, md: 200, lg: 300 }}
        transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
        transitionDuration=".2s, .2s, .35s"
        transitionProperty="top, bottom, width"
        transitionTimingFunction="linear, linear, ease"
      >
        <NavigationHeader />
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
