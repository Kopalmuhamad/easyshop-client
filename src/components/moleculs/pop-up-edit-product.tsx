import EditProductForm from "@/features/product/components/edit-product-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../atoms/dialog";
import { PencilIcon } from "lucide-react";
import { Button } from "../atoms/button";
import { IProduct } from "@/features/product/utils/product-interface";
import { ScrollArea } from "../atoms/scroll-area";

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
        <ScrollArea className="h-[70vh]">
          <EditProductForm product={product} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PopUpEditProduct;
