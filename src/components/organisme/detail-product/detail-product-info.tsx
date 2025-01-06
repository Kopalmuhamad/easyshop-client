import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/atoms/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import FormAddToCart from "@/features/cart/components/form-add-to-cart";
import { IProduct } from "@/features/product/utils/product-interface";
import { formatCurrency } from "@/lib/format-currency";
import { CreditCardIcon, SaveIcon } from "lucide-react";

const DetailProductInfo = ({ product }: { product: IProduct }) => {
  return (
    <Card className="pt-4 md:pt-0 justify-self-start w-full h-full">
      <CardHeader>
        <h3 className="text-sm md:text-base font-semibold">{product?.name}</h3>
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
          <p className="text-muted-foreground line-clamp-5">
            {product?.description}
          </p>
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
                Are you sure you want to add this product to your cart? please
                select the quantity
              </DialogDescription>
              <FormAddToCart
                productId={product?._id}
                productStock={product?.stock}
              >
                <SaveIcon />
                Add To Cart
              </FormAddToCart>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Button>
          <CreditCardIcon />
          <span>Buy now</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DetailProductInfo;
