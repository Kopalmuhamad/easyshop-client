import { ShoppingBasketIcon } from "lucide-react";
import { Button, buttonVariants } from "../atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../atoms/dialog";
import { ScrollArea } from "../atoms/scroll-area";
import { Card, CardContent } from "../atoms/card";
import { useCarts } from "@/features/cart/hooks/use-carts";
import { formatCurrency } from "@/lib/format-currency";
import { Link } from "react-router-dom";

const PopUpCarts = () => {
  const { data: carts } = useCarts();

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="hidden md:flex md:col-start-4 md:row-start-1 mx-1 relative"
      >
        <Button variant={"outline"} size={"icon"}>
          <div className="text-xs rounded-full bg-primary text-primary-foreground w-4 h-4 flex items-center justify-center absolute -top-1.5 -right-1.5">
            {carts?.items?.length || 0}
          </div>
          <ShoppingBasketIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="px-2">
        {!carts ? (
          <h1 className="text-base text-center font-semibold">
            You have no items in your cart
          </h1>
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
                  className="grid grid-cols-[0.5fr_1fr] gap-2 h-full max-h-[125px] overflow-hidden mb-2"
                >
                  <figure className="flex items-center justify-center py-1">
                    <img
                      src={item.product.image[0]}
                      alt={item.product.name}
                      className="object-cover rounded-sm ml-2"
                    />
                  </figure>
                  <CardContent className="p-2 flex flex-col items-start justify-start">
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

export default PopUpCarts;
