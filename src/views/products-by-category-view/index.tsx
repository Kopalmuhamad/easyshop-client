import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import ProductCard from "@/components/moleculs/product-card";
import Container from "@/components/shared/container";
import Loader from "@/components/shared/loader";
import PaginationProduct from "@/components/shared/pagination-product";
import { useProducts } from "@/features/product/hooks/use-products";
import { useParams, useSearchParams } from "react-router-dom";

const ProductsByCategoryView = () => {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const { data: productsData, isLoading } = useProducts({
    category: categorySlug!,
  });
  const { products, pagination } = productsData || {};

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: page.toString(),
    });
  };

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader size={"lg"} />
        </div>
      </div>
    );
  }

  if (!products) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Product not found</CardTitle>
            <CardDescription>
              Currently we have no any products in {categorySlug}, please stay
              tuned for updates
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <Container className="py-20 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold capitalize">{categorySlug}</h1>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </main>
      <PaginationProduct
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={pagination?.totalPages || 1}
      />
    </Container>
  );
};

export default ProductsByCategoryView;
