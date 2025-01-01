import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { checkoutSchema } from "../hooks/use-create-order";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { IAuth } from "@/features/auth/utils/auth-interface";
import { IAddress } from "@/features/address/utils/interface-address";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import Loader from "@/components/shared/loader";

function insertSnapScript() {
  return new Promise((resolve, reject) => {
    // Cek apakah script sudah dimuat
    if (window.snap) {
      console.log("Snap.js sudah dimuat.");
      resolve("Snap.js sudah dimuat.");
      return;
    }

    const script = document.createElement("script");
    const snapScript = import.meta.env.VITE_MIDTRANS_SNAP_SCRIPT;
    const midtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;

    // Cek apakah URL dan kunci klien valid
    if (!snapScript || !midtransClientKey) {
      console.error("Snap.js URL atau kunci klien tidak ditemukan.");
      toast({
        title: "Error",
        description: "Snap.js URL atau kunci klien tidak ditemukan.",
        variant: "destructive",
      });
      reject("Snap.js URL atau kunci klien tidak ditemukan.");
      return;
    }

    console.log("Snap.js URL:", snapScript);
    console.log("Midtrans Client Key:", midtransClientKey);

    script.src = snapScript;
    script.type = "text/javascript";
    script.dataset.clientKey = midtransClientKey;
    script.setAttribute("data-client-key", midtransClientKey);

    script.onload = () => {
      console.log("Snap.js berhasil dimuat.");
      resolve("Snap.js berhasil dimuat.");
    };

    script.onerror = () => {
      console.error("Gagal memuat Snap.js.");
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
  user: IAuth;
  items: Items[];
  address: IAddress;
}

const CreateOrderForm = ({ user, items, address }: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    insertSnapScript();
  }, []);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      userId: user && user?._id,
      items: items && items,
      customerDetails: {
        username: user && user?.username,
        email: user && user?.email,
        phone: user && user?.phone,
        shippingAddress: address && {
          address: address && address?.detail,
          city: address && address?.city,
          postalCode: address && address?.postalCode,
        },
      },
    },
  });

  const { control, handleSubmit } = form;

  const { fields: itemFields, append: appendItem } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = async (data: z.infer<typeof checkoutSchema>) => {
    try {
      setIsLoading(true);
      const response = await axiosWithConfig.post("/order", data, {
        headers: {
          Accept: "application/json",
          Authorization:
            "Basic " + btoa(`${import.meta.env.VITE_MIDTRANS_SERVER_KEY}`),
        },
      });
      const { token } = response.data;

      // Tunggu hingga script Snap.js dimuat
      if (window.snap) {
        window.snap.pay(token, {
          onSuccess: function () {
            // Handle success
          },
          onPending: function () {
            // Handle pending
          },
          onError: function () {
            // Handle error
          },
        });
      } else {
        console.error("Snap.js is not loaded yet");
        toast({
          title: "Error",
          description:
            "Terjadi kesalahan saat membuat pesanan ini. Snap.js tidak tersedia.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mengirim data.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(true);
    }
  };

  console.log(isLoading);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:col-span-2 flex items-center justify-end"
      >
        <div className="hidden">
          {/* User ID */}
          <FormField
            name="userId"
            control={control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User ID</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter User ID" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Items */}
          <div>
            <FormLabel>Items</FormLabel>
            {itemFields.map((item, index) => (
              <div key={item.id} className="space-y-2 border p-3 rounded">
                <FormField
                  name={`items.${index}.productId`}
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
                  name={`items.${index}.name`}
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
                  name={`items.${index}.quantity`}
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
                  name={`items.${index}.price`}
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
                name="customerDetails.shippingAddress.address"
                control={control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Address" />
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
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="ml-auto" disabled={isLoading}>
          {isLoading ? <Loader size={"xs"} /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateOrderForm;
