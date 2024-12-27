import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import CreateCategoryForm from "@/features/categories/components/create-category-form";

const AdminCreateCategoryView = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Category</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateCategoryForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default AdminCreateCategoryView;
