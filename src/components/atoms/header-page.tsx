import { cn } from "@/lib/utils";
import React from "react";

const HeaderPage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full", className)}
    {...props}
  />
));
HeaderPage.displayName = "HeaderPage";

const HeaderPageContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center justify-between", className)}
    {...props}
  />
));

HeaderPageContent.displayName = "HeaderPageContent";

const HeaderPageTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-lg xs:text-xl sm:text-2xl font-semibold", className)}
    {...props}
  />
));
HeaderPageTitle.displayName = "HeaderPageTitle";

const HeaderPageDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm xs:text-base text-muted-foreground", className)}
    {...props}
  />
));
HeaderPageDescription.displayName = "HeaderPageDescription";

export {
  HeaderPage,
  HeaderPageContent,
  HeaderPageTitle,
  HeaderPageDescription,
};
