import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useQuery } from "@tanstack/react-query";
import { IAddressResponse } from "../utils/interface-address";

interface IProps {
  [key: string]: string | number | boolean;
}

export const useAddress = (params?: IProps) => {
  return useQuery({
    queryKey: ["address", params],
    queryFn: async () => {
      const { data } = await axiosWithConfig.get<IAddressResponse>(
        "/address/userId",
        { params: params || {} }
      );
      return data.data;
    },
  });
};
