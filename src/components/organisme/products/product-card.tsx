import { Badge } from "@/components/atoms/badge";
import { Card, CardContent, CardFooter } from "@/components/atoms/card";

import ActionDeleteProduct from "@/features/product/components/action-delete-product";
import { IProduct } from "@/features/product/utils/product-interface";
import { formatCurrency } from "@/lib/format-currency";
import { Link } from "react-router-dom";
import PopUpEditProduct from "./popup-edit-product";
import PopupAddToCart from "../carts/popup-add-to-cart";

interface IProps {
  isAdmin?: boolean;
  product: IProduct;
}

const ProductCard = (props: IProps) => {
  const { isAdmin, product } = props;

  if (isAdmin) {
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
        <CardFooter className="flex items-center justify-between gap-2">
          <PopUpEditProduct product={product} />
          <ActionDeleteProduct productId={product._id} />
        </CardFooter>
      </Card>
    );
  }

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
      <CardFooter className="flex items-center justify-between gap-2">
        <PopupAddToCart product={product} />
      </CardFooter>
    </Card>
  );
};



export default ProductCard;
