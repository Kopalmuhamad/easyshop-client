import { ICart } from "@/features/cart/utils/cart-interface";
import { useState, useCallback } from "react";

export interface ISelectedProducts {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export const useSelectedProducts = (carts: ICart) => {
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProducts[]>(
    []
  );

  const toggleSelectProduct = useCallback(
    (productId: string, checked: boolean) => {
      if (checked) {
        const product = carts?.items.find((item) => item._id === productId);
        if (product) {
          setSelectedProducts((prev) => [
            ...prev,
            {
              productId: product._id,
              quantity: product.quantity,
              price: product.product.price,
              name: product.product.name,
            },
          ]);
        }
      } else {
        setSelectedProducts((prev) =>
          prev.filter((product) => product.productId !== productId)
        );
      }
    },
    [carts?.items]
  );

  const totalCheckoutPrice = selectedProducts.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return {
    selectedProducts,
    toggleSelectProduct,
    totalCheckoutPrice,
  };
};
