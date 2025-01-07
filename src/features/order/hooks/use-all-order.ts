import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useQuery } from "@tanstack/react-query";

export const useAllOrder = () => {
  return useQuery({
    queryKey: ["all-order"],
    queryFn: async () => {
      const response = await axiosWithConfig.get("/order/all");
      return response.data.data;
    },
  });
};
