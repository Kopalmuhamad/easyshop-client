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
import {
  categorySchema,
  useCreateCategory,
} from "../hooks/use-create-category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import Loader from "@/components/shared/loader";

const CreateCategoryForm = () => {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
  });

  const { mutate: create, status } = useCreateCategory();

  const isLoading = status === "pending";

  const onSubmit = async (data: z.infer<typeof categorySchema>) => {
    const formData = new FormData();
    console.log(data.image);

    formData.append("name", data.name);
    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    create(formData);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category image</FormLabel>
              <FormControl>
                <Input
                  id="category_picture"
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
              <FormLabel>Category name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your category name" />
              </FormControl>
            </FormItem>
          )}
        />
        <Button variant={"secondary"} type="submit" disabled={isLoading}>
          {isLoading ? <Loader size="xs" /> : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateCategoryForm;
