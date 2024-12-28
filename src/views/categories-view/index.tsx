import CategoryCard from "@/components/shared/category-card";
import Container from "@/components/shared/container";
import { useCategories } from "@/features/categories/hooks/use-categories";

const CategoriesView = () => {
  const { data: categories } = useCategories();
  return (
    <Container className="pt-20 pb-10 space-y-4">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categories</h1>
      </header>
      <main className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-8 xl:grid-cols-13 gap-4">
        {categories?.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </main>
    </Container>
  );
};

export default CategoriesView;
