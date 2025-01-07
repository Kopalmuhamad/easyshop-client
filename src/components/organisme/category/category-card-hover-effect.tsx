import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import ActionDeleteCategory from "@/features/categories/components/action-delete-category";
import { Card, CardContent, CardFooter } from "@/components/atoms/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/atoms/animated-modal";
import AnimateButton from "@/components/atoms/animate-button";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/atoms/button";

interface IProps {
  items: {
    image: string;
    name: string;
    _id: string;
  }[];
  className?: string;
  hideFooter?: boolean;
}

const CategoryCardHoverEffect = (props: IProps) => {
  const { items, className, hideFooter } = props;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?._id}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute -z-10 inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <CategoryCard
            hideFooter={hideFooter}
            categoryImage={item?.image}
            categoryName={item?.name}
            categoryId={item?._id}
          />
        </div>
      ))}
    </div>
  );
};

export default CategoryCardHoverEffect;

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
        <CardFooter>
          <Modal>
            <ModalTrigger>
              <AnimateButton
                initialContent="Delete"
                variant="destructive"
                className="w-full"
              >
                <TrashIcon />
              </AnimateButton>
            </ModalTrigger>
            <ModalBody className="flex items-center justify-center">
              <ModalContent className="flex items-center justify-center flex-col gap-8">
                <h1 className="text-center font-semibold">
                  Are you sure you want to delete this category?
                </h1>
                <div className="w-full flex items-center justify-center gap-4">
                  <ActionDeleteCategory categoryId={categoryId} />
                  <Button className="w-full" variant={"outline"}>
                    Cancel
                  </Button>
                </div>
              </ModalContent>
            </ModalBody>
          </Modal>
        </CardFooter>
      )}
    </Card>
  );
};
