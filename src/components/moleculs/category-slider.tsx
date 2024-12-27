import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../atoms/carousel";

const CategorySlider = () => {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem></CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CategorySlider;
