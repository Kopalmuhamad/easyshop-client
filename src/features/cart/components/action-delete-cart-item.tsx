import { Button } from "@/components/atoms/button";
import { useDeleteCartItem } from "../hooks/use-delete-cart-item";
import Loader from "@/components/shared/loader";
import { cn } from "@/lib/utils";

const ActionDeleteCartItem = ({
  productId,
  className,
  size,
  children: content,
}: {
  productId: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon" | undefined | null;
  children: React.ReactNode | string;
}) => {
  const { mutate: delteCartItem, status } = useDeleteCartItem();
  const isLoading = status === "pending";
  return (
    <Button
      className={cn(className)}
      onClick={() => delteCartItem(productId)}
      variant={"destructive"}
      size={size}
    >
      {isLoading ? <Loader size={"xs"} /> : content}
    </Button>
  );
};

export default ActionDeleteCartItem;
