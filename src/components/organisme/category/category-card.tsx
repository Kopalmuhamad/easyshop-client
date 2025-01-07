import { Card, CardContent, CardFooter } from "@/components/atoms/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import ModalDeleteCategory from "./modal-delete-category";

interface ICategoryCardProps {
  categoryName: string;
  categoryImage: string;
  categoryId: string;
  hideFooter?: boolean;
  className?: string;
}

const CategoryCard = ({
  categoryName,
  categoryImage,
  categoryId,
  hideFooter = true,
}: ICategoryCardProps) => {
  return (
    <Card className={cn("h-full overflow-hidden bg-secondary relative")}>
      <Link
        to={`/collections/category/${categoryName}`}
        className="flex flex-col items-center justify-center"
      >
        <figure className="flex items-center justify-center pt-5">
          <img src={categoryImage} alt={categoryName} className="w-12" />
        </figure>
        <CardContent className="flex items-center justify-center text-center">
          <h1 className="text-sm md:text-base font-medium capitalize">
            {categoryName}
          </h1>
        </CardContent>
      </Link>
      {!hideFooter && (
        <CardFooter className="flex items-center justify-center">
          <ModalDeleteCategory categoryId={categoryId} />
        </CardFooter>
      )}
    </Card>
  );
};
export default CategoryCard;
