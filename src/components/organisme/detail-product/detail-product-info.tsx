import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/atoms/card";

import { IProduct } from "@/features/product/utils/product-interface";
import { formatCurrency } from "@/lib/format-currency";
import ModalAddCart from "../carts/modal-add-cart";

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
        <div className="text-sm md:text-base font-medium">
          <span>Stock : </span>
          <span className="text-muted-foreground">{product?.stock}</span>
        </div>
        <div className="text-sm md:text-base font-medium mt-1">
          <span>Category : </span>
          <span className="text-muted-foreground capitalize">
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
        <div className="w-full ">
          <ModalAddCart productId={product._id} productStock={product.stock} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default DetailProductInfo;
