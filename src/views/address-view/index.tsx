import { buttonVariants } from "@/components/atoms/button";
import AddressCard from "@/components/shared/address-card";
import Container from "@/components/shared/container";
import { useAddress } from "@/features/address/hooks/use-address";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const AddressView = () => {
  const { data: address, isLoading } = useAddress();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!address) {
    return <div>No address found</div>;
  }

  return (
    <Container className="min-h-screen pt-20 relative grid grid-cols-1 md:grid-cols-2">
      {address.map((address) => (
        <AddressCard key={address._id} address={address} />
      ))}
      <Link
        to={"create"}
        className={cn(buttonVariants({}), "absolute bottom-3 left-3")}
      >
        <PlusIcon />
        <span>Add new address</span>
      </Link>
    </Container>
  );
};

export default AddressView;
