import { ICheckoutData } from "@/features/order/utils/checkout-interface";
import { createSlice } from "@reduxjs/toolkit";

interface IPaymentType {
  value: "bank_transfer" | "gopay" | "permata" | "echannel";
}

interface IBankName {
  value: "bca" | "bni" | "bri" | "cimb" | undefined;
}

interface ICheckoutSuccess {
  value: boolean;
}

interface ICurrentPayment {
  data: ICheckoutData;
}

const initialState = {
  paymentType: "bank_transfer" as IPaymentType["value"],
  bankName: undefined as IBankName["value"],
  checkoutSuccess: false as ICheckoutSuccess["value"],
  currentPayment: {} as ICurrentPayment["data"],
};

const paymentSlicer = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPaymentType: (state, action) => {
      state.paymentType = action.payload;
    },
    setBankName: (state, action) => {
      state.bankName = action.payload;
    },
    setCheckoutSuccess: (state, action) => {
      state.checkoutSuccess = action.payload;
    },
    setCheckoutData: (state, action) => {
      state.currentPayment = action.payload;
    },
  },
});

export const {
  setPaymentType,
  setBankName,
  setCheckoutSuccess,
  setCheckoutData,
} = paymentSlicer.actions;
export default paymentSlicer.reducer;
