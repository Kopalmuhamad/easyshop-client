import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useQuery } from "@tanstack/react-query";
import { IAddressResponse } from "../utils/interface-address";

export const useAddress = () => {
  return useQuery({
    queryKey: ["address"],
    queryFn: async () => {
      const { data } = await axiosWithConfig.get<IAddressResponse>(
        "/address/userId"
      );
      return data.data;
    },
  });
};
