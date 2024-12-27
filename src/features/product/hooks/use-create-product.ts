import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const productSchema = z.object({
  image: z.instanceof(FileList).refine((fileList) => fileList?.length > 0, {
    message: "At least one image is required",
  }),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  category: z.string().min(3, "Category must be at least 3 characters long"),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .transform((value) => (value === "" ? "" : Number(value)))
    .refine((value) => !isNaN(Number(value)), {
      message: "Please enter a valid number",
    }),
  stock: z
    .string()
    .min(1, { message: "Stock is required" })
    .transform((value) => (value === "" ? "" : Number(value)))
    .refine((value) => !isNaN(Number(value)), {
      message: "Please enter a valid number",
    }),
});

export const useCreateProduct = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: FormData) => {
      await axiosWithConfig.post("/product", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      navigate("/admin/products");
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
