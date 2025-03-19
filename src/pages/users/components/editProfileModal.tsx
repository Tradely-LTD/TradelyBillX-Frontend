import { useEffect, useState } from "react";
import Button from "@/common/button/button";
import { Modal } from "@/common/modal/modal";
import InputComponent from "@/common/input/input";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/pages/auth/auth.api";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  id: string | null;
}

const EditProfileModal = ({ isOpen, onClose, id }: EditUserModalProps) => {
  const {
    data,
    isLoading: isProfileLoading,
    isFetching,
  } = useGetProfileQuery(
    { id: id ?? "" },
    {
      skip: !id,
    }
  );

  const user = data?.data;

  const [editingUser, setEditingUser] = useState({
    agentFee: 0,
    accountNumber: 0,
    bankCode: "",
    accountName: "",
    payStackAccountNumber: "",
  });

  // Update state when user data is loaded
  useEffect(() => {
    if (user) {
      setEditingUser({
        agentFee: user.agentFee || 0,
        accountNumber: user.accountNumber || 0,
        bankCode: user.bankCode || "",
        accountName: user.accountName || "",
        payStackAccountNumber: user.payStackAccountNumber || "",
      });
    }
  }, [user]);

  const [updateUser, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const handleUpdateUser = async () => {
    const payload = {
      id: id,
      ...editingUser,
    };
    try {
      await updateUser({ data: payload }).unwrap();
      onClose();
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setEditingUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Show loading state while fetching initial profile data
  if (isProfileLoading || isFetching) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} header={`Edit Bank Details`} className="!h-[600px]">
        <div className="p-5 flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4">Loading profile data...</p>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} header={`Edit Bank Details`} className="!h-[600px]">
      <div className="p-5 space-y-4">
        <InputComponent
          label="Agent Fee"
          type="number"
          value={editingUser.agentFee}
          onChange={(e) => handleInputChange("agentFee", parseInt(e.target.value) || 0)}
        />
        <InputComponent
          label="Account Number"
          type="text"
          value={editingUser.accountNumber}
          onChange={(e) => handleInputChange("accountNumber", e.target.value)}
        />
        <InputComponent
          label="Bank Code"
          type="text"
          value={editingUser.bankCode}
          onChange={(e) => handleInputChange("bankCode", e.target.value)}
        />
        <InputComponent
          label="Account Name"
          type="text"
          value={editingUser.accountName}
          onChange={(e) => handleInputChange("accountName", e.target.value)}
        />
        <InputComponent
          label="PayStack Account Number"
          type="text"
          disabled
          value={editingUser.payStackAccountNumber}
          onChange={(e) => handleInputChange("payStackAccountNumber", e.target.value)}
        />
      </div>
      <div className="flex gap-2 p-5">
        <Button onClick={onClose} variant="outlined" className="!text-[red]">
          Cancel
        </Button>

        {!editingUser.payStackAccountNumber && (
          <Button loading={isUpdating} onClick={handleUpdateUser}>
            Update
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default EditProfileModal;
