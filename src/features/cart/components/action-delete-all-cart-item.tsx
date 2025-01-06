import { Button } from "@/components/atoms/button";
import { useDeleteCart } from "../hooks/use-delete-cart";
import { cn } from "@/lib/utils";

const ActionDeleteAllCartItem = ({ className }: { className?: string }) => {
  const { mutate: deleteAll } = useDeleteCart();
  return (
    <Button
      className={cn(className)}
      variant={"destructive"}
      onClick={() => deleteAll()}
    >
      Delete All
    </Button>
  );
};

export default ActionDeleteAllCartItem;
