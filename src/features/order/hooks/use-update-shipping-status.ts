import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

export const updateShippingSchema = z.object({
  orderId: z.string(),
  shippingStatus: z.enum(["pending", "delivered", "received", "cancelled"]),
});

export const useUpdateShippingStatus = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof updateShippingSchema>) => {
      await axiosWithConfig.patch(
        `/order/update-shipping-status/${data.orderId}`,
        data
      );
    },
  });
};
