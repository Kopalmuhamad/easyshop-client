import { useCategories } from "@/features/categories/hooks/use-categories";
import { useProducts } from "@/features/product/hooks/use-products";

import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

import { buttonVariants } from "@/components/atoms/button";
import { Skeleton } from "@/components/atoms/skeleton";

import { ProductsSkeleton } from "@/components/organisme/products/responsive-product-list";

import CategoryCardHoverEffect from "@/components/organisme/category/category-card-hover-effect";
import Hero from "@/components/organisme/hero";
import Container from "@/components/shared/container";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel";
import ProductSlider from "@/components/organisme/products/product-slider";

/*************  ✨Docs ⭐  *************/
/**
 * The HomeView component is responsible for rendering the home page of the application.
 * It fetches and displays categories, featured products, best seller products,
 * and new arrivals. The component conditionally renders loading skeletons
 * while data is being fetched and uses responsive design to adjust the layout
 * based on mobile or desktop view.
 *
 * Features included:
 * - Displays a hero section at the top.
 * - Renders a list of categories with an option to view all categories.
 * - Displays sections for new arrivals, featured products, and best sellers
 *   with links to view all items in each section.
 * - Uses carousels for mobile view and hover effects for desktop view.
 */

/******  d311316a-36ac-4315-969d-11cdc1fdffcf  *******/
const HomeView = () => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: featuredProducts, isLoading: featuredProductsLoading } =
    useProducts({ featured: true });
  const { data: bestSellerProducts, isLoading: bestSellerProductsLoading } =
    useProducts({ bestSeller: true });
  const { data: newArrivals, isLoading: newArrivalsLoading } = useProducts({
    newArrivals: true,
  });

  const { products: featuredProductsData } = featuredProducts || {};
  const { products: bestSellerProductsData } = bestSellerProducts || {};
  const { products: newArrivalsData } = newArrivals || {};

  return (
    <div>
      <Hero />

      {/* Category List */}
      {categoriesLoading ? (
        <CategorySkeleton />
      ) : (
        categories &&
        categories.length > 0 && (
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
            <div>
              <CategoryCardHoverEffect items={categories!} />
            </div>
          </Container>
        )
      )}

      {/* New Arrivals */}
      {newArrivalsLoading ? (
        <ProductsSkeleton />
      ) : (
        <Container className="space-y-4">
          <header className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">New Arrivals</h1>
            <Link
              to={`collections/new-arrivals`}
              className={cn(buttonVariants({ variant: "link" }))}
            >
              View all
            </Link>
          </header>
          <ProductSlider products={newArrivalsData!} />
        </Container>
      )}

      {/* Featured */}
      {featuredProductsLoading ? (
        <ProductsSkeleton />
      ) : (
        <Container className="space-y-4">
          <header className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Features Products</h1>
            <Link
              to={`collections/features`}
              className={cn(buttonVariants({ variant: "link" }))}
            >
              View all
            </Link>
          </header>
          <ProductSlider products={featuredProductsData!} />
        </Container>
      )}

      {/* Best Seller */}
      {bestSellerProductsLoading ? (
        <ProductsSkeleton />
      ) : (
        <Container className="space-y-4">
          <header className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Best Seller</h1>
            <Link
              to={`collections/best-seller`}
              className={cn(buttonVariants({ variant: "link" }))}
            >
              View all
            </Link>
          </header>
          <ProductSlider products={bestSellerProductsData!} />
        </Container>
      )}
    </div>
  );
};

export default HomeView;

const CategorySkeleton = () => {
  return (
    <>
      <Container className="py-4 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="w-[200px] h-[40px]" />
          <Skeleton className="w-[100px] h-[30px]" />
        </div>
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 8 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/1">
                <Skeleton className="w-[150px] h-[150px]" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Container>
    </>
  );
};
