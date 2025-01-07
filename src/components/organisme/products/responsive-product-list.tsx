import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel";
import Container from "@/components/shared/container";
import { useIsMobile } from "@/hooks/use-mobile";
import ProductCardHoverEffect from "./product-card-hover-effect";
import { IProduct } from "@/features/product/utils/product-interface";
import { Skeleton } from "@/components/atoms/skeleton";
import ProductSlider from "./product-slider";

interface IProps {
  products: IProduct[];
  title: string;
  link: string;
}

const ResponsiveProductList = (props: IProps) => {
  const { products } = props;

  const isMobile = useIsMobile();

  if (!products || products.length === 0) {
    return null;
  }

  if (isMobile) {
    return <ProductSlider products={products} />;
  }

  return <ProductCardHoverEffect products={products} />;
};

export default ResponsiveProductList;

export const ProductsSkeleton = () => {
  const isMobile = useIsMobile();
  return (
    <Container className="py-4 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="w-[200px] h-[40px]" />
        <Skeleton className="w-[100px] h-[30px]" />
      </div>
      {isMobile ? (
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/1">
                <Skeleton className="w-[300px] h-[300px]" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 py-10">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton className="w-[300px] h-[200px]" key={index} />
          ))}
        </div>
      )}
    </Container>
  );
};
