import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/atoms/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createCartSchema, useCreateCart } from "../hooks/use-create-cart";
import { Button } from "@/components/atoms/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Input } from "@/components/atoms/input";
import Loader from "@/components/shared/loader";
import { useCarts } from "../hooks/use-carts";
import { cn } from "@/lib/utils";

interface IPopUpAddToCartProps {
  productId: string;
  productStock: number;
  children: React.ReactNode | string;
  className?: string;
}

const FormAddToCart = ({
  productId,
  productStock,
  children: content,
  className,
}: IPopUpAddToCartProps) => {
  const { data: carts } = useCarts();
  const { mutate: create, status } = useCreateCart();
  const isLoading = status === "pending";

  const existingCartItem = carts?.items.find(
    (item) => item.product._id === productId
  );

  const form = useForm<z.infer<typeof createCartSchema>>({
    resolver: zodResolver(createCartSchema),
    defaultValues: {
      productId: productId,
      quantity: existingCartItem?.quantity || 1,
    },
  });

  const onSubmit = (data: z.infer<typeof createCartSchema>) => {
    create(data);
  };

  const { watch, setValue } = form;
  const quantity = watch("quantity");

  const minusQuantity = () => {
    if (quantity > 1)
      setValue("quantity", quantity - 1, { shouldValidate: true });
  };

  const plusQuantity = () => {
    const currentQuantity = Number(quantity) || 0;
    if (currentQuantity < productStock) {
      setValue("quantity", currentQuantity + 1, { shouldValidate: true });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("w-full flex flex-col gap-2", className)}
      >
        <div className="flex gap-x-2 w-fit">
          <Button
            type="button"
            variant={"outline"}
            onClick={minusQuantity}
            className="w-6 h-6 xs:w-8 xs:h-8 aspect-square"
          >
            <MinusIcon size={8} />
          </Button>
          <FormField
            name="quantity"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={field.value}
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      const input = e.target as HTMLInputElement;
                      // Hanya izinkan angka
                      let newValue = input.value.replace(/[^0-9]/g, "");
                      // Batasi nilai maksimal sesuai stok
                      if (Number(newValue) > productStock) {
                        newValue = String(productStock);
                      }
                      // Perbarui form state
                      input.value = newValue;
                      field.onChange(newValue);
                    }}
                    className="text-center text-xs aspect-square p-0 w-6 h-6 xs:w-8 xs:h-8"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant={"outline"}
            onClick={plusQuantity}
            disabled={quantity === productStock}
            className="w-6 h-6 xs:w-8 xs:h-8 aspect-square"
          >
            <PlusIcon size={4} />
          </Button>
        </div>
        <Button
          className="w-fit text-xs xs:text-sm px-2 h-8 xs:h-9"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader size="xs" /> : content}
        </Button>
      </form>
    </Form>
  );
};

export default FormAddToCart;
