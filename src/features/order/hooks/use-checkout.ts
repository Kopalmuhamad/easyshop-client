import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { checkoutSchema } from "../utils/checkout-schema";
import { axiosWithConfig } from "@/services/api/axios-with-config";

export const useCheckout = () => {
  return useMutation({
    mutationFn: async (data: z.infer<typeof checkoutSchema>) => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axiosWithConfig.post("/order", data, config);
    },
  });
};
