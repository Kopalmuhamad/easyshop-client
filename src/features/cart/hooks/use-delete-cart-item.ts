import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useDeleteCartItem = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (itemId: string) => {
      await axiosWithConfig.delete(`/cart/item/${itemId}`);
    },
    onSuccess: () => {
      toast({
        title: "Item deleted",
        description: "Item deleted successfully",
      });
      navigate(0);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast({
          title: "Error",
          description: error.response.data.message,
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
        });
      }
    },
  });
};
