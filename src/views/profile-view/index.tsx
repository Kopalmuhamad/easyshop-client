import { buttonVariants } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import Container from "@/components/shared/container";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import { useDefaultAddress } from "@/features/address/hooks/use-default-address";
import { Link } from "react-router-dom";
import ProfileAddress from "@/components/organisme/profile/profile-address";
import ProfileInfo from "@/components/organisme/profile/profile-info";

const ProfileView = () => {
  const { data: currentUser } = useCurrentUser();
  const { data: address } = useDefaultAddress();

  return (
    <Container className="py-20 grid grid-cols-1 md:grid-cols-2 gap-4 grid-flow-row">
      <ProfileInfo currentUser={currentUser!} />
      {address ? (
        <ProfileAddress address={address!} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>You don&apos;t have any address</CardTitle>
            <CardDescription>
              Create your first address before checkout
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              to={"address/create"}
              className={buttonVariants({ variant: "outline" })}
            >
              Add Address
            </Link>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default ProfileView;
