import { Skeleton } from '@chakra-ui/react';

type Props = {
  height?: string;
  width?: any;
  className?: string;
};
export const ReusableSkeleton = ({
  height = '10',
  width = '100%',
  className,
}: Props) => {
  return <Skeleton height={height} width={width} className={className} />;
};
