import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { z } from "zod";

const shippingAddressSchema = z.object({
  address: z.string().nonempty("Address is required"),
  city: z.string().nonempty("City is required"),
  postalCode: z.string().nonempty("Postal code is required"),
});

const customerDetailsSchema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email format"),
  phone: z.string().nonempty("Phone number is required"),
  shippingAddress: shippingAddressSchema,
});

const itemSchema = z.object({
  productId: z.string().nonempty("Product ID is required"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  price: z.number().positive("Price must be a positive number"),
  name: z.string().nonempty("Product name is required"),
});

export const checkoutSchema = z.object({
  userId: z.string().nonempty("User ID is required"),
  items: z.array(itemSchema).nonempty("At least one item is required"),
  customerDetails: customerDetailsSchema,
});

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof checkoutSchema>) => {
      const response = await axiosWithConfig.post("/order", data);
      return response.data.data; // Assuming response.data.data is the order data
    },
    onSuccess: (data) => {
      toast({
        title: "Order created successfully",
        description: "Your order has been created successfully",
      });
      // You can log or use the data returned from the API
      console.log("Order Created:", data);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast({
          title: "Error",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
        });
      }
    },
  });
};

export const useCreateOrderState = () => {
  const mutation = useCreateOrder();

  return {
    data: mutation.data, // Response data from API
    error: mutation.error, // Error object from the API (if any)
    mutate: mutation.mutate, // Trigger the mutation function
  };
};
