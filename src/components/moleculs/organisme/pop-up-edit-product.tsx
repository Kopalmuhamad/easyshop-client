import { PencilIcon } from "lucide-react";
import { IProduct } from "@/features/product/utils/product-interface";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";
import EditProductForm from "@/features/product/components/edit-product-form";

interface IPopUpEditProductProps {
  product: IProduct;
}

const PopUpEditProduct = ({ product }: IPopUpEditProductProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PencilIcon />
          <span>Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <EditProductForm product={product} />
      </DialogContent>
    </Dialog>
  );
};

export default PopUpEditProduct;
