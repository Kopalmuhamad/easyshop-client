import { z } from "zod";

export const checkoutSchema = z.object({
  products: z
    .array(
      z.object({
        productId: z.string().min(1, "Product ID is required"),
        quantity: z.number().min(1, "Quantity must be at least 1").default(1),
        price: z.number().min(0, "Price must be a positive number"),
        name: z.string().min(1, "Product name is required"),
      })
    )
    .min(1, "At least one product is required"),

  customerDetails: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(1, "Phone number is required"),
    shippingDetails: z.object({
      detail: z.string().min(1, "Address detail is required"),
      postalCode: z.string().min(1, "Postal code is required"),
      subDistrict: z.string().min(1, "Subdistrict is required"),
      district: z.string().min(1, "District is required"),
      city: z.string().min(1, "City is required"),
      province: z.string().min(1, "Province is required"),
      country: z.string().min(1, "Country is required"),
    }),
  }),
  paymentDetails: z.object({
    paymentType: z.string().min(1, "Payment type is required"),
    bankName: z.string().min(1, "Bank number is required").optional(),
  }),
});
