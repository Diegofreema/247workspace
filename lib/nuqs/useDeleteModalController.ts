import { parseAsString, useQueryState } from 'nuqs';

export const useDeleteCommentModalController = () => {
  const [commentId, setCommentId] = useQueryState(
    "delete-comment",
    parseAsString,
  );

  const open = (id: string) => setCommentId(id);
  const close = () => setCommentId(null);
  return { commentId, open, close, setCommentId };
};
