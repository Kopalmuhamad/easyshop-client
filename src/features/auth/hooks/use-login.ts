import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: z.infer<typeof loginSchema>) => {
      const response = await axiosWithConfig.post("/auth/login", data);
      if (response.data.data.role === "admin") {
        navigate("/admin");
      }
    },
    onSuccess: () => {
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
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        });
      }
    },
  });
};
