import Button from "@/common/button/button";
import Input from "@/common/input/input";
import SelectComponent from "@/common/input/select";
import Text from "@/common/text/text";
import { Save } from "lucide-react";
import UserIcon from "@/assets/user.svg";
import { useState } from "react";

interface Props {
  mode: "create" | "update";
  userId?: string;
}

function LocationForm({ mode, userId }: Props) {
  const [status, setStatus] = useState(false);

  console.log(userId);

  return (
    <div className="">
      <div className="flex justify-between items-center my-2">
        {mode === "create" ? (
          <div>
            <Text h1>Create New Location</Text>
            <Text secondaryColor block>
              Add location details that will be displayed when the user creates a waybill.
            </Text>
          </div>
        ) : (
          <div>
            <Text h1>Edit User & Role</Text>
            <Text secondaryColor block>
              Complete the data to update the location.{" "}
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
                Location
              </Text>
              <Text secondaryColor block>
                Complete the data to add a new location.{" "}
              </Text>
            </div>
          </div>
        </div>
        <div className="">
          <SelectComponent
            onChange={() => {}}
            label="State"
            className="my-2"
            triggerStyle={{ width: "100%", height: "45px" }}
            options={[{ label: "one", value: "1" }]}
          />
          <SelectComponent
            onChange={() => {}}
            label="LGA"
            className="my-2"
            triggerStyle={{ width: "100%", height: "45px" }}
            options={[{ label: "one", value: "1" }]}
          />
          <SelectComponent
            onChange={() => {}}
            label="Town/City"
            className="my-2"
            triggerStyle={{ width: "100%", height: "45px" }}
            options={[{ label: "one", value: "1" }]}
          />

          <div className="flex items-center justify-between my-7">
            <Text>Allow or restrict this location</Text>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={status}
                className="sr-only peer"
                readOnly
                onClick={() => {
                  setStatus(!status);
                }}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              <span className="ml-2">{status ? "Allowed" : "Restricated"}</span>
            </label>
          </div>
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

export default LocationForm;
