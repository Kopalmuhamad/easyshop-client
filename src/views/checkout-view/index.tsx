import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";

import Container from "@/components/shared/container";
import Loader from "@/components/shared/loader";
import { useAddress } from "@/features/address/hooks/use-address";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import CreateOrderForm from "@/features/order/components/create-order-form";
import { formatCurrency } from "@/lib/format-currency";
import { RootState } from "@/store/store";
import { MapPinIcon } from "lucide-react";
import { useSelector } from "react-redux";

const CheckoutView = () => {
  const { data: address } = useAddress();
  const { data: user } = useCurrentUser();

  const selectedProducts = useSelector(
    (state: RootState) => state.checkout.selectedProducts
  );

  const defaultAddress = address?.find(
    (address) => address.defaultAddress === true
  );

  const totalCheckoutPrice = selectedProducts?.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  if (!user || !defaultAddress || !selectedProducts.length) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  return (
    <Container className="pt-20 pb-10 grid grid-flow-row md:grid-cols-2 gap-3">
      {/* Address Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xs flex items-center justify-start gap-1">
            <MapPinIcon size={12} />
            <span>Alamat Pengiriman</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            {user?.username} {user?.phone}
          </p>
          <p className="text-sm">{defaultAddress?.detail}</p>
          <p className="uppercase">
            {defaultAddress?.district} - {defaultAddress?.subDistrict} -{" "}
            {defaultAddress?.city}, {defaultAddress?.province},{" "}
            {defaultAddress?.postalCode}
          </p>
        </CardContent>
        <CardFooter>
          <Button>Ganti Alamat</Button>
        </CardFooter>
      </Card>

      {/* Order Form */}
      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Pesanan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {selectedProducts?.map((product) => (
            <div key={product.productId} className="flex justify-between">
              <div>
                <span className="text-base font-semibold">
                  {product.quantity} x{" "}
                </span>
                <span className="text-base font-semibold">{product.name}</span>
              </div>
              <span className="text-base font-semibold text-muted-foreground">
                {formatCurrency(product.price * product.quantity)}
              </span>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex items-center justify-center flex-col gap-4">
          <div className="flex justify-between w-full">
            <span className="font-semibold">Total Harga:</span>
            <span className="font-semibold">
              {formatCurrency(totalCheckoutPrice || 0)}
            </span>
          </div>

          {/* Add CreateOrderForm component here */}
        </CardFooter>
      </Card>
      <CreateOrderForm
        user={user!} // Passing the current user
        items={selectedProducts} // Passing the selected products
        address={defaultAddress!} // Passing the default address
      />
    </Container>
  );
};

export default CheckoutView;
