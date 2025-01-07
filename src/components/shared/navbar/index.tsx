import Container from "../container";
import Logo from "../logo";
import DesktopNavigation from "@/components/organisme/desktop-navigation";

import { buttonVariants } from "@/components/atoms/button";
import MobileNavigation from "@/components/organisme/mobile-navigation";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ModalListCart from "@/components/organisme/carts/modal-list-cart";
import PopUpSearchProduct from "@/components/organisme/products/popup-search-product";
import ProfileDropdown from "@/components/organisme/profile/profile-dropdown";

const Navbar = () => {
  const { data: currentUser } = useCurrentUser();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-center shadow-md bg-background">
      <Container className="h-full grid grid-cols-3 md:grid-cols-[auto_1fr_auto_auto_auto] items-center">
        <Logo className="col-start-1 row-start-1 hidden md:flex" />
        <DesktopNavigation className="hidden md:flex col-start-2 row-start-1" />
        <MobileNavigation className="md:hidden col-start-1 row-start-1" />
        <PopUpSearchProduct />
        <ModalListCart className="mr-1" />
        {!currentUser ? (
          <Link
            to={"/login"}
            className={cn(
              "font-medium w-fit justify-self-end col-start-3 row-start-1 md:col-start-5 md:row-start-1",
              buttonVariants({ variant: "outline" })
            )}
          >
            Login
          </Link>
        ) : (
          <ProfileDropdown currentUser={currentUser} />
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
