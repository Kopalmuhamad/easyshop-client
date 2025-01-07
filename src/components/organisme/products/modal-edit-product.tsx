import EditProductForm from "@/features/product/components/edit-product-form";

import { PencilIcon } from "lucide-react";
import { IProduct } from "@/features/product/utils/product-interface";
import { ScrollArea } from "@/components/atoms/scroll-area";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/atoms/animated-modal";
import AnimateButton from "@/components/atoms/animate-button";

interface IModalEditProductProps {
  product: IProduct;
}

const ModalEditProduct = ({ product }: IModalEditProductProps) => {
  return (
    <>
      <Modal>
        <ModalTrigger className="p-0 w-full">
          <AnimateButton
            initialContent="Edit"
            variant="secondary"
            className="w-full"
          >
            <PencilIcon className="fill-foreground" />
          </AnimateButton>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <h1>Edit Product</h1>
            <ScrollArea className="h-[70vh]">
              <EditProductForm product={product} />
            </ScrollArea>
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ModalEditProduct;
