import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ReactNode } from "react";

interface IProps {
  variant?:
    | "outline"
    | "ghost"
    | "link"
    | "default"
    | "destructive"
    | "pureGhost"
    | "secondary";
  className?: string;
  children: ReactNode;
  initialContent: string;
}

const AnimateButton = (props: IProps) => {
  const {
    variant = "pureGhost",
    className,
    children: animateContent,
    initialContent,
    ...restProps
  } = props;

  return (
    <Button
      className={cn("flex group/modal-btn", className)}
      variant={variant}
      {...restProps}
    >
      <span className="group-hover/modal-btn:translate-x-[500px] text-center transition duration-500">
        {initialContent}
      </span>
      <div className="-translate-x-[500px] group-hover/modal-btn:-translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
        {animateContent}
      </div>
    </Button>
  );
};

export default AnimateButton;
