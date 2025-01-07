import { buttonVariants } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import CategoryCardHoverEffect from "@/components/organisme/category/category-card-hover-effect";
import { HeaderPage, HeaderPageTitle } from "@/components/atoms/header-page";
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
      <CategoryCardHoverEffect className="md:grid-cols-3" items={categories!} hideFooter={false} />
    </div>
  );
};

export default AdminCategoriesView;
