import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import UpdateUserForm from "@/features/auth/components/update-user-form";
import { ScrollArea } from "@/components/atoms/scroll-area";

const PopupEditUser = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="z-[9999]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <UpdateUserForm />  
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default PopupEditUser;
