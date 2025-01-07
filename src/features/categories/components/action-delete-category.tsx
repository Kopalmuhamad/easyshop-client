import { Button } from "@/components/atoms/button";
import { useDeleteCategory } from "../hooks/use-delete-category";
import Loader from "@/components/shared/loader";

const ActionDeleteCategory = ({ categoryId }: { categoryId: string }) => {
  const { mutate: deleteCategory, status } = useDeleteCategory();
  const isLoading = status === "pending";
  return (
    <Button
      className="w-full"
      onClick={() => deleteCategory(categoryId!)}
      variant={"destructive"}
      disabled={isLoading}
    >
      {isLoading ? <Loader size="xs" /> : "Delete"}
    </Button>
  );
};

export default ActionDeleteCategory;
