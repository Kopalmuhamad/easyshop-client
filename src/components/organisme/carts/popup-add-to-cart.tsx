import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import FormAddToCart from "@/features/cart/components/form-add-to-cart";
import { IProduct } from "@/features/product/utils/product-interface";
import { SaveIcon } from "lucide-react";

const PopupAddToCart = ({ product }: { product: IProduct }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"} className="w-full">
          Add to cart
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[250px]">
        <DialogHeader>
          <DialogTitle className="text-center">Add to cart</DialogTitle>
          <FormAddToCart
            className="items-center pt-2"
            productId={product?._id}
            productStock={product?.stock}
          >
            <SaveIcon />
            Add To Cart
          </FormAddToCart>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PopupAddToCart;
