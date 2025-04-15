import { StatusEnum } from '@/types';
import { parseAsBoolean, parseAsStringEnum, useQueryState } from 'nuqs';

export const useCreateTaskModalController = () => {
  const [isOpen, setIsOpen] = useQueryState(
    'create-task',
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return { isOpen, open, close, setIsOpen };
};
export const useSetTask = () => {
  const [status, setStatus] = useQueryState(
    'task-status',
    parseAsStringEnum<StatusEnum>(Object.values(StatusEnum))
  );

  const onSetStatus = (status: StatusEnum) => setStatus(status);
  const onRemoveStatus = () => setStatus(null);
  return { status, onSetStatus, onRemoveStatus };
};
