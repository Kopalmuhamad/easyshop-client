import { buttonVariants } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import Container from "@/components/shared/container";
import PopupEditUser from "@/components/organisme/profile/popup-edit-user";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import PopupEditPassword from "@/components/organisme/profile/popup-edit-password";
import { useDefaultAddress } from "@/features/address/hooks/use-default-address";
import { Link } from "react-router-dom";
import { IAuth } from "@/features/auth/utils/auth-interface";
import ProfileAddress from "@/components/organisme/profile/profile-address";

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

const ProfileInfo = ({ currentUser }: { currentUser: IAuth }) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <figure className="w-fit">
          <img
            src={
              currentUser?.image ||
              "https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small_2x/default-avatar-photo-placeholder-profile-picture-vector.jpg"
            }
            alt={currentUser?.username || "profile_image"}
            className="aspect-square w-full max-w-[300px] rounded-full object-cover object-center"
          />
          {!currentUser?.image && (
            <p className="text-center mt-2 text-sm text-muted-foreground">
              You don't have a profile picture
            </p>
          )}
        </figure>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-start gap-2 p-2 bg-secondary rounded-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between text-sm md:text-base font-medium gap-1">
            <span className="text-nowrap">Firstname : </span>
            <span className="text-muted-foreground capitalize">
              {currentUser?.firstName}
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between text-sm md:text-base font-medium gap-1">
            <span className="text-nowrap">Lastname : </span>
            <span className="text-muted-foreground capitalize">
              {currentUser?.lastName}
            </span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-sm md:text-base font-medium p-2 bg-secondary rounded-md">
          <span className="text-nowrap">Username : </span>
          <span className="text-muted-foreground">{currentUser?.username}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-sm md:text-base font-medium p-2 bg-secondary rounded-md">
          <span className="text-nowrap">Email : </span>
          <span className="text-muted-foreground">{currentUser?.email}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-sm md:text-base font-medium p-2 bg-secondary rounded-md">
          <span className="text-nowrap">Phone No : </span>
          <span className="text-muted-foreground capitalize">
            {currentUser?.phone}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between text-sm md:text-base font-medium p-2 bg-secondary rounded-md">
          <span className="text-nowrap">Gender : </span>
          <span className="text-muted-foreground capitalize">
            {currentUser?.gender}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-start flex-wrap gap-2">
        <PopupEditUser />
        <PopupEditPassword />
        {currentUser?.isVerified === false && (
          <Link
            to={"/verify"}
            className={buttonVariants({ variant: "secondary" })}
          >
            Verification account
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
