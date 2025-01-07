import { Badge } from "@/components/atoms/badge";
import { Card, CardContent, CardFooter } from "@/components/atoms/card";

import ActionDeleteProduct from "@/features/product/components/action-delete-product";
import { IProduct } from "@/features/product/utils/product-interface";
import { formatCurrency } from "@/lib/format-currency";
import { Link } from "react-router-dom";
import ModalAddCart from "../carts/modal-add-cart";
import { cn } from "@/lib/utils";
import ModalEditProduct from "./modal-edit-product";
import DialogAddCart from "../carts/dialog-add-cart";

interface IProps {
  isAdmin?: boolean;
  product: IProduct;
  className?: string;
  isMobile?: boolean;
}

const ProductCard = (props: IProps) => {
  const { isAdmin, product, className, isMobile = false } = props;

  if (isAdmin) {
    return (
      <Card
        key={product._id}
        className="min-w-[240px] w-full h-full rounded-md overflow-hidden"
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
            <Badge variant={"secondary"} className="absolute top-2 right-2">
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
        <CardFooter className="flex items-center justify-center gap-4">
          <ModalEditProduct product={product} />
          <ActionDeleteProduct productId={product._id} />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card
      key={product._id}
      className={cn(
        "min-w-[240px] w-full h-full rounded-md overflow-hidden",
        className
      )}
    >
      <Link
        to={`/collections/detail/${product._id}`}
        className="flex flex-col items-start justify-center"
      >
        <figure className="relative w-full h-full max-h-[300px] aspect-square shadow-sm">
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center aspect-square"
          />
          <Badge variant={"secondary"} className="absolute top-2 right-2">
            <span className="capitalize text-xs">{product.category.name}</span>
          </Badge>
        </figure>
        <CardContent className="pt-2">
          <h2 className="text-sm font-medium">{product.name}</h2>
          <h1 className="text-base font-semibold">
            {formatCurrency(product.price)}
          </h1>
        </CardContent>
      </Link>
      <CardFooter>
        {isMobile ? (
          <DialogAddCart productId={product._id} productStock={product.stock} />
        ) : (
          <ModalAddCart productId={product._id} productStock={product.stock} />
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
