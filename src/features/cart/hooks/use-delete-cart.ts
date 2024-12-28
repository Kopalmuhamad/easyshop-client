import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useDeleteCart = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      await axiosWithConfig.delete("/cart");
    },
    onSuccess: () => {
      toast({
        title: "All product deleted successfully",
      });
      navigate(0);
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response) {
        toast({
          title: "Error",
          description: error.response.data.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    },
  });
};
