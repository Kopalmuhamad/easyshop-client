import { buttonVariants } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import BoxForCopy from "@/components/shared/box-for-copy";
import Container from "@/components/shared/container";
import Loader from "@/components/shared/loader";
import { useUserOrder } from "@/features/order/hooks/use-user-order";
import { IPaymentDetails } from "@/features/order/utils/checkout-interface";
import { formatCurrency } from "@/lib/format-currency";
import { format } from "date-fns";
import { TruckIcon } from "lucide-react";
import { Link } from "react-router-dom";

const OrderView = () => {
  const { data: userOrder, isLoading: userOrderLoading } = useUserOrder();
  const isLoading = userOrderLoading;

  const sortedOrders = userOrder
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader size={"lg"} />
        </div>
      </div>
    );
  }
  if (!userOrder || userOrder.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Card className="flex items-center justify-center flex-col">
          <CardHeader>
            <TruckIcon size={50} />
          </CardHeader>
          <CardContent className="flex items-center justify-center flex-col gap-2">
            <CardTitle>You don&apos;t have any order</CardTitle>
            <CardDescription>Please order something first</CardDescription>
          </CardContent>
          <CardFooter>
            <Link
              to={"/collections"}
              className={buttonVariants({ variant: "secondary" })}
            >
              See our collection
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <Container className="space-y-4 pt-20 pb-10">
      <HeaderPage>
        <HeaderPageContent>
          <HeaderPageTitle>Order</HeaderPageTitle>
        </HeaderPageContent>
      </HeaderPage>
      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedOrders?.map((order) => (
            <Card key={order._id}>
              <CardHeader>
                <div>
                  <h1 className="text-sm font-semibold">
                    {format(
                      new Date(order.paymentDetails.transactionTime),
                      "EEEE, HH:mm:ss, dd, MM, yyyy"
                    )}
                  </h1>
                </div>
                <div>
                  <header className="text-sm font-semibold">
                    Methode Pembayaran
                  </header>
                  {order.paymentDetails.paymentType === "bank_transfer" && (
                    <BankDetails payment={order.paymentDetails} />
                  )}
                  {order.paymentDetails.paymentType === "echannel" && (
                    <MandiriDetails payment={order.paymentDetails} />
                  )}
                  {order.paymentDetails.paymentType === "permata" && (
                    <PermataDetails payment={order.paymentDetails} />
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="mt-2">
                  <header className="text-sm font-semibold">
                    Alamat Pengiriman
                  </header>
                  <div className="w-full flex flex-col items-start bg-muted rounded-md px-2 py-1">
                    <h3 className="text-sm font-semibold text-muted-foreground capitalize border-b border-foreground w-full">
                      {order.customerDetails.shippingDetails.detail}
                    </h3>
                    <span className="mt-1 text-sm text-muted-foreground capitalize">
                      {order.customerDetails.shippingDetails.detail},{" "}
                      {order.customerDetails.shippingDetails.postalCode},{" "}
                      {order.customerDetails.shippingDetails.subDistrict},{" "}
                      {order.customerDetails.shippingDetails.district},{" "}
                      {order.customerDetails.shippingDetails.city},{" "}
                    </span>
                    <div className="flex items-center justify-between w-full py-2">
                      <span className="text-muted-foreground text-sm font-medium">
                        Status Pengiriman:
                      </span>
                      <span className="text-muted-foreground text-sm font-medium capitalize">
                        {order.customerDetails.shippingDetails.shippingStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-start gap-2">
                <div className="w-full">
                  <header className="text-sm font-semibold">Products</header>
                  {order.products.map((product) => (
                    <div className="w-full flex items-center justify-between bg-muted rounded-md px-2 py-1">
                      <span className="text-sm font-medium text-muted-foreground">
                        {product.name}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {product.quantity} X {formatCurrency(product.price)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-sm font-semibold">Total : </span>
                  <span className="text-sm font-semibold">
                    {formatCurrency(order.paymentDetails.totalAmount)}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </Container>
  );
};

export default OrderView;

const BankDetails = ({ payment }: { payment: IPaymentDetails }) => {
  return (
    <>
      <div className="w-full flex flex-col items-start bg-muted rounded-md gap-1 px-2 py-1">
        <span className="text-muted-foreground text-sm font-medium">
          Bank transfer
        </span>
        <span className="text-muted-foreground text-sm font-medium uppercase">
          {payment.bankName}
        </span>
        <span className="text-muted-foreground text-sm font-medium capitalize">
          <span>Payment status : </span>
          <span
            className={`${
              payment.paymentStatus === "pending" && "text-destructive"
            }`}
          >
            {payment.paymentStatus}
          </span>
        </span>
      </div>
      {payment.paymentStatus === "pending" && (
        <div className="mt-2 space-y-2">
          <header className="text-sm font-medium">Virtual account</header>
          <BoxForCopy value={payment.vaNumber} />
        </div>
      )}
    </>
  );
};

const MandiriDetails = ({ payment }: { payment: IPaymentDetails }) => {
  return (
    <>
      <div className="w-full flex flex-col items-start bg-muted rounded-md gap-1 px-2 py-1">
        <span className="text-muted-foreground text-sm font-medium">
          Bank transfer
        </span>
        <span className="text-muted-foreground text-sm font-medium capitalize">
          Mandiri
        </span>
        <span className="text-muted-foreground text-sm font-medium capitalize">
          <span>Payment status : </span>
          <span
            className={`${
              payment.paymentStatus === "pending" && "text-destructive"
            }`}
          >
            {payment.paymentStatus}
          </span>
        </span>
      </div>
      {payment.paymentStatus === "pending" && (
        <>
          <div className="mt-2 space-y-2">
            <header className="text-sm font-medium">Bill Key</header>
            <BoxForCopy value={payment.billKey} />
          </div>
          <div className="mt-2 space-y-2">
            <header className="text-sm font-medium">Bill Code</header>
            <BoxForCopy value={payment.billCode} />
          </div>
        </>
      )}
    </>
  );
};

const PermataDetails = ({ payment }: { payment: IPaymentDetails }) => {
  return (
    <>
      <div className="w-full flex flex-col items-start bg-muted rounded-md gap-1 px-2 py-1">
        <span className="text-muted-foreground text-sm font-medium">
          Bank transfer
        </span>
        <span className="text-muted-foreground text-sm font-medium capitalize">
          Permata
        </span>
        <span className="text-muted-foreground text-sm font-medium capitalize">
          <span>Payment status : </span>
          <span
            className={`${
              payment.paymentStatus === "pending" && "text-destructive"
            }`}
          >
            {payment.paymentStatus}
          </span>
        </span>
      </div>
      {payment.paymentStatus === "pending" && (
        <div className="mt-2 space-y-2">
          <header className="text-sm font-medium">
            Permata virtual account
          </header>
          <BoxForCopy value={payment.permataVaNumber} />
        </div>
      )}
    </>
  );
};
