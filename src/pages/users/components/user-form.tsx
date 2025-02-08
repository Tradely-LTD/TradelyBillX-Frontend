import Button from "@/common/button/button";
import Input from "@/common/input/input";
import SelectComponent from "@/common/input/select";
import Text from "@/common/text/text";
import { Save } from "lucide-react";
import UserIcon from "@/assets/user.svg";

interface Props {
  mode: "create" | "update";
  userId?: string;
}

function UserForm({ mode, userId }: Props) {
  console.log(userId);
  return (
    <div className="">
      <div className="flex justify-between items-center my-2">
        {mode === "create" ? (
          <div>
            <Text h1>Create New User & Role</Text>
            <Text secondaryColor block>
              New user only can be manual registration by Super Admin
            </Text>
          </div>
        ) : (
          <div>
            <Text h1>Edit User & Role</Text>
            <Text secondaryColor block>
              New user only can be manual registration by Super Admin
            </Text>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-2 items-start justify-between mt-5">
        {/* Minimum Password Length Dropdown */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div>
              <img src={UserIcon} alt="user_icon" />
            </div>
            <div>
              <Text h2 style={{ fontWeight: 600 }}>
                User Form
              </Text>
              <Text secondaryColor block>
                Complete the data to add a new user.
              </Text>
            </div>
          </div>
        </div>
        <div className="">
          <div className="grid grid-cols-2 gap-2">
            <Input label="FirstName" />
            <Input label="Last Name" />
          </div>
          <Input type="email" placeholder="Type email address" label="Last Name" />

          <Input label="Phone" />

          <SelectComponent
            onChange={() => {}}
            label="Role Assignment"
            className="my-2"
            options={[{ label: "one", value: "1" }]}
          />
          <SelectComponent
            onChange={() => {}}
            label="Union"
            className="my-2"
            options={[{ label: "one", value: "1" }]}
          />
          <SelectComponent
            onChange={() => {}}
            label="State"
            className="my-2"
            options={[{ label: "one", value: "1" }]}
          />
          <SelectComponent
            onChange={() => {}}
            label="LGA"
            className="my-2"
            options={[{ label: "one", value: "1" }]}
          />
          <SelectComponent
            onChange={() => {}}
            label="Town/City"
            className="my-2"
            options={[{ label: "one", value: "1" }]}
          />
          <Input placeholder="Create" label="Create Password" type="password" />
        </div>
      </div>
      <div className="flex justify-between items-center gap-3 ">
        <div>
          <Button className="!w-[140px] border !border-[red] !text-[red]" variant="outlined">
            Clear
          </Button>
        </div>
        <div className="flex gap-2">
          <Button className="!w-[140px]" variant="outlined">
            Save as Draft
          </Button>
          <Button className="!w-[100px]" leftIcon={<Save />}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
