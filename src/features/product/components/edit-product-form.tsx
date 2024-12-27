import { useForm } from "react-hook-form";
import { z } from "zod";
import { editProductSchema, useEditProduct } from "../hooks/use-edit-product";
import { zodResolver } from "@hookform/resolvers/zod";
import { IProduct } from "../utils/product-interface";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import Loader from "@/components/shared/loader";
import { Textarea } from "@/components/atoms/textarea";

interface IEditProductFormProps {
  product: IProduct;
}

const EditProductForm = ({ product }: IEditProductFormProps) => {
  const form = useForm<z.infer<typeof editProductSchema>>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      stock: undefined,
      category: "",
      image: undefined,
    },
  });

  const { mutate: editProduct, status } = useEditProduct();
  const isLoading = status === "pending";

  const onSubmit = async (data: z.infer<typeof editProductSchema>) => {
    const formData = new FormData();

    // Ensure the fields are not undefined before appending
    if (data.name) formData.append("name", data.name);
    if (data.description) formData.append("description", data.description);
    if (data.price !== undefined)
      formData.append("price", data.price.toString());
    if (data.stock !== undefined)
      formData.append("stock", data.stock.toString());
    if (data.category) formData.append("category", data.category);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    try {
      // Assuming 'product._id' is the ID of the product being edited
      await editProduct({ id: product._id, data: formData });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 w-full overflow-hidden"
      >
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <figure className="flex items-center justify-start mb-2">
                <img
                  src={product?.image[0]}
                  alt={product?.name}
                  className="max-w-[200px] rounded-full border border-border aspect-square object-cover object-center"
                />
              </figure>
              <FormControl>
                <Input
                  id="picture"
                  type="file"
                  onChange={(e) => {
                    field.onChange(e.target.files);
                  }}
                />
              </FormControl>
              <FormDescription>format: jpg, jpeg, png</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your product name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter your product description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product category</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your product description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="stock"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product stock</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your product stock"
                  inputMode="numeric"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^0-9]/g, "");
                    field.onChange(input.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product price</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter your product price"
                  inputMode="numeric"
                  onInput={(e: React.FormEvent<HTMLInputElement>) => {
                    const input = e.target as HTMLInputElement;
                    input.value = input.value.replace(/[^0-9]/g, "");
                    field.onChange(input.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="md:w-fit md:justify-self-start"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader size={"xs"} /> : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default EditProductForm;
