import { ShoppingBasketIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { Card, CardContent } from "@/components/atoms/card";
import { useCarts } from "@/features/cart/hooks/use-carts";
import { formatCurrency } from "@/lib/format-currency";
import { Link } from "react-router-dom";
import CounterCarts from "./counter-carts";

const PopupListCart = () => {
  const { data: carts } = useCarts();
  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="hidden md:flex md:col-start-4 md:row-start-1 mx-1 relative"
      >
        <Button variant={"outline"} size={"icon"}>
          <CounterCarts
            carts={carts!}
            className="absolute -top-1.5 -right-1.5"
          />
          <ShoppingBasketIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="px-2">
        {!carts || !carts.items.length ? (
          <div className="flex items-center justify-center">
            <Card>
              <CardContent className="py-4 flex items-center justify-center flex-col gap-2">
                <h1 className="text-xl font-bold">Your cart is empty</h1>
                <p className="text-muted-foreground text-sm">
                  Add some products to your cart.
                </p>
                <Link className={buttonVariants()} to={"/collections"}>
                  See our collections
                </Link>
              </CardContent>
            </Card>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Cart</DialogTitle>
              <DialogDescription>
                {carts?.items?.length === 0
                  ? "You have no items in your cart"
                  : `You have ${carts?.items?.length} items in your cart`}
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-[400px]">
              {carts?.items?.map((item) => (
                <Card
                  key={item._id}
                  className="grid grid-cols-[0.5fr_1fr] xs:grid-cols-[0.35fr_1fr] gap-2 mb-2"
                >
                  <figure className="flex items-center justify-center w-full h-[125px] py-1">
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover object-center rounded-sm ml-2"
                    />
                  </figure>
                  <CardContent className="p-2 flex flex-col items-start justify-center">
                    <h1 className="text-start text-sm sm:text-base font-semibold">
                      {item.product.name}
                    </h1>
                    <p className="text-sm sm:text-base font-medium">
                      <span>Quantity : </span>
                      <span className="text-muted-foreground">
                        {item.quantity}
                      </span>
                    </p>
                    <h2 className="text-start text-sm sm:text-base font-medium">
                      <span>Price : </span>
                      <span className="text-muted-foreground">
                        {formatCurrency(item.totalPrice)}
                      </span>
                    </h2>
                  </CardContent>
                </Card>
              ))}
            </ScrollArea>
            <footer className="ml-auto">
              <Link to="/profile/carts" className={buttonVariants({})}>
                Manage Cart
              </Link>
            </footer>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PopupListCart;
