import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import ProductCard from "@/components/organisme/products/product-card";
import Container from "@/components/shared/container";
import Loader from "@/components/shared/loader";
import PaginationProduct from "@/components/organisme/products/pagination-product";
import { useProducts } from "@/features/product/hooks/use-products";
import { useIsMobile } from "@/hooks/use-mobile";
import { useSearchParams } from "react-router-dom";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import ProductSlider from "@/components/organisme/products/product-slider";

const FeaturesView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { data: productsData, isLoading } = useProducts({
    featured: true,
    page: currentPage,
  });

  const { products, pagination } = productsData || {};

  const featuresProducts = products?.filter(
    (product) => product.featured === true
  );

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: page.toString(),
    });
  };

  const isMobile = useIsMobile();

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader size={"lg"} />
        </div>
      </div>
    );
  }

  if (!featuresProducts) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Products not found</CardTitle>
            <CardDescription>
              Currently we have no any featured products, please stay tuned for
              updates
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <Container className="pt-20 pb-10 space-y-4">
      <HeaderPage>
        <HeaderPageContent>
          <HeaderPageTitle>Featured</HeaderPageTitle>
        </HeaderPageContent>
      </HeaderPage>
      {isMobile ? (
        <ProductSlider products={featuresProducts} />
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {featuresProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </main>
      )}

      <PaginationProduct
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={pagination?.totalPages || 1}
      />
    </Container>
  );
};

export default FeaturesView;
