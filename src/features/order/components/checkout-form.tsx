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

function insertSnapScript() {
  return new Promise((resolve, reject) => {
    // Cek apakah script sudah dimuat
    if (window.snap) {
      resolve("Snap.js sudah dimuat.");
      return;
    }

    const script = document.createElement("script");
    const snapScript = import.meta.env.VITE_MIDTRANS_SNAP_SCRIPT;
    const midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    // Cek apakah URL dan kunci klien valid
    if (!snapScript || !midtransClientKey) {
      toast({
        title: "Error",
        description: "Snap.js URL atau kunci klien tidak ditemukan.",
        variant: "destructive",
      });
      reject("Snap.js URL atau kunci klien tidak ditemukan.");
      return;
    }

    script.src = snapScript;
    script.type = "text/javascript";
    script.dataset.clientKey = midtransClientKey;
    script.setAttribute("data-client-key", midtransClientKey);

    script.onload = () => {
      resolve("Snap.js berhasil dimuat.");
    };

    script.onerror = () => {
      toast({
        title: "Error",
        description: "Gagal memuat Snap.js. Periksa koneksi internet Anda.",
        variant: "destructive",
      });
      reject("Gagal memuat Snap.js.");
    };

    document.body.appendChild(script);
  });
}

interface Items {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

interface IProps {
  address: IAddress;
  products: Items[];
}

const CheckoutForm = ({ address, products }: IProps) => {
  const [token, setToken] = useState<string>("");
  const { data: user } = useCurrentUser();
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      products: products,
      customerDetails: {
        firstName: user && user.firstName,
        lastName: user && user.lastName,
        username: user && user.username,
        email: user && user.email,
        phone: user && user.phone,
        shippingAddress: {
          detail: address.detail,
          postalCode: address.postalCode,
          subDistrict: address.subDistrict,
          district: address.district,
          city: address.city,
          province: address.province,
          country: address.country,
        },
      },
    },
  });

  useEffect(() => {
    insertSnapScript();
  }, []);

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
    } catch (error) {
      toast({
        title: "Error",
        description: error + "Terjadi kesalahan saat mengirim data.",
        variant: "destructive",
      });
    }
  };

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
        className="md:col-span-2 flex items-center justify-end pt-32"
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
                name="customerDetails.shippingAddress.detail"
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
                name="customerDetails.shippingAddress.postalCode"
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
                name="customerDetails.shippingAddress.subDistrict"
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
                name="customerDetails.shippingAddress.district"
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
                name="customerDetails.shippingAddress.city"
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
                name="customerDetails.shippingAddress.province"
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
                name="customerDetails.shippingAddress.country"
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
        <Button type="submit" className="ml-auto">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CheckoutForm;
