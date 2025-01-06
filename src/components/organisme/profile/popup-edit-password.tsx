import UpdatePasswordForm from "@/features/auth/components/update-password-form";
import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";

const PopupEditPassword = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Edit Password</Button>
      </DialogTrigger>
      <DialogContent className="z-[9999]">
        <DialogHeader>
          <DialogTitle>Edit Password</DialogTitle>
          <UpdatePasswordForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default PopupEditPassword;
