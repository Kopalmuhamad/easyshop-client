import { Badge } from "@/components/atoms/badge";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { useRemoveAddress } from "@/features/address/hooks/use-remove-address";
import { useSetDefaultAddress } from "@/features/address/hooks/use-set-default-address";
import { IAddress } from "@/features/address/utils/interface-address";

interface IProps {
  address: IAddress;
}

const AddressCard = ({ address }: IProps) => {
  const { mutate: setDefaultAddress } = useSetDefaultAddress();
  const { mutate: removeAddress } = useRemoveAddress();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{address?.detail}</CardTitle>
        <CardDescription>
          {address?.defaultAddress && (
            <Badge>{address?.defaultAddress ? "Default" : ""}</Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          <li className="flex flex-col justify-between text-base font-medium py-1 border-b border-border">
            <span className="text-nowrap">Country : </span>
            <span className="text-muted-foreground">{address?.country}</span>
          </li>
          <li className="flex flex-col justify-between text-base font-medium py-1 border-b border-border">
            <span className="text-nowrap">Province : </span>
            <span className="text-muted-foreground">{address?.province}</span>
          </li>
          <li className="flex flex-col justify-between text-base font-medium py-1 border-b border-border">
            <span className="text-nowrap">City : </span>
            <span className="text-muted-foreground">{address?.city}</span>
          </li>
          <li className="flex flex-col justify-between text-base font-medium py-1 border-b border-border">
            <span className="text-nowrap">District : </span>
            <span className="text-muted-foreground">{address?.district}</span>
          </li>
          <li className="flex flex-col justify-between text-base font-medium py-1 border-b border-border">
            <span className="text-nowrap">Sub District : </span>
            <span className="text-muted-foreground">
              {address?.subDistrict}
            </span>
          </li>
          <li className="flex flex-col justify-between text-base font-medium py-1 border-b border-border">
            <span className="text-nowrap">Postal Code : </span>
            <span className="text-muted-foreground">{address?.postalCode}</span>
          </li>
          <li className="flex flex-col justify-between text-base font-medium py-1 border-b border-border">
            <span className="text-nowrap">Detail : </span>
            <span className="text-muted-foreground">
              {address?.country}, {address?.province}, {address?.city},
              {address?.district}, {address?.subDistrict}, {address?.postalCode}
              , {address?.detail}
            </span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="space-x-4">
        {!address?.defaultAddress && (
          <Button
            onClick={() => setDefaultAddress(address?._id)}
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
