import { IProduct } from "@/features/product/utils/product-interface";
import { Card, CardContent, CardFooter } from "../atoms/card";
import { Badge } from "../atoms/badge";
import { formatCurrency } from "@/lib/format-currency";
import PopUpEditProduct from "./pop-up-edit-product";
import ActionDeleteProduct from "@/features/product/components/action-delete-product";

interface IAdminProductCard {
  product: IProduct;
}

const AdminProductCard = ({ product }: IAdminProductCard) => {
  return (
    <Card
      key={product._id}
      className=" max-w-[400px] w-full h-full rounded-md overflow-hidden"
    >
      <figure className="relative w-full shadow-xl">
        <img
          src={product.image[0]}
          alt={product.name}
          className="aspect-square w-full object-cover object-center"
        />
        <Badge className="absolute bottom-2 right-2">
          <span className="capitalize">{product.category.name}</span>
        </Badge>
      </figure>
      <CardContent className="pt-2">
        <h2 className="text-base font-medium">{product.name}</h2>
        <h1 className="text-xl font-semibold">
          {formatCurrency(product.price)}
        </h1>
      </CardContent>
      <CardFooter className="flex items-center justify-between gap-2">
        <PopUpEditProduct product={product} />
        <ActionDeleteProduct productId={product._id} />
      </CardFooter>
    </Card>
  );
};

export default AdminProductCard;
