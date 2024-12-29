import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";

import Container from "@/components/shared/container";
import { useAddress } from "@/features/address/hooks/use-address";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useCarts } from "@/features/cart/hooks/use-carts";
import { formatCurrency } from "@/lib/format-currency";
import { RootState } from "@/store/store";
import { MapPinIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { toast } from "@/hooks/use-toast";
import { AxiosError } from "axios";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    snap: any; // Declare snap object
  }
}

export {};

const insertSnapScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute(
      "data-client-key",
      import.meta.env.VITE_MIDTRANS_CLIENT_KEY
    );
    script.onload = resolve;
    document.body.appendChild(script);
  });
};

const CheckoutView = () => {
  const [token, setToken] = useState<string | null>();
  const { data: address } = useAddress();
  const { data: user } = useCurrentUser();
  const { data: carts } = useCarts();

  const selectedProducts = useSelector(
    (state: RootState) => state.checkout.selectedProducts
  );

  const defaultAddress = address?.find(
    (address) => address.defaultAddress === true
  );

  // Filter carts based on selected products
  const selectedItems = carts?.items.filter((item) =>
    selectedProducts.some((product) => product.productId === item.product._id)
  );

  const totalCheckoutPrice = selectedItems?.reduce(
    (total, item) =>
      total +
      item.totalPrice *
        selectedProducts.find(
          (product) => product.productId === item.product._id
        )!.quantity,
    0
  );

  useEffect(() => {
    insertSnapScript();
  }, []);

  const handleCheckout = async () => {
    try {
      if (!user || !defaultAddress) {
        alert("Please complete your user and address information.");
        return;
      }

      const orderData = {
        userId: user._id,
        items:
          selectedItems?.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
            name: item.product.name,
          })) || [],
        customerDetails: {
          username: user.username,
          email: user.email,
          phone: user.phone,
          shippingAddress: {
            address: defaultAddress.detail,
            city: defaultAddress.city,
            postalCode: defaultAddress.postalCode,
          },
        },
      };

      // Log the order object to check if token is available
      const response = await axiosWithConfig.post("/order", orderData);
      setToken(response.data.token);
    } catch (error) {
      if (error instanceof AxiosError && error?.response) {
        toast({
          title: "Error",
          description: "Terjadi kesalahan saat membuat pesanan",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Terjadi kesalahan saat membuat pesanan",
          variant: "destructive",
        });
      }
    } finally {
      console.log(token);
      window.snap.pay(token, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onSuccess: function (result: any) {
          const resultJsonElement = document.getElementById("result-json");
          if (resultJsonElement) {
            resultJsonElement.innerHTML += JSON.stringify(result, null, 2);
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onPending: function (result: any) {
          const resultJsonElement = document.getElementById("result-json");
          if (resultJsonElement) {
            resultJsonElement.innerHTML += JSON.stringify(result, null, 2);
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: function (result: any) {
          const resultJsonElement = document.getElementById("result-json");
          if (resultJsonElement) {
            resultJsonElement.innerHTML += JSON.stringify(result, null, 2);
          }
        },
      });
    }
  };

  return (
    <Container className="pt-20 pb-10 grid grid-flow-row md:grid-cols-2 gap-3">
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

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Pesanan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {selectedItems?.map((item) => (
            <div key={item.product._id} className="flex justify-between">
              <div>
                <span className="text-base font-semibold">
                  {item.quantity} x{" "}
                </span>
                <span className="text-base font-semibold">
                  {item.product.name}
                </span>
              </div>
              <span className="text-base font-semibold text-muted-foreground">
                {formatCurrency(
                  item.totalPrice *
                    selectedProducts.find(
                      (product) => product.productId === item.product._id
                    )!.quantity
                )}
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
          <Button className="ml-auto" onClick={handleCheckout}>
            Checkout
          </Button>
        </CardFooter>
      </Card>
    </Container>
  );
};

export default CheckoutView;
