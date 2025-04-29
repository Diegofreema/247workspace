import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export const PageWrapper = ({ children, className }: Props) => {
  return (
    <div className={cn("bg-white min-h-screen p-5", className)}>{children}</div>
  );
};
