import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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

interface IDesktopNavigationProps {
  className?: string;
}

const DesktopNavigation = ({ className }: IDesktopNavigationProps) => {
  return (
    <ul className={cn("flex items-center justify-center gap-4", className)}>
      {links.map((link) => (
        <li key={link.name}>
          <Link to={link.path} className="text-base font-medium capitalize">
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default DesktopNavigation;
