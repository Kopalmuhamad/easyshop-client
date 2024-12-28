import { Button } from "@/components/atoms/button";
import { useDeleteCartItem } from "../hooks/use-delete-cart-item";
import Loader from "@/components/shared/loader";

const ActionDeleteCartItem = ({ productId }: { productId: string }) => {
  const { mutate: delteCartItem, status } = useDeleteCartItem();
  const isLoading = status === "pending";
  return (
    <Button
      className="w-full"
      onClick={() => delteCartItem(productId)}
      variant={"destructive"}
    >
      {isLoading ? <Loader size={"xs"} /> : "Delete"}
    </Button>
  );
};

export default ActionDeleteCartItem;
