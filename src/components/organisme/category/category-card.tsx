import ActionDeleteCategory from "@/features/categories/components/action-delete-category";
import { Card, CardContent, CardFooter } from "@/components/atoms/card";
import { ICategory } from "@/features/categories/utils/category-interface";
import { Link } from "react-router-dom";

interface ICategoryCardProps {
  category: ICategory;
  hideFooter?: boolean;
}


const CategoryCard = ({ category, hideFooter = true }: ICategoryCardProps) => {
  return (
    <Card className="h-full overflow-hidden bg-secondary dark:bg-white dark:text-black">
      <Link
        to={`/collections/category/${category.name}`}
        className="flex flex-col items-center justify-center"
      >
        <figure className="flex items-center justify-center pt-5">
          <img src={category.image} alt={category.name} className="w-12" />
        </figure>
        <CardContent className="flex items-center justify-center text-center">
          <h1 className="text-base font-medium capitalize">{category.name}</h1>
        </CardContent>
      </Link>
      {!hideFooter && (
        <CardFooter>
          <ActionDeleteCategory categoryId={category._id} />
        </CardFooter>
      )}
    </Card>
  );
};

export default CategoryCard;
