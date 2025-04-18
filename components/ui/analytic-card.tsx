import { FaCaretDown, FaCaretUp } from 'react-icons/fa';

import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

type Props = {
  title: string;
  value: number;
  variant: 'up' | 'down';
  increaseValue: number;
};

export const AnalyticCard = ({
  increaseValue,
  title,
  value,
  variant,
}: Props) => {
  const iconColor = variant === 'up' ? 'text-emerald-500' : 'text-red-500';
  const increasedValueColor =
    variant === 'up' ? 'text-emerald-500' : 'text-red-500';
  const Icon = variant === 'up' ? FaCaretUp : FaCaretDown;

  return (
    <Card className="shadow-none border-none w-full bg-white">
      <CardHeader>
        <div className="flex items-center gap-x-2.5">
          <CardDescription className="flex items-center gap-x-2 font-medium overflow-hidden">
            <span className="truncate text-base text-black">{title}</span>
          </CardDescription>
          <div className="flex items-center gap-x-1">
            <Icon className={cn(iconColor, 'size-4')} />
            <span
              className={cn(
                increasedValueColor,
                'truncate text-base font-medium'
              )}
            >
              {increaseValue}
            </span>
          </div>
        </div>
        <CardTitle className="3xl font-semibold text-black text-2xl md:text-3xl">
          {value}
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
