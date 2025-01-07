import { Button } from "@/components/atoms/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import ProductCardHoverEffect from "@/components/organisme/products/product-card-hover-effect";
import Loader from "@/components/shared/loader";
import { useProducts } from "@/features/product/hooks/use-products";
import { useState } from "react";

const AdminProductsView = () => {
  const [limit, setLimit] = useState(100);
  const { data: productsData, isLoading } = useProducts({ limit: limit });

  const { products, pagination } = productsData || {};

  if (isLoading) {
    return (
      <div className="relative h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      </div>
    );
  }

  if (!products) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Products not found</CardTitle>
            <CardDescription>
              Currently we have no any products, please stay tuned for updates
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-2 pb-4">
      <header>
        <h1 className="text-2xl font-semibold">Products</h1>
      </header>
      <ProductCardHoverEffect products={products} isAdmin />

      {pagination && pagination?.totalPages > 1 && (
        <footer className="flex justify-center">
          <Button onClick={() => setLimit(limit + 10)}>Load more</Button>
        </footer>
      )}
    </div>
  );
};

export default AdminProductsView;
