import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedProduct {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

interface CheckoutState {
  selectedProducts: SelectedProduct[];
}

const initialState: CheckoutState = {
  selectedProducts: [],
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    toggleProductSelection(
      state,
      action: PayloadAction<{
        productId: string;
        quantity?: number;
        price: number;
        name: string;
      }>
    ) {
      const { productId, quantity = 1, price, name } = action.payload;
      const existingProduct = state.selectedProducts.find(
        (product) => product.productId === productId
      );

      if (existingProduct) {
        state.selectedProducts = state.selectedProducts.filter(
          (product) => product.productId !== productId
        );
      } else {
        state.selectedProducts.push({ productId, quantity, price, name });
      }
    },
    clearSelection(state) {
      state.selectedProducts = [];
    },
  },
});

export const { toggleProductSelection, clearSelection } = checkoutSlice.actions;

export default checkoutSlice.reducer;
