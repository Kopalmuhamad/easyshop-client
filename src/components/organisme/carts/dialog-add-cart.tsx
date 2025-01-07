import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import FormAddToCart from "@/features/cart/components/form-add-to-cart";
import { SaveIcon, ShoppingBagIcon } from "lucide-react";

const DialogAddCart = ({
  productId,
  productStock,
}: {
  productId: string;
  productStock: number;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" variant="secondary">
          Add Cart <ShoppingBagIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full flex items-center justify-center flex-col">
        <DialogHeader>
          <DialogTitle className="text-center font-playfair">
            Select Quantity
          </DialogTitle>
        </DialogHeader>
        <FormAddToCart
          className="w-fit"
          productId={productId}
          productStock={productStock}
        >
          <SaveIcon />
          Add To Cart
        </FormAddToCart>
        <DialogFooter className="py-2 bg-secondary w-full rounded-md text-base font-semibold font-playfair flex justify-center flex-row items-center">
          Thanks for your interest :)
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddCart;
