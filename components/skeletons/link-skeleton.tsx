import { Skeleton } from '@chakra-ui/react';

type Props = {
  height?: string;
  width?: string;
};
export const ReusableSkeleton = ({ height = '10', width = '100%' }: Props) => {
  return <Skeleton height={height} width={width} />;
};
