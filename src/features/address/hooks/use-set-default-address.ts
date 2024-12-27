import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSetDefaultAddress = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      await axiosWithConfig.put(`/address/setDefault/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Default address updated successfully",
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
