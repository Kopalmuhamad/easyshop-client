import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useQuery } from "@tanstack/react-query";
import { ICategoryResponse } from "../utils/category-interface";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data } = await axiosWithConfig.get<ICategoryResponse>(
        "/category"
      );
      return data.data;
    },
  });
};
