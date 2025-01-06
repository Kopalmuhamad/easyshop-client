import { buttonVariants } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import Container from "@/components/shared/container";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import Loader from "@/components/shared/loader";
import { useAddress } from "@/features/address/hooks/use-address";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { Link } from "react-router-dom";
import AddressCard from "@/components/organisme/address/address-card";

const AddressView = () => {
  const { data: address, isLoading } = useAddress();

  if (isLoading) {
    return (
      <div className="relative w-screen h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <Loader size={"lg"} />
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
    <div className="pt-20 pb-10 h-full ">
      <Container className="h-full min-h-screen relative space-y-4">
        {/* Header Page */}
        <HeaderPage>
          <HeaderPageContent>
            <HeaderPageTitle>Address</HeaderPageTitle>
            <div className="flex justify-end py-4">
              <Link to={"create"} className={cn(buttonVariants({}))}>
                <PlusIcon />
                <span>Add new address</span>
              </Link>
            </div>
          </HeaderPageContent>
        </HeaderPage>

        {/* Main Content */}
        {/* Address List */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {address.map((address) => (
            // Address Card
            <AddressCard key={address._id} address={address} />
          ))}
        </main>

        {/* Action add new address */}
      </Container>
    </div>
  );
};

export default AddressView;
