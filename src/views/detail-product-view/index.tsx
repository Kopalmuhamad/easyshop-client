import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import { Separator } from "@/components/atoms/separator";
import ProductCard from "@/components/moleculs/product-card";
import Container from "@/components/shared/container";
import Loader from "@/components/shared/loader";
import FormAddToCart from "@/features/cart/components/form-add-to-cart";
import { useProduct } from "@/features/product/hooks/use-product";
import { useProducts } from "@/features/product/hooks/use-products";
import { formatCurrency } from "@/lib/format-currency";
import { CreditCardIcon } from "lucide-react";

const DetailProductView = ({ productId }: { productId: string }) => {
  const { data: product, isLoading: productLoading } = useProduct(productId!);

  const { data: productsData, isLoading: productsLoading } = useProducts({
    category: product?.category._id,
  });

  const loading = productLoading || productsLoading;

  const { products } = productsData || {};

  const filteredProducts = products?.filter(
    (product) => product._id !== productId
  );

  if (loading) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Product not found</CardTitle>
            <CardDescription>
              This product maybe deleted or run out of stock
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Container className="grid grid-cols-1 md:grid-cols-[auto_1fr] pt-20 pb-10 gap-4">
        <figure className="relative xs:w-[300px] lg:w-[400px] drop-shadow-xl rounded-md overflow-hidden">
          <img src={product?.image} alt={product?.name} />
          <Badge className="absolute top-2 right-2 capitalize">
            {product?.category.name}
          </Badge>
        </figure>
        <main className="pt-4 md:pt-0 justify-self-start w-full">
          <Card className="h-full">
            <CardHeader>
              <h3 className="text-sm md:text-base font-semibold">
                {product?.name}
              </h3>
              <h1 className="text-xl md:text-2xl font-bold mt-1">
                {formatCurrency(product?.price)}
              </h1>
            </CardHeader>
            <CardContent>
              <div className="text-sm md:text-base font-medium mt-2">
                <span>Stock : </span>
                <span className="text-muted-foreground">{product?.stock}</span>
              </div>
              <div className="text-sm md:text-base font-medium mt-1">
                <span>Category : </span>
                <span className="text-muted-foreground">
                  {product?.category.name}
                </span>
              </div>
              <div className="text-sm md:text-base font-medium mt-1">
                <span>Description : </span>
                <p className="text-muted-foreground">{product?.description}</p>
              </div>
            </CardContent>
            <CardFooter className="space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Add to cart</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add to cart</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to add this product to your cart?
                      please select the quantity
                    </DialogDescription>
                    <FormAddToCart
                      productId={product?._id}
                      productStock={product?.stock}
                    />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button>
                <CreditCardIcon />
                <span>Buy now</span>
              </Button>
            </CardFooter>
          </Card>
        </main>
      </Container>
      <Separator />
      <Container className="pt-10 pb-10 space-y-4">
        <header>
          <h1 className="text-xl font-semibold">Related Products</h1>
        </header>
        {!filteredProducts ? (
          <Card>
            <CardHeader>
              <CardTitle>We don't have any related products</CardTitle>
              <CardDescription>Please stay tuned for updates</CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <Carousel>
            <CarouselContent>
              {filteredProducts?.map((product) => (
                <CarouselItem key={product._id} className="basis-1/1">
                  <ProductCard key={product._id} product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
      </Container>
    </>
  );
};

export default DetailProductView;
