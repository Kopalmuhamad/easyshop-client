import { IAddress } from "@/features/address/utils/interface-address";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../atoms/dialog";
import { Button } from "../../atoms/button";
import { ScrollArea } from "../../atoms/scroll-area";
import { MapPin, PlusCircle } from "lucide-react";
import AddressCard from "./address-card";

const PopupListAddress = ({ address }: { address: IAddress[] | undefined }) => {
  if (!address)
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-8">
        <div className="bg-secondary p-4 rounded-full mb-4">
          <MapPin className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-lg font-semibold mb-2">No Addresses Found</h2>
        <p className="text-sm text-muted-foreground mb-6 max-w-[250px]">
          You haven't added any addresses yet. Add a new address to get started.
        </p>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>
    );
  return (
    <Dialog>
      <DialogTrigger asChild className="ml-4 w-fit">
        <Button size={"sm"}>Change Address</Button>
      </DialogTrigger>
      <DialogContent className="px-0">
        <DialogHeader>
          <DialogTitle>Change Address</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] px-2">
          <div className="py-4 space-y-4">
            {address?.map((address) => (
              <AddressCard key={address._id} address={address} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PopupListAddress;
