import { Button } from "@/components/atoms/button";
import Loader from "@/components/shared/loader";
import { useDeleteProduct } from "../hooks/use-delete-product";
import { TrashIcon } from "lucide-react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/atoms/animated-modal";
import AnimateButton from "@/components/atoms/animate-button";

const ActionDeleteProduct = ({ productId }: { productId: string }) => {
  const { mutate: deleteProduct, status } = useDeleteProduct();
  const deleteLoading = status === "pending";

  return (
    <>
      <Modal>
        <ModalTrigger className="p-0 w-full">
          <AnimateButton
            initialContent="Delete"
            variant="destructive"
            className="w-full"
          >
            <TrashIcon />
          </AnimateButton>
        </ModalTrigger>
        <ModalBody>
          <ModalContent className="flex items-center justify-center flex-col">
            <h1 className="text-center font-semibold">Delete Product</h1>
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this product?
            </p>
            <Button
              className="mt-3"
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
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ActionDeleteProduct;
