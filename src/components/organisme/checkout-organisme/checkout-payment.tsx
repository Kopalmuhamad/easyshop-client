import TabsPayment from "./chechkout-tabs-payment";

const PaymentCheckout = () => (
  <div className="p-4 space-y-4">
    <header className="border-b border-border pb-1">
      <h1 className="text-base font-semibold">Choose Payment</h1>
    </header>
    <TabsPayment />
  </div>
);

export default PaymentCheckout;
