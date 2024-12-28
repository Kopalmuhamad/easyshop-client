import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useQuery } from "@tanstack/react-query";
import { IProductResponse } from "../utils/product-interface";

interface IProps {
  [key: string]: string | number;
}

export const useProducts = (params?: IProps) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      try {
        const response = await axiosWithConfig.get<IProductResponse>(
          "/product",
          {
            params: params || {},
          }
        );
        return {
          products: response?.data.data,
          pagination: response?.data.pagination,
        };
      } catch (error) {
        console.error(error);
      }
    },
  });
};
