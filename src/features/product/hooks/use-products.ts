import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useQuery } from "@tanstack/react-query";
import { IProductResponse } from "../utils/product-interface";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axiosWithConfig.get<IProductResponse>("/product");
      return {
        products: response?.data.data,
        pagination: response?.data.pagination,
      };
    },
  });
};
