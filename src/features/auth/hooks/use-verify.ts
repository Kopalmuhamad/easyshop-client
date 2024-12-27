import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const verificationSchema = z.object({
  otp: z
    .string()
    .min(6, "OTP must be at least 6 characters")
    .max(6, "OTP must be at most 6 characters"),
});

export const useVerification = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: z.infer<typeof verificationSchema>) =>
      axiosWithConfig.post("/auth/verification-account", data),
    onSuccess: () => {
      toast({
        title: "Verification Successful",
        description: "You have successfully verified your account",
        duration: 5000,
      });
      navigate("/");
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
