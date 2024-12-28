import { Button } from "@/components/atoms/button";
import { useDeleteCart } from "../hooks/use-delete-cart";

const ActionDeleteAllCartItem = () => {
  const { mutate: deleteAll } = useDeleteCart();
  return (
    <Button variant={"destructive"} onClick={() => deleteAll()}>
      Delete All
    </Button>
  );
};

export default ActionDeleteAllCartItem;
