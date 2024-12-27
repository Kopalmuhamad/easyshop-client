import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface ILogoProps {
  className?: string;
}

const Logo = ({ className }: ILogoProps) => {
  return (
    <Link
      to="/"
      className={cn(
        "flex flex-nowrap flex-row items-center justify-center w-fit gap-1",
        className
      )}
    >
      <img src="/logo.svg" alt="logo" />
      <span className="text-lg font-bold">Easyshop</span>
    </Link>
  );
};

export default Logo;
