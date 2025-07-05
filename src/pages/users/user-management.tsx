//@ts-nocheck
import { useState } from "react";
import Button from "@/common/button/button";
import { TabButton, TabContainer } from "@/common/tab";
import { Pencil, Trash2 } from "lucide-react";
import StatusIndicator from "@/common/status";
import { useNavigate } from "react-router-dom";
import { AuthUser, useGetUsersQuery, UserRole } from "../auth/auth.api";
import { Loader } from "@/common/loader/loader";
// import EditUserModal from "./components/editUserModal";
import EmptyState from "../components/empty-state";
import { capitalizeFirstLetter } from "@/utils/helper";
import { useUserSlice } from "../auth/authSlice";
import EditProfileModal from "./components/editProfileModal";

const UserManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<UserRole | null>("agent");
  const { data: users, isLoading, isFetching } = useGetUsersQuery({ role: activeTab });
  const handleSwitchTab = (value: UserRole) => {
    setActiveTab(value);
  };
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AuthUser | null>(null);
  const { loginResponse } = useUserSlice();
  const handleEditClick = (user: AuthUser) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold mb-2">User & Role Management</h1>
          <p>Allows the Super Admin to manage all users and assign agent roles to users.</p>
        </div>
        <div>
          <Button
            onClick={() => {
              navigate("/users/add");
            }}
          >
            Add User
          </Button>
        </div>
      </div>
      {loginResponse?.user.role === "superadmin" && (
        <div className="flex justify-between mb-4">
          <div className="w-[60%] my-3">
            <TabContainer className="!w-[450px] ">
              <TabButton onClick={() => handleSwitchTab(null)} active={activeTab === null}>
                All
              </TabButton>
              <TabButton
                className=""
                onClick={() => handleSwitchTab("agent")}
                active={activeTab === "agent"}
              >
                User/Agent
              </TabButton>
              <TabButton onClick={() => handleSwitchTab("admin")} active={activeTab === "admin"}>
                Admin
              </TabButton>
              <TabButton
                onClick={() => handleSwitchTab("superadmin")}
                active={activeTab === "superadmin"}
              >
                Super Admin
              </TabButton>
            </TabContainer>
          </div>
        </div>
      )}

      {isLoading || isFetching ? (
        <Loader />
      ) : users?.data?.length === 0 ? (
        <EmptyState
          showButton={false}
          description="No users found. Add a new user to get started."
        />
      ) : (
        <>
          <table className="min-w-full bg-white border rounded-lg">
            <thead className=" bg-[#F7F8FB] rounded-tl-2xl rounded-tr-2xl p-3">
              <tr className="text-left">
                <th className="py-2 px-4 border-b">S/N</th>
                <th className="py-2 px-4 border-b ">
                  <div className="flex items-center gap-2">
                    <label htmlFor="select-all">Name</label>
                  </div>
                </th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Union</th>
                {/* <th className="py-2 px-4 border-b">Location</th> */}

                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{++index}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center gap-2">
                      <label htmlFor={`user-${index}`}>
                        {capitalizeFirstLetter(user.firstName ?? "")}
                      </label>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b  w-[140px]">
                    <StatusIndicator status={user?.role} />
                  </td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.union}</td>
                  {/* <td className="py-2 px-4 border-b">{user.state}</td> */}
                  <td className="py-2 px-4 border-b">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <Pencil size={18} />
                      </button>
                      <button className="p-1 text-gray-500 hover:text-gray-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <EditUserModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
            user={selectedUser}
          /> */}
          <EditProfileModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
            id={selectedUser ? selectedUser?.id : null}
          />
          {/* <div className="flex gap-3 justify-between py-3">
            <Button
              // disabled
              leftIcon={<ArrowLeft color="green" />}
              variant="outlined"
              className="!text-green-700 !rounded-lg"
            >
              Previous
            </Button>
            <Button
              className="!text-green-700  !rounded-lg"
              rightIcon={<ArrowRight />}
              variant="outlined"
            >
              Next
            </Button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default UserManagement;
