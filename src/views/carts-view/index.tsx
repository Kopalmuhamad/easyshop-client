import CartCard from "@/components/organisme/carts/cart-card";
import PaymentSection from "@/components/organisme/checkout-organisme/checkout-payment";
import ProductSummary from "@/components/organisme/checkout-organisme/checkout-summary";
import ShippingAddress from "@/components/organisme/checkout-organisme/checkout-shipping-address";
import Container from "@/components/shared/container";
import Loader from "@/components/shared/loader";
import { useAddress } from "@/features/address/hooks/use-address";
import { useCarts } from "@/features/cart/hooks/use-carts";
import CheckoutForm from "@/features/order/components/checkout-form";
import { useSelectedProducts } from "@/hooks/use-selected-product";
import { formatCurrency } from "@/lib/format-currency";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageDescription,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import CustomDrawer from "@/components/shared/custom-drawer";
import { Card, CardContent } from "@/components/atoms/card";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/atoms/button";
import { CommandDialog } from "@/components/atoms/command";
import { setCheckoutSuccess } from "@/store/slices/payment-slicer";
import Logo from "@/components/shared/logo";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/atoms/scroll-area";
import PopupListAddress from "@/components/organisme/address/popup-list-address";
import { IPaymentDetails } from "@/features/order/utils/checkout-interface";
import BoxForCopy from "@/components/shared/box-for-copy";

const CartsView = () => {
  const dispatch = useDispatch();
  const handleCheckoutSuccess = () => {
    dispatch(setCheckoutSuccess(false));
  };
  const isCheckoutSuccess = useSelector(
    (state: RootState) => state.payment.checkoutSuccess
  );
  const paymentType = useSelector(
    (state: RootState) => state.payment.paymentType
  );
  const bankName = useSelector((state: RootState) => state.payment.bankName);
  const checkoutData = useSelector(
    (state: RootState) => state.payment.currentPayment
  );

  const { data: carts, isLoading: cartsLoading } = useCarts();
  const { data: defaultAddress, isLoading: defaultAddressLoading } = useAddress(
    { defaultAddress: true }
  );
  const { data: address, isLoading: addressLoading } = useAddress();

  const isLoading = cartsLoading || defaultAddressLoading || addressLoading;

  const { selectedProducts, toggleSelectProduct, totalCheckoutPrice } =
    useSelectedProducts(carts!);

  const [timeLeft, setTimeLeft] = useState<string>("");

  const isBankTransfer =
    checkoutData &&
    checkoutData?.paymentDetails?.paymentType === "bank_transfer";
  const isMandiri =
    checkoutData && checkoutData?.paymentDetails?.paymentType === "echannel";
  const isPermata =
    checkoutData && checkoutData?.paymentDetails?.paymentType === "permata";

  useEffect(() => {
    const calculateTimeLeft = () => {
      const expirationTime = new Date(
        checkoutData?.paymentDetails.transactionExpiration
      ).getTime();
      const currentTime = new Date().getTime();
      const transactionTime = new Date(
        checkoutData.paymentDetails.transactionTime
      ).getTime();

      // Validasi: Cek apakah expiration lebih besar dari waktu transaksi
      if (expirationTime <= transactionTime) {
        setTimeLeft("Invalid expiration time");
        return;
      }

      const difference = expirationTime - currentTime;

      if (difference > 0) {
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      } else {
        setTimeLeft("Expired");
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [checkoutData]);

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader size={"lg"} />
        </div>
      </div>
    );
  }

  if (!carts || !carts.items.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card>
          <CardContent className="py-4 flex items-center justify-center flex-col gap-2">
            <h1 className="text-xl font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground text-sm">
              Add some products to your cart.
            </p>
            <Link className={buttonVariants()} to={"/collections"}>
              See our collections
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <Container className="pt-20 pb-10 space-y-4">
      <HeaderPage>
        <HeaderPageContent>
          <HeaderPageTitle>Carts</HeaderPageTitle>
          <HeaderPageDescription>
            You have {carts?.items?.length} items
          </HeaderPageDescription>
        </HeaderPageContent>
      </HeaderPage>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {carts?.items?.map((product) => (
          <CartCard
            key={product._id}
            product={product}
            isSelected={
              !!selectedProducts.find((item) => item.productId === product._id)
            }
            onSelect={toggleSelectProduct}
          />
        ))}
      </div>
      <footer className="flex items-center justify-end mt-4">
        <CustomDrawer
          triggerLabel="Checkout"
          title="Checkout"
          description="Please review your items before checkout."
          footer={
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-between w-full">
                <span>Total:</span>
                <span>{formatCurrency(totalCheckoutPrice)}</span>
              </div>
              <CheckoutForm
                className="ml-auto"
                key={`${paymentType}-${bankName}`}
                address={defaultAddress && defaultAddress[0]}
                products={selectedProducts}
                paymentType={paymentType}
                bankName={
                  paymentType === "bank_transfer" ? bankName : undefined
                }
              />
            </div>
          }
        >
          <ProductSummary selectedProducts={selectedProducts} />
          <ShippingAddress defaultAddress={defaultAddress} />
          <PopupListAddress address={address} />
          <PaymentSection />
        </CustomDrawer>
      </footer>
      <CommandDialog
        open={isCheckoutSuccess}
        onOpenChange={handleCheckoutSuccess}
      >
        <header className="py-8 pb-24 pl-4 bg-secondary relative">
          <Logo />
          <div className="absolute bottom-[-60px] left-1/2 -translate-x-1/2 w-[90%] rounded-lg py-2 px-4 mx-auto drop-shadow-xl bg-primary text-primary-foreground">
            <span className="flex items-center justify-between">
              <h3 className="text-xs font-semibold">Total : </h3>
              <p className="text-xs font-semibold">
                Bayar Dalam : <span className="text-muted">{timeLeft}</span>
              </p>
            </span>
            <div className="pt-4 pb-2">
              <h1 className="text-xl md:text-2xl font-semibold">
                {formatCurrency(checkoutData?.paymentDetails?.totalAmount)}
              </h1>
              <p className="text-xs mt-3">
                <span>Order ID : </span>
                <span className="text-muted">{checkoutData?.orderId}</span>
              </p>
            </div>
          </div>
        </header>
        <ScrollArea className="h-[70vh] px-2">
          <div className="pt-24 space-y-4">
            <div>
              <h1 className="text-base font-semibold">Rincian Pengiriman</h1>
              <ul className="mt-1">
                <li className="text-sm font-normal capitalize">
                  {checkoutData?.customerDetails?.shippingDetails?.detail}
                </li>
                <li className="text-sm font-normal capitalize">
                  {checkoutData?.customerDetails?.shippingDetails?.postalCode}
                </li>
                <li className="text-sm font-normal capitalize">
                  {checkoutData?.customerDetails?.shippingDetails?.subDistrict}
                </li>
                <li className="text-sm font-normal capitalize">
                  {checkoutData?.customerDetails?.shippingDetails?.district}
                </li>
                <li className="text-sm font-normal capitalize">
                  {checkoutData?.customerDetails?.shippingDetails?.city}
                </li>
              </ul>
            </div>
            <div>
              <h1 className="text-base font-semibold">Metode Pembayaran</h1>
              {isBankTransfer && (
                <BankDetails payment={checkoutData.paymentDetails} />
              )}
              {isMandiri && (
                <MandiriDetails payment={checkoutData.paymentDetails} />
              )}
              {isPermata && (
                <PermataDetails payment={checkoutData.paymentDetails} />
              )}
            </div>
          </div>
        </ScrollArea>
      </CommandDialog>
    </Container>
  );
};

export default CartsView;

const BankDetails = ({ payment }: { payment: IPaymentDetails }) => {
  return (
    <>
      <ul className="mt-1">
        <li className="text-sm font-normal capitalize">Bank Transfer</li>
        <li className="text-sm font-medium uppercase">{payment.bankName}</li>
      </ul>
      <div className="mt-4 space-y-2">
        <header className="text-base font-semibold">Virtual code</header>
        <BoxForCopy value={payment.vaNumber} />
      </div>
    </>
  );
};

const MandiriDetails = ({ payment }: { payment: IPaymentDetails }) => {
  return (
    <>
      <ul className="mt-1">
        <li className="text-sm font-normal capitalize">Bank Transfer</li>
        <li className="text-sm font-medium uppercase">Mandiri</li>
      </ul>
      <div className="mt-4 space-y-2">
        <header className="text-base font-semibold">Bill key</header>
        <BoxForCopy value={payment.billKey} />
      </div>
      <div className="mt-4 space-y-2">
        <header className="text-base font-semibold">Bill code</header>
        <BoxForCopy value={payment.billCode} />
      </div>
    </>
  );
};

const PermataDetails = ({ payment }: { payment: IPaymentDetails }) => {
  return (
    <>
      <ul className="mt-1">
        <li className="text-sm font-normal capitalize">Bank Transfer</li>
        <li className="text-sm font-medium uppercase">Permata</li>
      </ul>
      <div className="mt-4 space-y-2">
        <header className="text-base font-semibold">Pemata Virual code</header>
        <BoxForCopy value={payment.permataVaNumber} />
      </div>
    </>
  );
};
