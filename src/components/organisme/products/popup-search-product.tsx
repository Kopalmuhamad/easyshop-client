import { SearchIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import { Button } from "@/components/atoms/button";
import ProductSearchInput from "./product-search-input";

const PopupSearchProduct = () => {
  return (
    <Dialog>
      <DialogTrigger className="col-start-2 row-start-1 md:col-start-3 justify-self-center mx-1">
        <Button variant={"outline"} size="icon">
          <SearchIcon size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center justify-center">
          <DialogTitle>Search</DialogTitle>
          <DialogDescription>Search for products</DialogDescription>
        </DialogHeader>
        <ProductSearchInput />
      </DialogContent>
    </Dialog>
  );
};

export default PopupSearchProduct;
