import { FlexBox } from "@/components/custom/flex-box";
import { Button } from "@/components/ui/button";
import { IconEdit, IconTrash } from "@tabler/icons-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

export const CommentAction = ({ onEdit, onDelete }: Props) => {
  return (
    <FlexBox justifyContent={"flex-end"} gap={2} mt={2}>
      <Button onClick={onEdit} className={"hover:opacity-50 transition"}>
        <IconEdit /> Edit
      </Button>
      <Button className={"hover:opacity-50 transition"} onClick={onDelete}>
        <IconTrash /> Delete
      </Button>
    </FlexBox>
  );
};
