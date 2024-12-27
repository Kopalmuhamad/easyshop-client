import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useDeleteProduct = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosWithConfig.delete(`/product/${id}`);
    },
    onSuccess: () => {
      navigate(0);
      toast({
        title: "Deleted Product",
        description: "Product deleted successfully",
      });
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
