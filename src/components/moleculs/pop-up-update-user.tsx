import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import UpdateUserForm from "../../features/auth/components/update-user-form";

const PopUpUpdateUser = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="z-[9999]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <UpdateUserForm />
      </DialogContent>
    </Dialog>
  );
};

export default PopUpUpdateUser;
