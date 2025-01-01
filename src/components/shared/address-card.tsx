import { IAddress } from "@/features/address/utils/interface-address";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../atoms/card";
import { Button } from "../atoms/button";
import { useSetDefaultAddress } from "@/features/address/hooks/use-set-default-address";
import { useRemoveAddress } from "@/features/address/hooks/use-remove-address";
import { Badge } from "../atoms/badge";
import { cn } from "@/lib/utils";

interface IAddressCardProps {
  address: IAddress;
  className?: string;
}
const AddressCard = ({ address, className }: IAddressCardProps) => {
  const { mutate: setAsDefault } = useSetDefaultAddress();
  const { mutate: removeAddress } = useRemoveAddress();
  return (
    <Card className={cn("h-full", className)}>
      <CardHeader>
        <CardTitle className="capitalize">{address?.detail}</CardTitle>
        <CardDescription>
          {address?.defaultAddress && (
            <Badge>{address?.defaultAddress ? "Default" : ""}</Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
          <span className="text-nowrap">Country : </span>
          <span className="text-muted-foreground">{address?.country}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
          <span className="text-nowrap">Province : </span>
          <span className="text-muted-foreground">{address?.province}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
          <span className="text-nowrap">City : </span>
          <span className="text-muted-foreground">{address?.city}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
          <span className="text-nowrap">District : </span>
          <span className="text-muted-foreground">{address?.district}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
          <span className="text-nowrap">Sub District : </span>
          <span className="text-muted-foreground">{address?.subDistrict}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-base font-medium py-1 border-b border-border">
          <span className="text-nowrap">Postal Code : </span>
          <span className="text-muted-foreground">{address?.postalCode}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-start justify-between text-base font-medium gap-2">
          <span className="text-nowrap">Detail : </span>
          <span className="text-muted-foreground">
            {address?.country}, {address?.province}, {address?.city},
            {address?.district}, {address?.subDistrict}, {address?.postalCode},{" "}
            {address?.detail}
          </span>
        </div>
      </CardContent>
      <CardFooter className="space-x-4">
        {!address?.defaultAddress && (
          <Button
            onClick={() => setAsDefault(address?._id)}
            variant={"outline"}
          >
            Set as default
          </Button>
        )}
        <Button
          variant={"destructive"}
          onClick={() => removeAddress(address._id)}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
