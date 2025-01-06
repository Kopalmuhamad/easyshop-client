import ActionDeleteCartItem from "@/features/cart/components/action-delete-cart-item";
import FormAddToCart from "@/features/cart/components/form-add-to-cart";
import { ICartItem } from "@/features/cart/utils/cart-interface";
import { SaveIcon, TrashIcon } from "lucide-react";
import { Checkbox } from "../../atoms/checkbox";
import { cn } from "@/lib/utils";

interface IProps {
  product: ICartItem;
  isSelected: boolean;
  onSelect: (id: string, checked: boolean) => void;
}

const CartCard = ({ product, isSelected, onSelect }: IProps) => {
  return (
    <div
      className={cn(
        "h-fit relative transition-colors overflow-hidden border border-border rounded-sm",
        isSelected && "bg-secondary"
      )}
    >
      <Checkbox
        className="absolute top-1 left-1 backdrop-blur-md z-10"
        checked={isSelected}
        onCheckedChange={(checked) => {
          onSelect(product._id, checked === true);
        }}
      />
      <div
        key={product._id}
        className="grid grid-cols-[30%_50%_20%] xs:grid-cols-[30%_50%_20%] h-28 xs:h-32 lg:h-40 items-center lg:items-start"
      >
        <figure className="w-full h-24 xs:h-32 lg:h-40">
          <img
            src={product.product.image[0]}
            alt={product.product.name}
            className="w-full h-full object-cover object-center"
          />
        </figure>
        <div className="pl-1 xs:pl-2 lg:pl-3 lg:py-4 lg:space-y-4">
          <p className="text-sm lg:text-base">{product.product.name}</p>
          <div className="flex justify-start items-start">
            <FormAddToCart
              productId={product.product._id}
              productStock={product.product.stock}
            >
              <SaveIcon size={8} />
              Save
            </FormAddToCart>
          </div>
        </div>
        <div className="pr-2 h-full flex items-center justify-end">
          <ActionDeleteCartItem size={"sm"} productId={product.product._id}>
            <TrashIcon size={8} />
          </ActionDeleteCartItem>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
