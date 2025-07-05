import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import Button from "@/common/button/button";
import Text from "@/common/text/text";
import { Loader } from "@/common/loader/loader";
import StatusIndicator from "@/common/status";
import { Union, useGetUnionQuery } from "./union";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/utils/helper";
import EditModal from "./components/editModal";
import DeleteModal from "./components/deleteModal";
import EmptyState from "../components/empty-state";

const UnionManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const [selectedUnion, setSelectedUnion] = useState<Union | null>(null);

  const [editingUnion, setEditingUnion] = useState<Union>({
    id: "",
    name: "",
    code: "",
    status: true,
    description: "",
  });

  const { data: unions, isLoading } = useGetUnionQuery();

  const handleEditUnion = (union: Union) => {
    setEditingUnion(union);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4">
      {/* Header Section */}
      <div className="flex justify-between mb-5">
        <div>
          <Text block h1>
            Union Management
          </Text>
          <Text secondaryColor>Manage unions and their associated permissions</Text>
        </div>
        <Button
          onClick={() => {
            navigate("/union/add");
          }}
        >
          Add Union
        </Button>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <Loader />
      ) : unions?.data?.length === 0 ? (
        <EmptyState
          showButton={false}
          description="No unions found. Add a new union to get started."
        />
      ) : (
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-[#F7F8FB] rounded-tl-2xl rounded-tr-2xl p-3">
            <tr className="text-left">
              <th className="py-2 px-4 border-b">S/N</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Code</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Created At</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>

          <tbody>
            {unions?.data?.map((union, index) => (
              <tr key={union.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{union.name}</td>
                <td className="py-2 px-4 border-b">{union.code}</td>
                <td className="py-2 px-4 border-b">
                  <StatusIndicator status={union.status ? "active" : "inactive"} />
                </td>
                <td className="py-2 px-4 border-b">{union.description}</td>
                <td className="py-2 px-4 border-b">{formatDate(union.createdAt ?? "")}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditUnion(union)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <Pencil size={18} />
                    </button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedUnion(union);
                        setIsDeleteModalOpen(true);
                      }}
                      className="p-1 !text-red-500 hover:text-gray-700"
                    >
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        selectedUnion={selectedUnion}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setSelectedUnion={setSelectedUnion}
      />
      <EditModal
        editingUnion={editingUnion}
        isModalOpen={isModalOpen}
        setEditingUnion={setEditingUnion}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default UnionManagement;
