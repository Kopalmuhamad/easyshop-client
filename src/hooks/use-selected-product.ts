import { useCarts } from "@/features/cart/hooks/use-carts";
import { toggleProductSelection } from "@/store/slices/selected-order-slice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const useSelectedProduct = () => {
  const dispatch = useDispatch();
  const { data: carts } = useCarts();

  const selectedProducts = useSelector(
    (state: RootState) => state.checkout.selectedProducts
  );

  const selectedItems = carts?.items.filter((item) =>
    selectedProducts.some((product) => product.productId === item.product._id)
  );

  const totalCheckoutPrice = selectedItems?.reduce(
    (total, item) =>
      total +
      item.totalPrice *
        selectedProducts.find(
          (product) => product.productId === item.product._id
        )!.quantity,
    0
  );

  const handleCheckboxChange = (productId: string, quantity: number = 1) => {
    dispatch(toggleProductSelection({ productId, quantity }));
  };
  return {};
};

export default useSelectedProduct;
