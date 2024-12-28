import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import ProductCard from "@/components/moleculs/product-card";
import Loader from "@/components/shared/loader";
import { useProducts } from "@/features/product/hooks/use-products";

const AdminProductsView = () => {
  const { data: productsData, isLoading } = useProducts({});

  const { products } = productsData || {};

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen">
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
    <div className="space-y-4 mt-2">
      <header>
        <h1 className="text-2xl font-semibold">Products</h1>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products?.map((product) => (
          <ProductCard isAdmin={true} key={product._id} product={product} />
        ))}
      </main>
    </div>
  );
};

export default AdminProductsView;
