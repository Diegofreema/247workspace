import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { colors } from '@/constants';
import { SelectData, StatusEnum } from '@/types';
import { Icon } from '@tabler/icons-react';
import { CustomText } from '@/components/custom/title';
import { Badge } from '@/components/ui/badge';

type Props = {
  data: SelectData[];
  placeholder: string;
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled: boolean;
  icon?: Icon;
  text?: string;
};
export function ShadCnSelect({
  data,
  placeholder,
  value,
  onValueChange,
  disabled,
  icon: Icon,
  text,
}: Props) {
  return (
    <Select defaultValue={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full text-black gap-2" disabled={disabled}>
        {Icon && <Icon color={colors.iconGrey} />}
        {text && (
          <CustomText className="text-black font-bold">{text}</CustomText>
        )}
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {data.map((item) => (
          <SelectItem
            value={item.value}
            key={item.value}
            className="text-black"
          >
            <Badge variant={item.value as StatusEnum}>{item.label}</Badge>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
