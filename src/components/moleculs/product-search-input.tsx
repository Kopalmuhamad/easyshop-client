import { useProducts } from "@/features/product/hooks/use-products";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../atoms/command";
import { Card } from "../atoms/card";
import { formatCurrency } from "@/lib/format-currency";
import { Link } from "react-router-dom";

const ProductSearchInput = () => {
  const { data: productsData } = useProducts();
  const { products } = productsData || {};

  return (
    <Command>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Product">
          {products?.map((product) => (
            <CommandItem>
              <Link
                to={`/collections/detail/${product._id}`}
                className="flex w-full"
              >
                <Card className="w-full flex items-start justify-start gap-2 flex-nowrap">
                  <figure className="w-24 aspect-square">
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </figure>
                  <div className="py-3 pl-2">
                    <h1 className="text-base font-medium">{product.name}</h1>
                    <h3 className="text-sm font-medium">
                      {formatCurrency(product.price)}
                    </h3>
                  </div>
                </Card>
              </Link>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default ProductSearchInput;
