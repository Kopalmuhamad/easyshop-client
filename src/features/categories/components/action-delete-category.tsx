import { Button } from "@/components/atoms/button";
import { useDeleteCategory } from "../hooks/use-delete-category";

const ActionDeleteCategory = ({ categoryId }: { categoryId: string }) => {
  const { mutate: deleteCategory } = useDeleteCategory();
  return (
    <Button className="w-full" onClick={() => deleteCategory(categoryId!)} variant={"destructive"}>
      Delete
    </Button>
  );
};

export default ActionDeleteCategory;
