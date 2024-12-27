import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as z from "zod";

export const updatePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, "Old password must be at least 6 characters long"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"],
  });

export const useUpdatePassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: z.infer<typeof updatePasswordSchema>) => {
      await axiosWithConfig.put("/auth/update-password", data);
    },
    onSuccess: () => {
      navigate(0);
    },
  });
};
