import { useState } from "react";
import Button from "@/common/button/button";
import { Modal } from "@/common/modal/modal";
import SelectComponent from "@/common/input/select";
import { useUpdateUserMutation } from "@/pages/auth/auth.api";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: string;
    role: string;
    union: string;
    firstName: string;
  } | null;
}

const EditUserModal = ({ isOpen, onClose, user }: EditUserModalProps) => {
  const [editingUser, setEditingUser] = useState({
    role: user?.role,
    union: user?.union,
  });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const roleOptions = [
    { value: "agent", label: "Agent" },
    { value: "admin", label: "Admin" },
    { value: "superadmin", label: "Super Admin" },
  ];

  const unionOptions = [
    { value: "union1", label: "Union 1" },
    { value: "union2", label: "Union 2" },
    { value: "union3", label: "Union 3" },
  ];

  const handleUpdateUser = async () => {
    try {
      await updateUser({
        id: user?.id,
        ...editingUser,
      }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header={`Edit User - ${user?.firstName}`}
      className="!h-[400px]"
    >
      <div className="p-5 space-y-4">
        <SelectComponent
          label="Role"
          value={editingUser.role}
          options={roleOptions}
          onChange={(value) => setEditingUser({ ...editingUser, role: value })}
        />
        <SelectComponent
          label="Union"
          value={editingUser.union}
          options={unionOptions}
          onChange={(value) => setEditingUser({ ...editingUser, union: value })}
        />
      </div>
      <div className="flex gap-2 p-5">
        <Button onClick={onClose} variant="outlined" className="!text-[red]">
          Cancel
        </Button>
        <Button loading={isUpdating} onClick={handleUpdateUser}>
          Update
        </Button>
      </div>
    </Modal>
  );
};

export default EditUserModal;
