import { AnalyticsType } from '@/types';
import { SimpleGrid } from '@chakra-ui/react';
import { AnalyticCard } from './analytic-card';

type Props = {
  data: AnalyticsType;
};

export const Analytics = ({ data }: Props) => {
  if (!data) return null;
  return (
    <SimpleGrid
      gap={{ base: 4, md: 8 }}
      columns={{ base: 1, md: 2, lg: 5 }}
      mt={4}
    >
      <div className="flex items-center flex-1">
        <AnalyticCard
          title="Total Tasks"
          value={data.taskCount}
          variant={data.taskDifference > 0 ? 'up' : 'down'}
          increaseValue={data.taskDifference}
        />
      </div>
      <div className="flex items-center flex-1">
        <AnalyticCard
          title="Assigned Tasks"
          value={data.assignedTaskCount}
          variant={data.assignedTaskDifference > 0 ? 'up' : 'down'}
          increaseValue={data.assignedTaskDifference}
        />
      </div>
      <div className="flex items-center flex-1">
        <AnalyticCard
          title="Completed Tasks"
          value={data.completedTaskCount}
          variant={data.completedTaskDifference > 0 ? 'up' : 'down'}
          increaseValue={data.completedTaskDifference}
        />
      </div>
      <div className="flex items-center flex-1">
        <AnalyticCard
          title="Overdue Tasks"
          value={data.overdueTaskCount}
          variant={data.overdueTaskDifference > 0 ? 'up' : 'down'}
          increaseValue={data.overdueTaskDifference}
        />
      </div>
      <div className="flex items-center flex-1">
        <AnalyticCard
          title="Incomplete Tasks"
          value={data.incompleteTaskCount ?? 0}
          variant={(data.incompleteTaskDifference || 0) > 0 ? 'up' : 'down'}
          increaseValue={data.incompleteTaskDifference || 0}
        />
      </div>
    </SimpleGrid>
  );
};
