import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/atoms/card";
import { IAuth } from "@/features/auth/utils/auth-interface";
import PopupEditPassword from "./popup-edit-password";
import { Link } from "react-router-dom";
import { buttonVariants } from "@/components/atoms/button";
import ModalEditProfile from "./modal-edit-profile";

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
        <ModalEditProfile />
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

export default ProfileInfo;
