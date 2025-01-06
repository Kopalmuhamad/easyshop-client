import Autoplay from "embla-carousel-autoplay";
import { ArrowRightIcon } from "lucide-react";
import { buttonVariants } from "../atoms/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../atoms/carousel";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="bg-secondary text-secondary-foreground grid grid-cols-1 md:grid-cols-[1fr_1fr] h-full min-h-[70vh] items-center">
      <div className="space-y-2 md:space-y-8 relative z-[49] h-full w-full backdrop-blur-sm flex flex-col items-start justify-center pl-8">
        <h1 className="font-playfair text-4xl md:text-8xl">Summer Sale</h1>
        <h3 className="text-3xl md:text-6xl font-bold">50% Off</h3>
        <p className="text-sm md:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
          perferendis reiciendis deleniti cumque ad nihil iste laboriosam sint
          quos nostrum.
        </p>
        <Link
          to="/collections"
          className={buttonVariants({ variant: "secondary" })}
        >
          Shop Now <ArrowRightIcon />
        </Link>
      </div>
      <Carousel
        className="absolute z-30 left-0 right-0"
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent className="w-full h-full">
          <CarouselItem
            className="w-full h-[70vh] bg-[url('https://www.acehardware.co.id/files/tematik_desember/Web%20banner_NEWW_YEAR%20END%20SALE_1105%20x%20487%20Title%20Banner.jpg')] bg-cover bg-center"
            style={{}}
          ></CarouselItem>
          <CarouselItem
            className="w-full h-[70vh] bg-[url('https://www.abbaloveministries.org/wp-content/uploads/2023/11/htDes2023.jpg')] bg-cover bg-center"
            style={{}}
          ></CarouselItem>
        </CarouselContent>
        <div className="absolute flex items-center justify-center gap-4 bottom-0 left-3/4 -translate-x-1/2">
          <CarouselPrevious className="static" />
          <CarouselNext className="static" />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
