import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

// Schema Validation
export const editProductSchema = z.object({
  image: z.instanceof(FileList).optional(),
  name: z.string().min(1, "Name is required").optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .optional(),
  category: z.string().min(1, "Category is required").optional(),
  price: z
    .string()
    .min(1, { message: "Price is required" })
    .transform((value) => (value === "" ? "" : Number(value)))
    .refine((value) => !isNaN(Number(value)), {
      message: "Please enter a valid number",
    }).optional(),
    
  stock: z
    .string()
    .min(1, { message: "Stock is required" })
    .transform((value) => (value === "" ? "" : Number(value)))
    .refine((value) => !isNaN(Number(value)), {
      message: "Please enter a valid number",
    }).optional(),
});

// Custom Hook for Editing Product
export const useEditProduct = () => {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      await axiosWithConfig.put(`/product/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  });
};
