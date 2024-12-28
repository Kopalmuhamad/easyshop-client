import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const createCartSchema = z.object({
  productId: z.string(),
  quantity: z.number(),
});

export const useCreateCart = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: z.infer<typeof createCartSchema>) => {
      return axiosWithConfig.post("/cart", data);
    },
    onSuccess: () => {
      navigate(0);
      toast({
        title: "Success",
        description: "Product added to cart",
        duration: 5000,
      });
    },

    onError: (error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        navigate("/login");
        toast({
          title: "Please Login to add product to cart",
          variant: "destructive",
          duration: 3000,
        });
      } else if (error instanceof AxiosError && error.response) {
        toast({
          title: error.response.data.message,
          duration: 3000,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          duration: 3000,
          variant: "destructive",
        });
      }
    },
  });
};
