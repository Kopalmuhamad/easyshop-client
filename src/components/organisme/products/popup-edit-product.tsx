import EditProductForm from "@/features/product/components/edit-product-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import { PencilIcon } from "lucide-react";
import { Button } from "@/components/atoms/button";
import { IProduct } from "@/features/product/utils/product-interface";
import { ScrollArea } from "@/components/atoms/scroll-area";

interface IPopupEditProductProps {
  product: IProduct;
}

const PopupEditProduct = ({ product }: IPopupEditProductProps) => {
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
        <ScrollArea className="h-[70vh]">
          <EditProductForm product={product} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PopupEditProduct;
