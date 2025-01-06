import { Button } from "@/components/atoms/button";
import Loader from "@/components/shared/loader";
import { useDeleteProduct } from "../hooks/use-delete-product";
import { TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";

const ActionDeleteProduct = ({ productId }: { productId: string }) => {
  const { mutate: deleteProduct, status } = useDeleteProduct();
  const deleteLoading = status === "pending";

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={"destructive"}>
          <TrashIcon />
          <span>Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>
          <Button
            variant={"destructive"}
            onClick={() => deleteProduct(productId)}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <Loader size={"xs"} />
            ) : (
              <>
                <TrashIcon />
                <span>Delete</span>
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDeleteProduct;
