import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface selectedAddress {
  addressId: string;
}

const initialState: selectedAddress = {
  addressId: "",
};

const selectedAddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setSelectedAddress: (state, action: PayloadAction<string>) => {
      state.addressId = action.payload;
    },
  },
});

export const { setSelectedAddress } = selectedAddressSlice.actions;
export default selectedAddressSlice.reducer;
