import { FlexBox } from '@/components/custom/flex-box';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { colors } from '@/constants';
import { SelectData } from '@/types';
import { Icon, IconListCheck } from '@tabler/icons-react';

type Props = {
  data: SelectData[];
  placeholder: string;
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled: boolean;
  icon: Icon;
};
export function ShadCnSelect({
  data,
  placeholder,
  value,
  onValueChange,
  disabled,
  icon: Icon,
}: Props) {
  return (
    <Select defaultValue={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full text-black gap-2" disabled={disabled}>
        <Icon color={colors.iconGrey} />
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {data.map((item) => (
          <SelectItem
            value={item.value}
            key={item.value}
            className="text-black"
          >
            <FlexBox alignItems={'center'} gap={2}>
              {item.label}
            </FlexBox>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
