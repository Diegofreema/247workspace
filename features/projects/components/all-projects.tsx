import { EmptyUi } from '@/components/ui/empty-ui';
import { ProjectsWithTasks } from '@/types';
import { For, SimpleGrid } from '@chakra-ui/react';
import { ProjectCard } from './project-card';

type Props = {
  projects: ProjectsWithTasks[];
};

export const AllProjects = ({ projects }: Props) => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
      gap={{ base: 3, md: 5, lg: 10 }}
      className="flex-1"
      minH={'80vh'}
    >
      <For each={projects} fallback={<EmptyUi text="No project yet" />}>
        {(item, index) => <ProjectCard key={index} project={item} />}
      </For>
    </SimpleGrid>
  );
};
