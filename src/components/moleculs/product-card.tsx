import { IProduct } from "@/features/product/utils/product-interface";
import { Card, CardContent, CardFooter } from "../atoms/card";
import { Badge } from "../atoms/badge";
import { formatCurrency } from "@/lib/format-currency";
import PopUpEditProduct from "./pop-up-edit-product";
import ActionDeleteProduct from "@/features/product/components/action-delete-product";
import { Button } from "../atoms/button";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../atoms/dialog";
import FormAddToCart from "@/features/cart/components/form-add-to-cart";

interface IProductCardProps {
  product: IProduct;
  isAdmin?: boolean;
}

const ProductCard = ({ product, isAdmin = false }: IProductCardProps) => {
  return (
    <Card
      key={product._id}
      className=" max-w-[300px] w-full h-full rounded-md overflow-hidden"
    >
      <Link
        to={`/collections/detail/${product._id}`}
        className="flex flex-col items-start justify-center"
      >
        <figure className="relative w-full">
          <img
            src={product.image[0]}
            alt={product.name}
            className="aspect-square w-full object-cover object-center"
          />
          <Badge className="absolute top-2 right-2">
            <span className="capitalize">{product.category.name}</span>
          </Badge>
        </figure>
        <CardContent className="pt-2">
          <h2 className="text-base font-medium">{product.name}</h2>
          <h1 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h1>
        </CardContent>
      </Link>
      {isAdmin ? (
        <CardFooter className="flex items-center justify-between gap-2">
          <PopUpEditProduct product={product} />
          <ActionDeleteProduct productId={product._id} />
        </CardFooter>
      ) : (
        <CardFooter className="flex items-center justify-between gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">Add to cart</Button>
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
                />
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;
