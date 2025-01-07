import { ShoppingCartIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/atoms/button";
import { ScrollArea } from "@/components/atoms/scroll-area";
import { Card, CardContent } from "@/components/atoms/card";
import { useCarts } from "@/features/cart/hooks/use-carts";
import { formatCurrency } from "@/lib/format-currency";
import { Link } from "react-router-dom";
import CounterCarts from "./counter-carts";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/atoms/animated-modal";
import { cn } from "@/lib/utils";

const ModalListCart = ({ className }: { className?: string }) => {
  const { data: carts } = useCarts();
  return (
    <>
      <Modal>
        <ModalTrigger
          className={cn("p-0 overflow-visible hidden md:flex", className)}
        >
          <Button className="relative " variant={"outline"} size={"icon"}>
            <CounterCarts
              carts={carts!}
              className="absolute -top-1.5 -right-1.5"
            />
            <ShoppingCartIcon />
          </Button>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <header className="flex items-center justify-between mb-4">
              <h1 className="text-sm md:text-base font-semibold">Your carts</h1>
              <p className="text-xs md:text-sm">
                You have {carts?.items?.length} items in your cart
              </p>
            </header>
            {!carts || carts.items.length === 0 ? (
              <div className="flex items-center justify-center">
                <Card>
                  <CardContent className="py-4 flex items-center justify-center flex-col gap-2">
                    <h1 className="text-xl font-bold">Your cart is empty</h1>
                    <p className="text-muted-foreground text-sm">
                      Add some products to your cart.
                    </p>
                    <Link
                      className={buttonVariants({ variant: "secondary" })}
                      to={"/collections"}
                    >
                      See our collections
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <>
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
                  <Link
                    to="/profile/carts"
                    className={buttonVariants({ variant: "secondary" })}
                  >
                    Manage Cart
                  </Link>
                </footer>
              </>
            )}
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalListCart;
