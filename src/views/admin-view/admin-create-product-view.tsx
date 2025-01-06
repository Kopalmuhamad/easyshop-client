import { Card, CardContent } from "@/components/atoms/card";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageDescription,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import CreateProductForm from "@/features/product/components/create-product-form";

const AdminCreateProductView = () => {
  return (
    <div className="space-y-4 pr-2">
      <HeaderPage>
        <HeaderPageContent>
          <HeaderPageTitle>Create Product</HeaderPageTitle>
          <HeaderPageDescription>
            Please fill the form below to create category
          </HeaderPageDescription>
        </HeaderPageContent>
      </HeaderPage>
      <Card>
        <CardContent className="py-4">
          <CreateProductForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminCreateProductView;
