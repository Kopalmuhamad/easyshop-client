import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";

export const useDeleteOrder = (orderId: string) => {
  return useMutation({
    mutationFn: async () => {
      await axiosWithConfig.delete(`/order/${orderId}`);
    },
  });
};
