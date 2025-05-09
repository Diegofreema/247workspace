import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { PriorityEnum, StatusEnum, TicketStatus } from '@/types';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        [StatusEnum.TODO]:
          'border-transparent bg-red-400 text-primary hover:bg-red-400/80',
        [StatusEnum.IN_PROGRESS]:
          'border-transparent bg-yellow-400 text-primary hover:bg-yellow-400/80',
        [TicketStatus.UNASSIGNED]:
          'border-transparent bg-grey-400 text-primary hover:bg-grey-400/80',
        [StatusEnum.DONE]:
          'border-transparent bg-green-400 text-primary hover:bg-green-400/80',
        [TicketStatus.RESOLVED]:
          'border-transparent bg-green-400 text-primary hover:bg-green-400/80',
        [StatusEnum.IN_REVIEW]:
          'border-transparent bg-blue-400 text-primary hover:bg-blue-400/80',
        [StatusEnum.BACKLOG]:
          'border-transparent bg-pink-400 text-primary hover:bg-pink-400/80',
        [PriorityEnum.URGENT]:
          'border-transparent bg-red-600 text-white hover:bg-red-600/80',
        [PriorityEnum.IMPORTANT]:
          'border-transparent bg-orange-500 text-white hover:bg-orange-500/80',
        [PriorityEnum.MODERATE]:
          'border-transparent bg-yellow-500 text-white hover:bg-yellow-500/80',
        [PriorityEnum.LOW]:
          'border-transparent bg-blue-400 text-white hover:bg-blue-400/80',
        [PriorityEnum.MINIMAL]:
          'border-transparent bg-gray-400 text-white hover:bg-gray-400/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
