import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useQuery } from "@tanstack/react-query";
import { ICheckoutResponse } from "../utils/checkout-interface";

export const useUserOrder = () => {
  return useQuery({
    queryKey: ["user-order"],
    queryFn: async () => {
      const response = await axiosWithConfig.get<ICheckoutResponse>(
        "/order/user"
      );
      return response.data.data;
    },
  });
};
