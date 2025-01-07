import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel";
import ProductCard from "@/components/organisme/products/product-card";
import { IProduct } from "@/features/product/utils/product-interface";

const ProductSlider = ({ products }: { products: IProduct[] }) => {
  return (
    <Carousel>
      <CarouselContent>
        {products?.map((product) => (
          <CarouselItem key={product._id} className="basis-1/1">
            <ProductCard isMobile={true} key={product._id} product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductSlider;
