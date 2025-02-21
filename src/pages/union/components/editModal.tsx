import Button from "@/common/button/button";
import Text from "@/common/text/text";
import Input from "@/common/input/input";
import { Modal } from "@/common/modal/modal";
import { Union, useUpdateUnionMutation } from "../union";

interface EditModalProps {
  setEditingUnion: React.Dispatch<React.SetStateAction<Union>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  editingUnion: Union;
}

function EditModal({ setEditingUnion, setIsModalOpen, isModalOpen, editingUnion }: EditModalProps) {
  const [triggerUpdate, { isLoading: isUpdating }] = useUpdateUnionMutation();
  const handleUpdateUnion = async () => {
    // Implement update logic here

    triggerUpdate({
      data: editingUnion,
    })
      .unwrap()
      .then(() => {
        setIsModalOpen(false);
      });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      header="Edit Union"
      className="!h-[500px]"
    >
      <div className="p-5 space-y-4">
        <Input
          label="Name"
          value={editingUnion.name}
          onChange={(e) => setEditingUnion({ ...editingUnion, name: e.target.value })}
        />
        <Input
          label="Code"
          value={editingUnion.code}
          onChange={(e) => setEditingUnion({ ...editingUnion, code: e.target.value })}
        />
        <Input
          label="Description"
          value={editingUnion.description}
          onChange={(e) => setEditingUnion({ ...editingUnion, description: e.target.value })}
        />
        <div className="flex items-center justify-between">
          <Text>Status</Text>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={editingUnion.status}
              className="sr-only peer"
              onChange={() => setEditingUnion({ ...editingUnion, status: !editingUnion.status })}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>
      <div className="flex gap-2 p-5">
        <Button onClick={() => setIsModalOpen(false)} variant="outlined" className="!text-[red]">
          Cancel
        </Button>
        <Button loading={isUpdating} onClick={handleUpdateUnion}>
          Update
        </Button>
      </div>
    </Modal>
  );
}

export default EditModal;
