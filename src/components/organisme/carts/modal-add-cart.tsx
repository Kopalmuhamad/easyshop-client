import AnimateButton from "@/components/atoms/animate-button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/atoms/animated-modal";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import FormAddToCart from "@/features/cart/components/form-add-to-cart";
import { SaveIcon, ShoppingBagIcon } from "lucide-react";

interface IProps {
  productId: string;
  productStock: number;
}

const ModalAddCart = (props: IProps) => {
  const { productId, productStock } = props;
  return (
    <Modal>
      <ModalTrigger className="w-full p-0">
        <AnimateButton
          initialContent="Add cart"
          className="w-full"
          variant="secondary"
        >
          <ShoppingBagIcon size={16} className="fill-foreground" />
        </AnimateButton>
      </ModalTrigger>
      <ModalBody>
        <ModalContent className="flex flex-col items-center justify-center">
          <HeaderPage className="mb-8">
            <HeaderPageContent className="flex items-center justify-center">
              <HeaderPageTitle className="text-center font-playfair">
                Select Quantity
              </HeaderPageTitle>
            </HeaderPageContent>
          </HeaderPage>
          <FormAddToCart
            className="w-fit"
            productId={productId}
            productStock={productStock}
          >
            <SaveIcon />
            Add To Cart
          </FormAddToCart>
        </ModalContent>
        <ModalFooter className="text-base font-semibold font-playfair flex justify-center">
          Thanks for your interest :)
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
};

export default ModalAddCart;
