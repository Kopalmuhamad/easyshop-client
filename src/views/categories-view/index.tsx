import { Card, CardContent } from "@/components/atoms/card";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import CategoryCard from "@/components/organisme/category/category-card";
import Container from "@/components/shared/container";
import Loader from "@/components/shared/loader";
import { useCategories } from "@/features/categories/hooks/use-categories";

const CategoriesView = () => {
  const { data: categories, isLoading } = useCategories();
  if (isLoading) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader size={"lg"} />
        </div>
      </div>
    );
  }

  if (!categories || categories.length === 0)
    return (
      <div>
        <Card>
          <CardContent className="py-4">
            <h1 className="text-xl font-semibold text-center">
              No Categories Found
            </h1>
          </CardContent>
        </Card>
      </div>
    );

  return (
    <Container className="pt-20 pb-10 space-y-4">
      <HeaderPage>
        <HeaderPageContent>
          <HeaderPageTitle>Categories</HeaderPageTitle>
        </HeaderPageContent>
      </HeaderPage>
      <main className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-13 gap-4">
        {categories?.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </main>
    </Container>
  );
};

export default CategoriesView;
