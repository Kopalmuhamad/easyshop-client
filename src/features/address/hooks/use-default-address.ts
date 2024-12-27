import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useQuery } from "@tanstack/react-query";
import { IAddressResponse } from "../utils/interface-address";

export const useDefaultAddress = () => {
  return useQuery({
    queryKey: ["default-address"],
    queryFn: async () => {
      const response = await axiosWithConfig.get<IAddressResponse>(
        "/address/userId"
      );
      const defaultAddress = response.data.data.find(
        (address) => address.defaultAddress === true
      );
      return defaultAddress;
    },
  });
};
