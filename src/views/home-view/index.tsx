import { buttonVariants } from "@/components/atoms/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel";
import Hero from "@/components/organisme/hero";
import CategoryCard from "@/components/shared/category-card";
import Container from "@/components/shared/container";
import { useCategories } from "@/features/categories/hooks/use-categories";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const HomeView = () => {
  const { data: categories } = useCategories();

  return (
    <div>
      <Hero />
      <Container className="py-4 space-y-4">
        <header className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Category</h1>
          <Link
            to={"/categories"}
            className={cn(buttonVariants({ variant: "link" }))}
          >
            View all
          </Link>
        </header>
        <Carousel>
          <CarouselContent>
            {categories?.map((category) => (
              <CarouselItem className="basis-1/1">
                <CategoryCard key={category._id} category={category} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </div>
  );
};

export default HomeView;
