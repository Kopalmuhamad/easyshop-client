import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import Container from "@/components/shared/container";
import PaginationProdcuct from "@/components/organisme/products/pagination-product";
import { useProducts } from "@/features/product/hooks/use-products";
import { useSearchParams } from "react-router-dom";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import ProductCardHoverEffect from "@/components/organisme/products/product-card-hover-effect";
import { ProductsSkeleton } from "@/components/organisme/products/responsive-product-list";

const CollectionsView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const { data: productsData, isLoading } = useProducts({
    page: currentPage,
  });

  const { products, pagination } = productsData || {};

  const handlePageChange = (page: number) => {
    setSearchParams({
      page: page.toString(),
    });
  };

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  if (!products || products.length === 0) {
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
    <Container className="pt-20 pb-10 space-y-4">
      <HeaderPage>
        <HeaderPageContent>
          <HeaderPageTitle>Collections</HeaderPageTitle>
        </HeaderPageContent>
      </HeaderPage>
      <ProductCardHoverEffect products={products} />
      <PaginationProdcuct
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={pagination?.totalPages || 1}
      />
    </Container>
  );
};

export default CollectionsView;
