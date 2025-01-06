import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/atoms/form";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { checkoutSchema } from "../utils/checkout-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { Input } from "@/components/atoms/input";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/atoms/button";
import { IAddress } from "@/features/address/utils/interface-address";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useDispatch } from "react-redux";
import {
  setCheckoutData,
  setCheckoutSuccess,
} from "@/store/slices/payment-slicer";
import { cn } from "@/lib/utils";

interface Items {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

interface IProps {
  address: IAddress | undefined;
  products: Items[];
  paymentType: "bank_transfer" | "gopay" | "permata" | "echannel";
  bankName?: "bca" | "bni" | "bri" | "cimb";
  className?: string;
}

const CheckoutForm = ({
  className,
  address,
  products,
  paymentType,
  bankName,
}: IProps) => {
  const [token, setToken] = useState<string>("");
  const dispatch = useDispatch();
  const { data: user } = useCurrentUser();
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      products: products,
      customerDetails: {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
        shippingDetails: {
          detail: address?.detail,
          postalCode: address?.postalCode,
          subDistrict: address?.subDistrict,
          district: address?.district,
          city: address?.city,
          province: address?.province,
          country: address?.country,
        },
      },
      paymentDetails: {
        paymentType: paymentType,
        ...(paymentType === "bank_transfer" ? { bankName: bankName } : {}),
      },
    },
  });

  const { control, handleSubmit } = form;

  const { fields: itemFields, append: appendItem } = useFieldArray({
    control,
    name: "products",
  });

  const onSubmit = async (data: z.infer<typeof checkoutSchema>) => {
    try {
      const config = {
        headers: {
          Accept: "application/json",
          Authorization:
            "Basic " + btoa(`${import.meta.env.VITE_MIDTRANS_SERVER_KEY}`),
        },
      };
      const response = await axiosWithConfig.post("/checkout", data, config);
      setToken(response.data.token);
      dispatch(setCheckoutSuccess(true));
      dispatch(setCheckoutData(response.data.data));
    } catch (error) {
      toast({
        title: "Error",
        description: error + "Terjadi kesalahan saat mengirim data.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      paymentDetails: {
        paymentType: paymentType,
        ...(paymentType === "bank_transfer" ? { bankName: bankName } : {}),
      },
    });
  }, [paymentType, bankName]);

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
          toast({
            title: "Success",
            description: "Payment success",
          });
          setToken("");
        },
        onPending: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
          toast({
            title: "Pending",
            description: "Payment pending",
          });
          setToken("");
        },
        onError: (result) => {
          console.log(result);
          toast({
            title: "Error",
            description: "Payment error",
            variant: "destructive",
          });
          setToken("");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = import.meta.env.VITE_MIDTRANS_SNAP_SCRIPT;

    const scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn(
          "md:col-span-2 flex flex-col items-start justify-start p-4",
          className
        )}
      >
        <div className="hidden">
          {/* Items */}
          <div>
            <FormLabel>Items</FormLabel>
            {itemFields.map((item, index) => (
              <div key={item.id} className="space-y-2 border p-3 rounded">
                <FormField
                  name={`products.${index}.productId`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product ID</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Product ID" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name={`products.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Product Name" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name={`products.${index}.quantity`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Quantity"
                          type="number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  name={`products.${index}.price`}
                  control={control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Price" type="number" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendItem({ productId: "", quantity: 1, price: 0, name: "" })
              }
            >
              Add Item
            </Button>
          </div>

          {/* Customer Details */}
          <div className="space-y-4">
            <FormField
              name="customerDetails.username"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Username" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="customerDetails.email"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Email" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="customerDetails.phone"
              control={control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Phone" />
                  </FormControl>
                </FormItem>
              )}
            />
            <div>
              <FormLabel>Shipping Address</FormLabel>
              <FormField
                name="customerDetails.shippingDetails.detail"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detail</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Detail" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="customerDetails.shippingDetails.postalCode"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Postal Code" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="customerDetails.shippingDetails.subDistrict"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subdistrict</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Subdistrict" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="customerDetails.shippingDetails.district"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="District" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="customerDetails.shippingDetails.city"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="City" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="customerDetails.shippingDetails.province"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provence</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Provence" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="customerDetails.shippingDetails.country"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Country" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
