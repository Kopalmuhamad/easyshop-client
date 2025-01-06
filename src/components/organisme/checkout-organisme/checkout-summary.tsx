import { ISelectedProducts } from "@/hooks/use-selected-product";
import { formatCurrency } from "@/lib/format-currency";

const CheckoutSummary = ({
  selectedProducts,
}: {
  selectedProducts: ISelectedProducts[];
}) => (
  <div className="p-4 space-y-4 bg-secondary">
    <header className="border-b border-foreground pb-1">
      <h1 className="text-base font-semibold">Product Summary</h1>
    </header>
    <ul className="space-y-4">
      {selectedProducts.map((product) => (
        <li key={product.productId} className="flex justify-between py-2">
          <span>{product.name}</span>
          <span>
            {product.quantity} x {formatCurrency(product.price)}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export default CheckoutSummary;
