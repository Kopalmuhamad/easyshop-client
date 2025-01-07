import AnimateButton from "@/components/atoms/animate-button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/components/atoms/animated-modal";
import { Button } from "@/components/atoms/button";
import ActionDeleteCategory from "@/features/categories/components/action-delete-category";
import { TrashIcon } from "lucide-react";

const ModalDeleteCategory = ({ categoryId }: { categoryId: string }) => {
  return (
    <Modal>
      <ModalTrigger>
        <AnimateButton
          initialContent="Delete"
          variant="destructive"
          className="w-full"
        >
          <TrashIcon />
        </AnimateButton>
      </ModalTrigger>
      <ModalBody className="flex items-center justify-center">
        <ModalContent className="flex items-center justify-center flex-col gap-8">
          <h1 className="text-center font-semibold">
            Are you sure you want to delete this category?
          </h1>
          <div className="w-full flex items-center justify-center gap-4">
            <ActionDeleteCategory categoryId={categoryId} />
            <Button className="w-full" variant={"outline"}>
              Cancel
            </Button>
          </div>
        </ModalContent>
      </ModalBody>
    </Modal>
  );
};

export default ModalDeleteCategory;
