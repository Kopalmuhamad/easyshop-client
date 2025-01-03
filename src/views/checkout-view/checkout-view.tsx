import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import Container from "@/components/shared/container";
import { useAddress } from "@/features/address/hooks/use-address";
import CheckoutForm from "@/features/order/components/checkout-form";
import { formatCurrency } from "@/lib/format-currency";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const CheckoutView = () => {
  const { data: address } = useAddress({
    defaultAddress: true,
  });

  const selectedProducts = useSelector(
    (state: RootState) => state.checkout.selectedProducts
  );

  const totalCheckoutPrice = selectedProducts?.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  if (!address) {
    return <div>Please Choose Address</div>;
  }

  if (!selectedProducts) {
    return <div>Please Choose Product</div>;
  }

  return (
    <Container className="grid md:grid-cols-2 gap-2 pt-32">
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
          <CardDescription>Choose your address</CardDescription>
        </CardHeader>
        <CardContent>
          <CardTitle className="capitalize text-sm">
            {address[0]?.detail}
          </CardTitle>
          <CardDescription>
            {address[0]?.postalCode}, {address[0]?.subDistrict},{" "}
            {address[0]?.district}, {address[0]?.city}, {address[0]?.province}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button>Manage Address</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Summary Order</CardTitle>
        </CardHeader>
        <CardContent>
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
        <CardFooter>
          <div className="flex justify-between w-full">
            <span className="font-semibold">Total Harga:</span>
            <span className="font-semibold">
              {formatCurrency(totalCheckoutPrice || 0)}
            </span>
          </div>
        </CardFooter>
      </Card>
      <CheckoutForm address={address[0]} products={selectedProducts} />
    </Container>
  );
};

export default CheckoutView;
