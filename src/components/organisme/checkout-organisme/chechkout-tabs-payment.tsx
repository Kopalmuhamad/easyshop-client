import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setBankName, setPaymentType } from "@/store/slices/payment-slicer";
import { cn } from "@/lib/utils";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/atoms/tabs";
import { Card, CardContent } from "@/components/atoms/card";

const CheckoutTabsPayment = () => {
  const dispatch = useDispatch();

  // Ambil nilai paymentType dari Redux state
  const selectedPaymentType = useSelector(
    (state: RootState) => state.payment.paymentType
  );

  const selectedBank = useSelector(
    (state: RootState) => state.payment.bankName
  );

  // Fungsi untuk mengatur paymentType ke Redux state
  const handlePaymentType = (paymentType: string) => {
    if (paymentType === "echannel" || paymentType === "permata") {
      dispatch(setBankName(undefined));
      dispatch(setPaymentType(paymentType));
    } else if (paymentType === "gopay") {
      dispatch(setBankName(undefined));
      dispatch(setPaymentType(paymentType));
    } else {
      dispatch(setPaymentType(paymentType));
    }
  };

  const handleBankName = (bankName: string) => {
    if (
      bankName === "bca" ||
      bankName === "bni" ||
      bankName === "bri" ||
      bankName === "cimb"
    ) {
      dispatch(setPaymentType("bank_transfer"));
      dispatch(setBankName(bankName));
    }
  };

  const tabValue =
    selectedPaymentType === "permata" || selectedPaymentType === "echannel"
      ? "bank_transfer"
      : selectedPaymentType;

  return (
    <Tabs
      defaultValue="bank_transfer"
      value={tabValue}
      onValueChange={(value) => handlePaymentType(value)}
      className="w-full"
    >
      <TabsList className="w-full">
        <TabsTrigger value="bank_transfer">Bank Transfer</TabsTrigger>
        <TabsTrigger value="gopay">QRIS</TabsTrigger>
      </TabsList>
      <TabsContent value="bank_transfer">
        <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3">
          <Card
            onClick={() => handleBankName("bca")}
            className={cn(
              "cursor-pointer hover:bg-secondary rounded-lg transition-colors",
              selectedBank === "bca" && "bg-secondary"
            )}
          >
            <CardContent className="p-2 py-4 text-center">BCA</CardContent>
          </Card>
          <Card
            onClick={() => handleBankName("bri")}
            className={cn(
              "cursor-pointer hover:bg-secondary rounded-lg transition-colors",
              selectedBank === "bri" && "bg-secondary"
            )}
          >
            <CardContent className="p-2 py-4 text-center">BRI</CardContent>
          </Card>
          <Card
            onClick={() => handleBankName("bni")}
            className={cn(
              "cursor-pointer hover:bg-secondary rounded-lg transition-colors",
              selectedBank === "bni" && "bg-secondary"
            )}
          >
            <CardContent className="p-2 py-4 text-center">BNI</CardContent>
          </Card>
          <Card
            onClick={() => handleBankName("cimb")}
            className={cn(
              "cursor-pointer hover:bg-secondary rounded-lg transition-colors",
              selectedBank === "cimb" && "bg-secondary"
            )}
          >
            <CardContent className="p-2 py-4 text-center">CIMB</CardContent>
          </Card>
          <Card
            onClick={() => handlePaymentType("permata")}
            className={cn(
              "cursor-pointer hover:bg-secondary rounded-lg transition-colors",
              selectedPaymentType === "permata" && "bg-secondary"
            )}
          >
            <CardContent className="p-2 py-4 text-center">Permata</CardContent>
          </Card>
          <Card
            onClick={() => handlePaymentType("echannel")}
            className={cn(
              "cursor-pointer hover:bg-secondary rounded-lg transition-colors",
              selectedPaymentType === "echannel" && "bg-secondary"
            )}
          >
            <CardContent className="p-2 py-4 text-center">Mandiri</CardContent>
          </Card>
        </div>
      </TabsContent>
      <TabsContent value="gopay">
        This feature is still under development.
      </TabsContent>
    </Tabs>
  );
};

export default CheckoutTabsPayment;
