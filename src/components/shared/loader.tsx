import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React from "react";

const loaderVariant = cva("", {
  variants: {
    size: {
      xs: "w-6 h-6",
      sm: "w-10 h-10",
      md: "w-16 h-16",
      lg: "w-20 h-20",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariant> {}

const Loader = ({ size, ...props }: LoaderProps) => {
  return (
    /* From Uiverse.io by Fresnel11 */
    <div
      {...props}
      className={cn(
        loaderVariant({ size }),
        "border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"
      )}
    ></div>
  );
};

export default Loader;
