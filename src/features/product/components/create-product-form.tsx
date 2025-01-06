import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/atoms/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { productSchema, useCreateProduct } from "../hooks/use-create-product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import { Textarea } from "@/components/atoms/textarea";
import Loader from "@/components/shared/loader";
import { useCategories } from "@/features/categories/hooks/use-categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/atoms/select";

const CreateProductForm = () => {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
      stock: 0,
      image: undefined,
    },
  });

  const { mutate: product, status } = useCreateProduct();
  const { data: categories } = useCategories();

  const isLoading = status === "pending";

  const onSubmit = async (data: z.infer<typeof productSchema>) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("category", data.category);
    formData.append("stock", data.stock.toString());

    if (data.image && data.image.length > 0) {
      Array.from(data.image).forEach((file) => {
        formData.append("image", file);
      });
    }

    try {
      await product(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 grid grid-flow-row"
      >
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product image</FormLabel>
              <FormControl>
                <Input
                  id="picture"
                  type="file"
                  multiple
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Please choose a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem className="capitalize" value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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
          variant={"secondary"}
        >
          {isLoading ? <Loader size={"xs"} /> : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateProductForm;
