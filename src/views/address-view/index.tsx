import { buttonVariants } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import AddressCard from "@/components/shared/address-card";
import Container from "@/components/shared/container";
import Loader from "@/components/shared/loader";
import { useAddress } from "@/features/address/hooks/use-address";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";

const AddressView = () => {
  const { data: address, isLoading } = useAddress();

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader />
        </div>
      </div>
    );
  }

  if (!address) {
    return (
      <Container className="h-screen pt-20">
        <Card>
          <CardHeader>
            <CardTitle>You don&apos;t have any address yet.</CardTitle>
            <CardDescription>
              Create your first address before checkout by clicking the button
              below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to={"create"} className={cn(buttonVariants({}))}>
              Add Address
            </Link>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <div className="pt-20 h-full ">
      <Container className="h-full min-h-screen relative">
        <main className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          {address.map((address) => (
            <AddressCard key={address._id} address={address} />
          ))}
        </main>
        <Link
          to={"create"}
          className={cn(buttonVariants({}), "fixed bottom-3 left-3")}
        >
          <PlusIcon />
          <span>Add new address</span>
        </Link>
      </Container>
    </div>
  );
};

export default AddressView;
