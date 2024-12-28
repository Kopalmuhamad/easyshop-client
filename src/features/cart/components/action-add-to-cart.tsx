import { Button } from "@/components/atoms/button";
import { useCreateCart } from "../hooks/use-create-cart";

interface IProps {
  productId: string;
  quantity: number;
}

const ActionAddToCart = ({ productId, quantity }: IProps) => {
  const { mutate: addToCart } = useCreateCart();
  return (
    <Button onClick={() => addToCart({ productId, quantity })}>
      Add to cart
    </Button>
  );
};

export default ActionAddToCart;
