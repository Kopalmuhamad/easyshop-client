import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { IProduct } from "@/features/product/utils/product-interface";

import ProductCard from "./product-card";

interface IProps {
  className?: string;
  products: IProduct[];
  isAdmin?: boolean;
  classNameCard?: string;
}

const ProductCardHoverEffect = (props: IProps) => {
  const { products, className, isAdmin = false, classNameCard } = props;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
        className
      )}
    >
      {products.map((item, idx) => (
        <div
          key={item?._id}
          className="relative group flex p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute -z-10 inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-lg"
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
          <ProductCard
            product={item}
            isAdmin={isAdmin}
            className={classNameCard}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductCardHoverEffect;
