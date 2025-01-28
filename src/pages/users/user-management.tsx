import React, { useState } from "react";
import Button from "@/common/button/button";
import { TabButton, TabContainer } from "@/common/tab";
import { Sort } from "iconsax-react";
import { ArrowLeft, ArrowRight, Filter, Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@radix-ui/themes";
import Input from "@/common/input/input";
import StatusIndicator from "@/common/status";

const UserManagement = () => {
  const users = [
    {
      name: "Oliver Liam",
      role: "Super Admin",
      email: "oll.liam@gmail.com",
      union: "Livestock Transport Union",
      location: "Abuja, Nigeria",
    },
    {
      name: "William James",
      role: "Admin",
      email: "wjames@gmail.com",
      union: "National Truck",
      location: "Abuja, Nigeria",
    },
    {
      name: "Jackson Logan",
      role: "Admin",
      email: "jacksonl@gmail.com",
      union: "Livestock Transport Union",
      location: "Abuja, Nigeria",
    },
    {
      name: "Mason Henry",
      role: "Super Admin",
      email: "masonhendry@gmail.com",
      union: "National Truck",
      location: "Abuja, Nigeria",
    },
    {
      name: "Benjamin William",
      role: "Admin",
      email: "benwilliam@gmail.com",
      union: "National Truck",
      location: "Abuja, Nigeria",
    },
    {
      name: "Mason Lucas",
      role: "Super Admin",
      email: "lucasmason@gmail.com",
      union: "Livestock Transport Union",
      location: "Abuja, Nigeria",
    },
    {
      name: "Noah William",
      role: "User/Agent",
      email: "noahw@gmail.com",
      union: "Drivers Union",
      location: "Abuja, Nigeria",
    },
    {
      name: "James Oliver",
      role: "User/Agent",
      email: "james.oil@gmail.com",
      union: "Livestock Transport Union",
      location: "Abuja, Nigeria",
    },
    {
      name: "David Michael",
      role: "User/Agent",
      email: "davidlll@gmail.com",
      union: "Drivers Union",
      location: "Abuja, Nigeria",
    },
    {
      name: "Matthew Taylor",
      role: "Super Admin",
      email: "mataylor@gmail.com",
      union: "National Truck",
      location: "Abuja, Nigeria",
    },
  ];

  const [activeTab, setActiveTab] = useState("payment");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSwitchTab = (value: string) => {
    setActiveTab(value);
  };

  const handleBulkSelection = (checked: boolean) => {
    if (checked) {
      setSelectedItems(users.map((user) => user.email));
    } else {
      setSelectedItems([]);
    }
  };

  const handleIndividualSelection = (email: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(email)) {
        return prev.filter((item) => item !== email);
      } else {
        return [...prev, email];
      }
    });
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-5">
        <div>
          <h1 className="text-xl font-bold mb-2">User & Role Management</h1>
          <p>
            Allows the Super Admin to manage all users and assign agent roles to
            users.
          </p>
        </div>
        <div>
          <Input
            classNameWrapper="!border-none "
            className="h-[34px] !bg-[#eff0f2cf] !rounded-[5px]"
            type="date"
            label="Date Range"
          />
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="w-[60%]">
          <TabContainer className=" !w-full">
            <TabButton
              onClick={() => handleSwitchTab("all")}
              active={activeTab === "all"}
            >
              All
            </TabButton>
            <TabButton
              onClick={() => handleSwitchTab("user")}
              active={activeTab === "user"}
            >
              User/Agent
            </TabButton>
            <TabButton
              onClick={() => handleSwitchTab("admin")}
              active={activeTab === "admin"}
            >
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
          <Button
            className="!w-[120px] h-[40px]"
            variant="outlined"
            leftIcon={<Filter />}
          >
            Filter
          </Button>
          <Button
            className="!w-[120px] h-[40px]"
            variant="outlined"
            leftIcon={<Sort />}
          >
            Sort by
          </Button>
        </div>
      </div>
      <table className="min-w-full bg-white border rounded-lg">
        <thead className=" bg-[#F7F8FB] rounded-tl-2xl rounded-tr-2xl p-3">
          <tr>
            <th className="py-2 px-4 border-b ">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedItems.length === users.length}
                  onCheckedChange={handleBulkSelection}
                  id="select-all"
                />
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
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedItems.includes(user.email)}
                    onCheckedChange={() =>
                      handleIndividualSelection(user.email)
                    }
                    id={`user-${index}`}
                  />
                  <label htmlFor={`user-${index}`}>{user.name}</label>
                </div>
              </td>
              <td className="py-2 px-4 border-b  w-[140px]">
                <StatusIndicator status={user?.role} />
              </td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">{user.union}</td>
              <td className="py-2 px-4 border-b">{user.location}</td>
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
    </div>
  );
};

export default UserManagement;
