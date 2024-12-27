import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/atoms/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/button";
import {
  updatePasswordSchema,
  useUpdatePassword,
} from "../hooks/use-update-password";
import { z } from "zod";
import { Input } from "@/components/atoms/input";
import Loader from "@/components/shared/loader";

const UpdatePasswordForm = () => {
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: updatePassword, status } = useUpdatePassword();
  const isLoading = status === "pending";

  const onSubmit = (data: z.infer<typeof updatePasswordSchema>) => {
    updatePassword(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          name="oldPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Password Now</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your old password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="newPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your old password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your old password"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Loader size="xs" /> : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default UpdatePasswordForm;
