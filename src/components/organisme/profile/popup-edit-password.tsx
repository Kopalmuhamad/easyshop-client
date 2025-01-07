import UpdatePasswordForm from "@/features/auth/components/update-password-form";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/atoms/animated-modal";
import AnimateButton from "@/components/atoms/animate-button";
import {
  HeaderPage,
  HeaderPageContent,
  HeaderPageDescription,
  HeaderPageTitle,
} from "@/components/atoms/header-page";
import Logo from "@/components/shared/logo";
import {  LockKeyholeIcon } from "lucide-react";

const PopupEditPassword = () => {
  return (
    <>
      <Modal>
        <ModalTrigger>
          <AnimateButton initialContent="Change Password" variant="secondary">
            <LockKeyholeIcon className="fill-foreground" />
          </AnimateButton>
        </ModalTrigger>
        <ModalBody>
          <ModalContent>
            <HeaderPage className="pb-4">
              <HeaderPageContent>
                <HeaderPageTitle>
                  <Logo />
                </HeaderPageTitle>
                <HeaderPageDescription>Change Password</HeaderPageDescription>
              </HeaderPageContent>
            </HeaderPage>
            <UpdatePasswordForm />
          </ModalContent>
        </ModalBody>
      </Modal>
    </>
  );
};
export default PopupEditPassword;
