import { Button } from "@/components/atoms/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/atoms/pagination";

interface IProps {
  handlePageChange: (page: number) => void;
  currentPage: number;
  totalPages: number;
}

const PaginationProduct = ({
  handlePageChange,
  currentPage,
  totalPages,
}: IProps) => {
  const renderPagination = () => {
    const pages = [];
    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(i)}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Page Button */}
        <Button variant={"ghost"} className="p-0" disabled={currentPage === 1}>
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              isActive={currentPage !== 1}
            />
          </PaginationItem>
        </Button>

        {/* Page Number Links */}
        {renderPagination()}

        {/* Ellipsis for overflow */}
        {totalPages > 5 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Page Button */}
        <Button
          variant={"ghost"}
          className="p-0"
          disabled={currentPage === totalPages}
        >
          <PaginationItem>
            <PaginationNext
              className="cursor-pointer"
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              isActive={currentPage !== totalPages}
            />
          </PaginationItem>
        </Button>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationProduct;
