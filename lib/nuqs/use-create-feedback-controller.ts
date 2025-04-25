import { parseAsString, useQueryState } from 'nuqs';

export const useCreateFeedbackController = () => {
  const [taskId, setTaskId] = useQueryState('feedback', parseAsString);

  const open = (id: string) => setTaskId(id);
  const close = () => setTaskId(null);
  return { taskId, open, close, setTaskId };
};
