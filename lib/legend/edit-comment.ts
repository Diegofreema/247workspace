import { observable } from "@legendapp/state";
type EditCommentStore = {
  comment: string;
  authorId: string;
  setValues: (values: { comment: string; authorId: string }) => void;
  clear: () => void;
};

export const editComment$ = observable<EditCommentStore>({
  comment: "",
  authorId: "",
  setValues: ({ comment, authorId }) => {
    editComment$.assign({
      comment,
      authorId,
    });
  },
  clear: () => {
    editComment$.assign({
      comment: "",
      authorId: "",
    })
  }
});
