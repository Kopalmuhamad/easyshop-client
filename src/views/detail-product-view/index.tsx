import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import { Separator } from "@/components/atoms/separator";
import DetailProductImage from "@/components/organisme/detail-product/detail-product-image";
import DetailProductInfo from "@/components/organisme/detail-product/detail-product-info";
import RelatedProductNotFound from "@/components/organisme/detail-product/related-product-not-found";
import RelatedProductSlider from "@/components/organisme/products/product-slider";
import Container from "@/components/shared/container";
import Loader from "@/components/shared/loader";
import { useProduct } from "@/features/product/hooks/use-product";
import { useProducts } from "@/features/product/hooks/use-products";

const DetailProductView = ({ productId }: { productId: string }) => {
  const { data: product, isLoading: productLoading } = useProduct(productId!);

  const { data: productsData, isLoading: productsLoading } = useProducts({
    category: product?.category._id,
  });

  const isLoading = productLoading || productsLoading;

  const { products } = productsData || {};

  const filteredProducts = products?.filter(
    (product) => product._id !== productId
  );

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader size="lg" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>Product not found</CardTitle>
            <CardDescription>
              This product maybe deleted or run out of stock
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Container className="grid grid-cols-1 sm:grid-cols-[.7fr_1fr] pt-20 pb-10 gap-4">
        {/* Detail Product Image */}
        <DetailProductImage product={product} />

        {/* Detail Product Info */}
        <DetailProductInfo product={product} />
      </Container>
      <Separator />
      <Container className="pt-10 pb-10 space-y-4">
        {/* Header Related Product */}
        <HeaderPage>
          <HeaderPageContent>
            <HeaderPageTitle>Related Products</HeaderPageTitle>
          </HeaderPageContent>
        </HeaderPage>
        {!filteredProducts ? (
          // ? Render when related product is empty
          <RelatedProductNotFound />
        ) : (
          // ?  Render when related product is not empty
          <RelatedProductSlider products={filteredProducts} />
        )}
      </Container>
    </>
  );
};

export default DetailProductView;
