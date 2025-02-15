import { useState } from "react";
import Button from "@/common/button/button";
import { TabButton, TabContainer } from "@/common/tab";
import { Sort } from "iconsax-react";
import { ArrowLeft, ArrowRight, Filter, Pencil, Trash2 } from "lucide-react";
import Input from "@/common/input/input";
import StatusIndicator from "@/common/status";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../auth/auth.api";
import { Loader } from "@/common/loader/loader";

const UserManagement = () => {
  const navigate = useNavigate();
  const { data: users, isLoading, isFetching } = useGetUsersQuery();
  const [activeTab, setActiveTab] = useState("all");
  // const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSwitchTab = (value: string) => {
    setActiveTab(value);
  };

  // const handleBulkSelection = (checked: boolean) => {
  //   if (checked) {
  //     setSelectedItems(users.map((user) => user.email));
  //   } else {
  //     setSelectedItems([]);
  //   }
  // };

  // const handleIndividualSelection = (email: string) => {
  //   setSelectedItems((prev) => {
  //     if (prev.includes(email)) {
  //       return prev.filter((item) => item !== email);
  //     } else {
  //       return [...prev, email];
  //     }
  //   });
  // };

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

      <div className=" flex justify-end mb-4">
        <Input
          classNameWrapper="!border-none "
          className="h-[34px] !bg-[#eff0f2cf] !rounded-[5px]"
          type="date"
          label="Date Range"
        />
      </div>
      <div className="flex justify-between mb-4">
        <div className="w-[60%]">
          <TabContainer className=" !w-full">
            <TabButton onClick={() => handleSwitchTab("all")} active={activeTab === "all"}>
              All
            </TabButton>
            <TabButton onClick={() => handleSwitchTab("user")} active={activeTab === "user"}>
              User/Agent
            </TabButton>
            <TabButton onClick={() => handleSwitchTab("admin")} active={activeTab === "admin"}>
              Admin
            </TabButton>
            <TabButton
              onClick={() => handleSwitchTab("super_admin")}
              active={activeTab === "super_admin"}
            >
              Super Admin
            </TabButton>
          </TabContainer>
        </div>

        <div className="flex gap-3">
          <Button className="!w-[120px] h-[40px]" variant="outlined" leftIcon={<Filter />}>
            Filter
          </Button>
          <Button className="!w-[120px] h-[40px]" variant="outlined" leftIcon={<Sort />}>
            Sort by
          </Button>
        </div>
      </div>

      {isLoading || isFetching ? (
        <Loader />
      ) : (
        <>
          <table className="min-w-full bg-white border rounded-lg">
            <thead className=" bg-[#F7F8FB] rounded-tl-2xl rounded-tr-2xl p-3">
              <tr className="text-left">
                <th className="py-2 px-4 border-b ">
                  <div className="flex items-center gap-2">
                    <label htmlFor="select-all">Name</label>
                  </div>
                </th>
                <th className="py-2 px-4 border-b">Role</th>
                <th className="py-2 px-4 border-b">Email</th>
                <th className="py-2 px-4 border-b">Union</th>
                <th className="py-2 px-4 border-b">Location</th>

                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.data?.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center gap-2">
                      <label htmlFor={`user-${index}`}>{user.firstName}</label>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b  w-[140px]">
                    <StatusIndicator status={user?.role} />
                  </td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.firstName}</td>
                  <td className="py-2 px-4 border-b">{user.state}</td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex gap-2">
                      <button className="p-1 text-gray-500 hover:text-gray-700">
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

          <div className="flex gap-3 justify-between py-3">
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
          </div>
        </>
      )}
    </div>
  );
};

export default UserManagement;
