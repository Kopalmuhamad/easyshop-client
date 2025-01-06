import {
  Card,
  CardContent,
} from "@/components/atoms/card";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageDescription,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import CreateCategoryForm from "@/features/categories/components/create-category-form";

const AdminCreateCategoryView = () => {
  return (
    <div className="pr-2 space-y-4">
      <HeaderPage>
        <HeaderPageContent>
          <HeaderPageTitle>Create Category</HeaderPageTitle>
          <HeaderPageDescription>
            Please fill the form below to create category
          </HeaderPageDescription>
        </HeaderPageContent>
      </HeaderPage>
      <Card>
        <CardContent className="py-4">
          <CreateCategoryForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCreateCategoryView;
