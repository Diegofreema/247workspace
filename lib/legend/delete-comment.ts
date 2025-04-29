import { observable } from "@legendapp/state";
type DeleteCommentStore = {
  commentId: string;
  isOpen: boolean;
  handleOpen: (value: boolean) => void;
  getCommentId: (value: string) => void;
  removeCommentId: () => void;
};

export const deleteCommentStore$ = observable<DeleteCommentStore>({
  commentId: "",
  isOpen: false,
  handleOpen: (value) => {
    deleteCommentStore$.isOpen.set(value);
  },
  getCommentId: (value) => {
    deleteCommentStore$.assign({
      isOpen: true,
      commentId: value,
    });
  },
  removeCommentId: () => {
    deleteCommentStore$.commentId.set("");
  },
});
