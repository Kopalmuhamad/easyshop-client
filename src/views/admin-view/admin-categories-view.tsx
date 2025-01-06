import { buttonVariants } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { HeaderPage, HeaderPageTitle } from "@/components/atoms/header-page";
import CategoryCard from "@/components/organisme/category/category-card";
import Loader from "@/components/shared/loader";
import { useCategories } from "@/features/categories/hooks/use-categories";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const AdminCategoriesView = () => {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      </div>
    );
  }

  if (!categories) {
    <Card>
      <CardHeader>
        <CardTitle>You don&apos;t have any category yet.</CardTitle>
        <CardDescription>Create your first category</CardDescription>
      </CardHeader>
      <CardContent>
        <Link to={"/admin/add-category"} className={cn(buttonVariants({}))}>
          Add Address
        </Link>
      </CardContent>
    </Card>;
  }

  return (
    <div className="space-y-4 mt-2">
      <HeaderPage>
        <HeaderPageTitle>Categories</HeaderPageTitle>
      </HeaderPage>
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
