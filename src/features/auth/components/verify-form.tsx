import { useForm } from "react-hook-form";
import { z } from "zod";
import { useVerification, verificationSchema } from "../hooks/use-verify";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/atoms/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/atoms/input-otp";
import { Button } from "@/components/atoms/button";
import Loader from "@/components/shared/loader";

const VerifyForm = () => {
  const form = useForm<z.infer<typeof verificationSchema>>({
    resolver: zodResolver(verificationSchema),
    defaultValues: {
      otp: "",
    },
  });

  const { mutate: verify, status } = useVerification();
  const isLoading = status === "pending";

  const onSubmit = (data: z.infer<typeof verificationSchema>) => {
    verify(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          name="otp"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <Loader size="xs" /> : "Verify"}
        </Button>
      </form>
    </Form>
  );
};

export default VerifyForm;
