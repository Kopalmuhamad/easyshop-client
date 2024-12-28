import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useQuery } from "@tanstack/react-query";
import { ICartResponse } from "../utils/cart-interface";

export const useCarts = () => {
  return useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const response = await axiosWithConfig.get<ICartResponse>("/cart");
      return response.data.data;
    },
  });
};
