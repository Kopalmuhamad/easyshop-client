import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { Link } from "react-router-dom";
import {
  LayoutDashboardIcon,
  LogOutIcon,
  ShoppingBasketIcon,
  TruckIcon,
  UserIcon,
} from "lucide-react";
import { IAuth } from "@/features/auth/utils/auth-interface";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useIsMobile } from "@/hooks/use-mobile";
import { ModeToggle } from "@/components/shared/mode-toggle";

interface IProps {
  currentUser: IAuth;
}

const ProfileDropdown = ({ currentUser }: IProps) => {
  const { mutate: logout } = useLogout();

  const isMobile = useIsMobile();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="col-start-3 md:col-start-5 md:row-start-1 row-start-1 justify-self-end"
      >
        <Avatar className="border border-border cursor-pointer">
          <AvatarImage />
          <AvatarFallback>CV</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[1002]">
        <Link to="/profile">
          <DropdownMenuItem className="cursor-pointer">
            <span>
              <UserIcon size={16} />
            </span>
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        {currentUser.role === "admin" && (
          <Link to="/admin">
            <DropdownMenuItem className="cursor-pointer">
              <span>
                <LayoutDashboardIcon size={16} />
              </span>
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>
        )}
        <Link to="/profile/orders">
          <DropdownMenuItem className="cursor-pointer">
            <span>
              <TruckIcon size={16} />
            </span>
            <span>Order</span>
          </DropdownMenuItem>
        </Link>
        {isMobile && (
          <Link to="/profile/carts">
            <DropdownMenuItem className="cursor-pointer">
              <span>
                <ShoppingBasketIcon size={16} />
              </span>
              <span>Cart</span>
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem className="cursor-pointer" onClick={() => logout()}>
          <span>
            <LogOutIcon size={16} />
          </span>
          <span>Logout</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <ModeToggle />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
