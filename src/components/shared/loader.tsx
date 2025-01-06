import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const loaderVariant = cva(
  " border-dashed rounded-full animate-spin border-blue-600",
  {
    variants: {
      size: {
        xs: "border-4 w-6 h-6",
        sm: "border-5 w-10 h-10",
        md: "border-7 w-16 h-16",
        lg: "border-8 w-20 h-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariant> {}

const Loader = ({ size, ...props }: LoaderProps) => {
  return (
    /* From Uiverse.io by Fresnel11 */
    <div {...props} className={cn(loaderVariant({ size }), "")}></div>
  );
};

export default Loader;
