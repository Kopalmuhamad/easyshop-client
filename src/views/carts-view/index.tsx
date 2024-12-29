import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import Container from "@/components/shared/container";
import Loader from "@/components/shared/loader";
import ActionDeleteAllCartItem from "@/features/cart/components/action-delete-all-cart-item";
import ActionDeleteCartItem from "@/features/cart/components/action-delete-cart-item";
import FormAddToCart from "@/features/cart/components/form-add-to-cart";
import { useCarts } from "@/features/cart/hooks/use-carts";
import { formatCurrency } from "@/lib/format-currency";
import { Link } from "react-router-dom";

const CartsView = () => {
  const { data: carts, isLoading } = useCarts();

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      </div>
    );
  }

  if (!carts) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Carts not found</CardTitle>
            <CardDescription>
              Currently you have no any carts, please add items to your cart for
              checkout
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <Container className="py-20 space-y-4 relative min-h-screen">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Carts</h1>
        <p className="text-sm">
          You have {carts?.items.length} items in your cart
        </p>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {carts?.items.map((item) => (
          <Card
            key={item.product._id}
            className=" max-w-[300px] w-full h-full rounded-md overflow-hidden"
          >
            <Link
              to={`/collections/detail/${item.product._id}`}
              className="flex flex-col items-start justify-center"
            >
              <figure className="relative w-full">
                <img
                  src={item.product.image[0]}
                  alt={item.product.name}
                  className="aspect-square w-full object-cover object-center"
                />
              </figure>
            </Link>
            <CardContent className="pt-2 space-y-4">
              <h2 className="text-base font-medium">{item.product.name}</h2>
              <FormAddToCart
                productId={item.product._id}
                productStock={item.product.stock}
              />
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-between gap-2">
              <h1 className="text-sm sm:text-base font-semibold text-nowrap line-clamp-1">
                <span>Total Price : </span>
                <span className="text-muted-foreground">
                  {formatCurrency(item.totalPrice)}
                </span>
              </h1>
              <ActionDeleteCartItem productId={item.product._id} />
            </CardFooter>
          </Card>
        ))}
      </main>
      <div className="fixed bottom-0 left-0 right-0 z-[999] w-full bg-secondary p-4 shadow-xl border-t-2 border-primary flex items-end justify-between gap-6">
        <ActionDeleteAllCartItem />
        <div className="w-fit flex flex-col sm:flex-row items-start sm:items-center justify-start gap-4">
          <h1 className="text-base font-semibold text-start w-fit">
            <span>Total Checkout Price : </span>
            <span>{formatCurrency(carts?.totalAmount || 0)}</span>
          </h1>
          <Button>Checkout</Button>
        </div>
      </div>
    </Container>
  );
};

export default CartsView;
