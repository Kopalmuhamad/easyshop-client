import Container from "../container";
import Logo from "../logo";
import DesktopNavigation from "@/components/organisme/desktop-navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import {
  LayoutDashboardIcon,
  LogOutIcon,
  ShoppingBasketIcon,
  UserIcon,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/atoms/button";
import { DialogDescription } from "@radix-ui/react-dialog";
import MobileNavigation from "@/components/organisme/mobile-navigation";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useLogout } from "@/features/auth/hooks/use-logout";
import PopUpSearchProduct from "@/components/moleculs/pop-up-search-product";

const Navbar = () => {
  const { mutate: logout } = useLogout();
  const { data: currentUser } = useCurrentUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-center shadow-md bg-background">
      <Container className="h-full grid grid-cols-3 md:grid-cols-[auto_1fr_auto_auto_auto] items-center">
        <Logo className="col-start-1 row-start-1 hidden md:flex" />
        <DesktopNavigation className="hidden md:flex col-start-2 row-start-1" />
        <MobileNavigation className="md:hidden col-start-1 row-start-1" />
        <PopUpSearchProduct />
        <Dialog>
          <DialogTrigger
            asChild
            className="hidden md:flex md:col-start-4 md:row-start-1 mx-1"
          >
            <Button variant={"outline"} size={"icon"}>
              <ShoppingBasketIcon size={18} />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cart</DialogTitle>
              <DialogDescription>
                You have no items in your cart
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        {!currentUser ? (
          <Link
            to={"/login"}
            className={cn(
              "font-medium w-fit justify-self-end col-start-3 row-start-1 md:col-start-5 md:row-start-1",
              buttonVariants({ variant: "default" })
            )}
          >
            Login
          </Link>
        ) : (
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
            <DropdownMenuContent>
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
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => logout()}
              >
                <span>
                  <LogOutIcon size={16} />
                </span>
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
