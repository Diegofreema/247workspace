import { parseAsString, useQueryState } from 'nuqs';

export const useEditTicketCommentController = () => {
    const [commentId, setCommentId] = useQueryState(
        'edit-ticket-comment',
        parseAsString
    );

    const open = (id: string) => setCommentId(id);
    const close = () => setCommentId(null);
    return { commentId, open, close, setCommentId };
};
