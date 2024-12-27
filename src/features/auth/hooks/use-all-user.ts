import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useQuery } from "@tanstack/react-query";

export const useAllUser = () => {
  return useQuery({
    queryKey: ["all-user"],
    queryFn: async () => {
      const { data } = await axiosWithConfig.get("/user");
      return data.data;
    },
  });
};
