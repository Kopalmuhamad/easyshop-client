import { toast } from "@/hooks/use-toast";
import { axiosWithConfig } from "@/services/api/axios-with-config";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

export const addressSchema = z.object({
  detail: z.string().nonempty("Detail address is required"), // Detail alamat harus diisi
  subDistrict: z.string().nonempty("Sub-district is required"), // Kelurahan harus diisi
  district: z.string().nonempty("District is required"), // Kecamatan harus diisi
  city: z.string().nonempty("City is required"), // Kota harus diisi
  province: z.string().nonempty("Province is required"), // Provinsi harus diisi
  country: z.string().default("Indonesia"), // Negara opsional, default: Indonesia
  postalCode: z.string().regex(/^\d{5}$/, "Postal code must be 5 digits"), // Kode pos harus 5 digit
  coordinates: z.object({
    latitude: z
      .number()
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90"),
    longitude: z
      .number()
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180"),
  }),
});

export const useCreateAddress = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: z.infer<typeof addressSchema>) => {
      await axiosWithConfig.post("/address", data);
    },
    onSuccess: () => {
      navigate("/profile");
      toast({
        title: "Address created successfully",
      })
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
