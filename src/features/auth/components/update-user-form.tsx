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
import { updateUserSchema, useUpdateUser } from "../hooks/use-update-user";
import { useCurrentUser } from "../hooks/use-current-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/atoms/input";
import { DialogClose } from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";
import Loader from "@/components/shared/loader";

const UpdateUserForm = () => {
  const { data: currentUser } = useCurrentUser();
  const { mutateAsync: updateUser, status } = useUpdateUser();
  const isLoading = status === "pending";

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: currentUser?.username || "",
      email: currentUser?.email || "",
      phone: currentUser?.phone || "",
      image: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof updateUserSchema>) => {
    const formData = new FormData();

    if (data.username) formData.append("username", data.username);
    if (data.email) formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);

    if (data.image && data.image.length > 0) {
      formData.append("image", data.image[0]);
    }

    await updateUser(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your username" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Enter your email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your phone number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="image"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
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

        <div className="mt-4 flex justify-between">
          <DialogClose type="button" className="btn btn-secondary">
            <Button type="button" variant={"destructive"}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? <Loader size={"xs"} /> : "Update Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateUserForm;
