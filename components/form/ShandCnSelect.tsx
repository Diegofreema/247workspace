import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectData } from "@/types";
import { FlexBox } from "@/components/custom/flex-box";
import { AvatarItem } from "@/components/navigation/workpsace-item";

type Props = {
  data: SelectData[];
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
};
export function ShadCnSelect({
  data,
  placeholder,
  value,
  onValueChange,
  disabled,
}: Props) {
  return (
    <Select defaultValue={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full" disabled={disabled}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem value={item.value} key={item.value}>
            <FlexBox alignItems={"center"} gap={2}>
              <AvatarItem name={item.label} image={item.imageUrl} />
              {item.label}
            </FlexBox>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
