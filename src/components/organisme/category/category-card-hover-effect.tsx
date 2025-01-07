import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CategoryCard from "./category-card";

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
