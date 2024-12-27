import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 3 characters long"),
  image: z.instanceof(FileList),
});

export const useCreateCategory = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: FormData) => {
      await axiosWithConfig.post("/category", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      navigate("/admin/categories");
      toast({
        title: "Created Category",
        description: "Category created successfully",
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
