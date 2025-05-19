import CustomButton from "@/app/common/components/Buttons/CustomButton";
import { BsFillTrashFill } from "react-icons/bs";
import { Modal } from "rsuite";

export default function DeleteCard({
  title,
  caption,
  open,
  setOpen,
  handleConfirm,
  handleCancel,
  isLoading,
}: {
  title: string;
  caption: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  isLoading: boolean;
}) {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      size="xs"
      closeButton={false}
    >
      <section className="flex items-center justify-between pb-0">
        <Modal.Title className="flex items-center gap-2 text-lg font-semibold">
          <div className="flex flex-row items-center gap-2">
            <BsFillTrashFill className="h-6 w-6 text-red-500" />
            {title}
          </div>
        </Modal.Title>
        <CustomButton
          variant="outline"
          size="sm"
          onClick={() => setOpen(false)}
        >
          ✕
        </CustomButton>
      </section>

      <Modal.Body className="px-6 py-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <BsFillTrashFill size={45} className="text-red-500" />
          <p className="text-center text-red-500">{caption}</p>

          <div className="flex items-center justify-center gap-3 pt-4 w-full">
            <CustomButton
              variant="secondary"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </CustomButton>
            <CustomButton
              variant="danger"
              onClick={handleConfirm}
              isLoading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </CustomButton>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
