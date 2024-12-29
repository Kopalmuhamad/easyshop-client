import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedProduct {
  productId: string;
  quantity: number;
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
      action: PayloadAction<{ productId: string; quantity?: number }>
    ) {
      const { productId, quantity = 1 } = action.payload;
      const existingProduct = state.selectedProducts.find(
        (product) => product.productId === productId
      );

      if (existingProduct) {
        state.selectedProducts = state.selectedProducts.filter(
          (product) => product.productId !== productId
        );
      } else {
        state.selectedProducts.push({ productId, quantity });
      }
    },
    clearSelection(state) {
      state.selectedProducts = [];
    },
  },
});

export const { toggleProductSelection, clearSelection } = checkoutSlice.actions;

export default checkoutSlice.reducer;
