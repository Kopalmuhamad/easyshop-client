import { buttonVariants } from "@/components/atoms/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel";
import ProductCard from "@/components/organisme/products/product-card";
import Hero from "@/components/organisme/hero";
import CategoryCard from "@/components/organisme/category/category-card";
import Container from "@/components/shared/container";
import { useCategories } from "@/features/categories/hooks/use-categories";
import { useProducts } from "@/features/product/hooks/use-products";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import ProductSlider from "@/components/organisme/products/product-slider";

const HomeView = () => {
  const { data: categories } = useCategories();
  const { data: productsData } = useProducts({});

  const { products } = productsData || {};

  const featuredProducts = products?.filter((product) => product.featured);
  const bestSellerProducts = products?.filter((product) => product.bestSeller);
  const newArrivals = products?.filter((product) => product.newArrivals);

  const isMobile = useIsMobile();

  return (
    <div>
      <Hero />
      {/* Category List */}
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
            {!categories ? (
              <h1>No categories found</h1>
            ) : (
              categories?.map((category) => (
                <CarouselItem key={category._id} className="basis-1/1">
                  <CategoryCard key={category._id} category={category} />
                </CarouselItem>
              ))
            )}
          </CarouselContent>
        </Carousel>
      </Container>
      {/* New Arrivals */}
      {newArrivals && (
        <Container className="py-4 space-y-4">
          <header className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">New Arrivals</h1>
            <Link
              to={"/collections/new-arrivals"}
              className={cn(buttonVariants({ variant: "link" }))}
            >
              View all
            </Link>
          </header>
          {isMobile ? (
            <Carousel>
              <CarouselContent>
                {newArrivals?.map((product) => (
                  <CarouselItem className="basis-1/1" key={product._id}>
                    <ProductCard key={product._id} product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          ) : (
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {newArrivals?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </main>
          )}
        </Container>
      )}

      {/* Featured */}
      {featuredProducts && featuredProducts.length > 0 && (
        <div className="bg-secondary">
          <Container className="py-4 space-y-4">
            <HeaderPage>
              <HeaderPageContent>
                <HeaderPageTitle>Featured</HeaderPageTitle>
                <Link
                  to={"/collections/features"}
                  className={cn(buttonVariants({ variant: "link" }))}
                >
                  View all
                </Link>
              </HeaderPageContent>
            </HeaderPage>
            {isMobile ? (
              <ProductSlider products={featuredProducts} />
            ) : (
              <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {featuredProducts?.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </main>
            )}
          </Container>
        </div>
      )}

      {/* Best Seller */}
      {bestSellerProducts && bestSellerProducts.length > 0 && (
        <Container className="py-4 space-y-4">
          <HeaderPage>
            <HeaderPageContent>
              <HeaderPageTitle>Best Seller</HeaderPageTitle>
              <Link
                to={"/collections/best-seller"}
                className={cn(buttonVariants({ variant: "link" }))}
              >
                View all
              </Link>
            </HeaderPageContent>
          </HeaderPage>
          {isMobile ? (
            <ProductSlider products={bestSellerProducts} />
          ) : (
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {bestSellerProducts?.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </main>
          )}
        </Container>
      )}
    </div>
  );
};

export default HomeView;
