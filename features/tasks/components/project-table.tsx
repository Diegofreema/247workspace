import { TaskWithProjectAndAssignee } from '@/types';
import { Box } from '@chakra-ui/react';
import React from 'react';

type Props = {
  tasks: TaskWithProjectAndAssignee[];
};

export const ProjectTable = ({ tasks }: Props) => {
  return <Box maxW={'100%'}>{JSON.stringify(tasks)}</Box>;
};
