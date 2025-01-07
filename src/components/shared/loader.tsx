import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const loaderVariant = cva("border-dashed rounded-full animate-spin ", {
  variants: {
    variant: {
      default: "border-primary",
      secondary: "border-secondary",
    },
    size: {
      xs: "border-4 w-6 h-6",
      sm: "border-5 w-10 h-10",
      md: "border-7 w-16 h-16",
      lg: "border-8 w-20 h-20",
    },
  },
  defaultVariants: {
    size: "xs",
    variant: "default",
  },
});

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariant> {}

const Loader = ({ variant, size, ...props }: LoaderProps) => {
  return (
    /* From Uiverse.io by Fresnel11 */
    <div {...props} className={cn(loaderVariant({ size, variant }), "")}></div>
  );
};

export default Loader;
