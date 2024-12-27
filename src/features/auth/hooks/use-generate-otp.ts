import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useGenerateOtp = () => {
  return useMutation({
    mutationFn: async () => {
      await axiosWithConfig.post("/auth/generate-otp-code");
    },
    onSuccess: () => {
      toast({
        title: "OTP sent to your email",
        description: "Please check your email for the OTP code",
        duration: 5000,
      });
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
