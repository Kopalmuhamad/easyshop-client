import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .min(3, { message: "First name must be at least 3 characters" }),
    lastName: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters" }),
    gender: z.enum(["male", "female"]),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters" }),
    email: z.string().email("Invalid email"),
    phone: z
      .string()
      .min(10, { message: "Phone number must be at least 10 characters" }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: z.infer<typeof registerSchema>) => {
      await axiosWithConfig.post("/auth/register", data);
    },
    onSuccess: () => {
      navigate("/verify");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast({
          description: error.response.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
  });
};
