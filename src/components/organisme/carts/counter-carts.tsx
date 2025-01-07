import NumberTicker from "@/components/atoms/number-ticker";
import { ICart } from "@/features/cart/utils/cart-interface";
import { cn } from "@/lib/utils";

const CounterCarts = ({
  carts,
  className,
}: {
  carts: ICart;
  className?: string;
}) => (
  <div
    className={cn(
      "text-[9px] rounded-full bg-primary text-primary-foreground w-4 h-4 flex items-center justify-center",
      className
    )}
  >
    <NumberTicker value={carts?.items?.length || 0} />
  </div>
);

export default CounterCarts;
