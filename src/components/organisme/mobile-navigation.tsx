import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../atoms/sheet";
import { Button } from "../atoms/button";
import { cn } from "@/lib/utils";
import Logo from "../shared/logo";
import { Link } from "react-router-dom";

interface IMobileNavigationProps {
  className?: string;
}

const links = [
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "New Arrival",
    path: "/collections/new-arrivals",
  },
  {
    name: "Features",
    path: "/collections/features",
  },
  {
    name: "Best Seller",
    path: "/collections/best-seller",
  },
  {
    name: "Collections",
    path: "/collections",
  },
];

const MobileNavigation = ({ className }: IMobileNavigationProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild className={cn("", className)}>
        <Button size={"icon"} variant={"outline"}>
          <MenuIcon size={18} />
        </Button>
      </SheetTrigger>
      <SheetContent className="" side="left">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
          <SheetDescription>Menu</SheetDescription>
        </SheetHeader>
        <ul className="w-full space-y-2 mt-4">
          {links.map((link) => (
            <li key={link.name}>
              <Link to={link.path} className="text-base font-medium">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
