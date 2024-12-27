import CategoryCard from "@/components/shared/category-card";
import { useCategories } from "@/features/categories/hooks/use-categories";

const AdminCategoriesView = () => {
  const { data: categories } = useCategories();
  return (
    <div className="space-y-4 mt-2">
      <header>
        <h1 className="text-2xl font-semibold">Categories</h1>
      </header>
      <main className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {categories?.map((category) => (
          <CategoryCard
            hideFooter={false}
            key={category._id}
            category={category}
          />
        ))}
      </main>
    </div>
  );
};

export default AdminCategoriesView;
