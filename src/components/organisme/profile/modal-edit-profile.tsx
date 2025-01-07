import UpdateUserForm from "@/features/auth/components/update-user-form";
import { ScrollArea } from "@/components/atoms/scroll-area";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/atoms/animated-modal";
import AnimateButton from "@/components/atoms/animate-button";
import { PencilIcon } from "lucide-react";
import Logo from "@/components/shared/logo";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageDescription,
  HeaderPageTitle,
} from "@/components/atoms/header-page";

const ModalEditProfile = () => {
  return (
    <Modal>
      <ModalTrigger>
        <AnimateButton initialContent="Edit Profile" variant="secondary">
          <PencilIcon className="fill-foreground" />
        </AnimateButton>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>
          <HeaderPage className="pb-4">
            <HeaderPageContent>
              <HeaderPageTitle>
                <Logo />
              </HeaderPageTitle>
              <HeaderPageDescription>Edit Profile</HeaderPageDescription>
            </HeaderPageContent>
          </HeaderPage>
          <ScrollArea className="max-h-[80vh]">
            <UpdateUserForm />
          </ScrollArea>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default ModalEditProfile;
