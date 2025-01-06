import { IAddress } from "@/features/address/utils/interface-address";
import { PlusCircle } from "lucide-react";
import { Button } from "../../atoms/button";

const CheckoutShippingAddress = ({
  defaultAddress,
}: {
  defaultAddress: IAddress[] | undefined;
}) => {
  if (!defaultAddress) {
    return (
      <div className="text-center py-8">
        <div className="inline-block p-3 bg-secondary rounded-full mb-4">
          <PlusCircle className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-lg font-semibold mb-2">No Address Found</h2>
        <p className="text-sm text-muted-foreground mb-4">
          You haven't added any shipping addresses yet.
        </p>
        <Button>
          <PlusCircle className="w-4 h-4 mr-2" />
          Add New Address
        </Button>
      </div>
    );
  }
  return (
    <div className="p-4 space-y-4">
      <header className="border-b border-border pb-1">
        <h1 className="text-base font-semibold">Shipping Address</h1>
      </header>
      <div>
        {defaultAddress?.map((address) => (
          <div key={address._id}>
            <h1 className="text-sm font-medium capitalize">{address.detail}</h1>
            <p className="text-xs text-muted-foreground">
              {address.postalCode}, {address.subDistrict}, {address.district},{" "}
              {address.city}, {address.province}, {address.country}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckoutShippingAddress;
