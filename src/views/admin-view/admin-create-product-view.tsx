import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import CreateProductForm from "@/features/product/components/create-product-form";

const AdminCreateProductView = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateProductForm />
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminCreateProductView;
