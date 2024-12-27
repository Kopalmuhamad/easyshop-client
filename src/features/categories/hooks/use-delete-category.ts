import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useDeleteCategory = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosWithConfig.delete(`/category/${id}`);
    },
    onSuccess: () => {
      navigate("/admin/categories");
      toast({
        title: "Category deleted",
        description: "Category deleted successfully",
      });
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
