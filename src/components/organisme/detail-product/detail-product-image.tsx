import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/atoms/carousel";
import { IProduct } from "@/features/product/utils/product-interface";

const DetailProductImage = ({ product }: { product: IProduct }) => {
  return (
    <Carousel>
      <CarouselContent className="ml-0">
        {product?.image.map((image: string, index: number) => (
          <CarouselItem
            key={index}
            className="pl-0 relative xs:w-[300px] lg:w-[400px] drop-shadow-xl rounded-md overflow-hidden full"
          >
            <img
              src={image}
              alt={product?.name}
              className="w-full h-full object-cover object-center"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default DetailProductImage;
