//@ts-nocheck
import Button from "@/common/button/button";
import { Modal } from "@/common/modal/modal";
import { Union, useDeleteUnionMutation } from "../union";

interface DeleteModalProps {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedUnion: (union: null) => void;
  selectedUnion: Union | null;
}

function DeleteModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  setSelectedUnion,
  selectedUnion,
}: DeleteModalProps) {
  const [deleteUnion, { isLoading: isDeleting }] = useDeleteUnionMutation();
  const handleDeleteUnion = async () => {
    // Implement delete logic here
    deleteUnion({ id: selectedUnion?.id ?? "" })
      .unwrap()
      .then(() => {
        setIsDeleteModalOpen(false);
        setSelectedUnion(null);
      });
  };

  return (
    <Modal
      isOpen={isDeleteModalOpen}
      onClose={() => setIsDeleteModalOpen(false)}
      header="Confirm Deletion"
      className="!h-[240px]"
    >
      <div className="p-5">
        <p>Are you sure you want to delete this union?</p>
      </div>
      <div className="flex gap-2 p-5">
        <Button
          onClick={() => setIsDeleteModalOpen(false)}
          variant="outlined"
          className="!text-[red]"
        >
          Cancel
        </Button>
        <Button loading={isDeleting} onClick={handleDeleteUnion}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
