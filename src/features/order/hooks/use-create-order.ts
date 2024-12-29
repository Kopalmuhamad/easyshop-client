import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

// Interfaces for order data
interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
}

interface CustomerDetails {
  username: string;
  email: string;
  phone: string;
  shippingAddress: ShippingAddress;
}

interface Item {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface IOrder {
  userId: string;
  items: Item[];
  customerDetails: CustomerDetails;
  token: string;
  redirectUrl: string;
}

export const useCreateOrder = () => {
  return useMutation<IOrder, AxiosError, IOrder>({
    mutationFn: async (data: IOrder) => {
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
