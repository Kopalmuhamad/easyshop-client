import { cn } from "@/lib/utils";

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        className,
        `container px-2 w-full sm:max-w-2xl sm:px-0 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto`
      )}
    >
      {children}
    </section>
  );
};

export default Container;
