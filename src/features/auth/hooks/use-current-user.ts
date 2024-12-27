import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useQuery } from "@tanstack/react-query";
import { IAuthResponse } from "../utils/auth-interface";

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const { data } = await axiosWithConfig.get<IAuthResponse>(
        "/auth/current-user"
      );
      return data.data;
    },
    retry: false,
  });
};
