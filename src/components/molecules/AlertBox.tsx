import { cn } from "@/utils/styles";

export interface AlertBoxProps {
  children: React.ReactNode;
  className?: string;
}

export const AlertBox = ({ children, className }: AlertBoxProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center py-12 bg-gray-100",
        className,
      )}
    >
      {children}
    </div>
  );
};
