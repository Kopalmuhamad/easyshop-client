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

interface IPopUpAddToCartProps {
  productId: string;
  productStock: number;
}

const FormAddToCart = ({ productId, productStock }: IPopUpAddToCartProps) => {
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
        className="w-full flex flex-row items-center justify-start gap-2"
      >
        <div className="flex items-center justify-center gap-x-2">
          <Button
            type="button"
            variant={"outline"}
            size={"icon"}
            onClick={minusQuantity}
            className="aspect-square"
          >
            <MinusIcon />
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
                    className="w-full text-center aspect-square p-0"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="button"
            variant={"outline"}
            size={"icon"}
            onClick={plusQuantity}
            disabled={quantity === productStock}
            className="aspect-square"
          >
            <PlusIcon />
          </Button>
        </div>
        <div>
          <Button className="w-fit" type="submit" disabled={isLoading}>
            {isLoading ? <Loader size="xs" /> : "Save"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormAddToCart;
