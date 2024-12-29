import { Button } from "@/components/atoms/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel";
import ProductCard from "@/components/moleculs/product-card";
import Loader from "@/components/shared/loader";
import { useProducts } from "@/features/product/hooks/use-products";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

const AdminProductsView = () => {
  const [limit, setLimit] = useState(100);
  const { data: productsData, isLoading } = useProducts({ limit: limit });

  const { products, pagination } = productsData || {};
  const isMobile = useIsMobile();

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
      {isMobile ? (
        <Carousel>
          <CarouselContent>
            {products?.map((product) => (
              <CarouselItem key={product._id} className="basis-1/1">
                <ProductCard isAdmin={true} product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <main className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products?.map((product) => (
            <ProductCard isAdmin={true} key={product._id} product={product} />
          ))}
        </main>
      )}

      {pagination && pagination?.totalPages > 1 && (
        <footer className="flex justify-center">
          <Button onClick={() => setLimit(limit + 10)}>Load more</Button>
        </footer>
      )}
    </div>
  );
};

export default AdminProductsView;
