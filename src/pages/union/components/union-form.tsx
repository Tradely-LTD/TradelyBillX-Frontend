import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Save } from "lucide-react";

import Button from "@/common/button/button";
import Text from "@/common/text/text";
import Input from "@/common/input/input";
import UserIcon from "@/assets/user.svg";
import { Union, useCreateUnionMutation } from "../union";

function UnionForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Union>>({
    name: "",
    code: "",
    description: "",
    status: true,
  });

  const [useCreateUnion, { isLoading: isCreating, isSuccess }] = useCreateUnionMutation();

  const handleSave = () => {
    if (formData.name && formData.code) {
      useCreateUnion(formData);
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      code: "",
      description: "",
      status: true,
    });
    // navigate(-1);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/union");
    }
  }, [isSuccess, navigate]);

  return (
    <div className="p-5 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center my-2">
        <div>
          <Text h1>Create New Union</Text>
          <Text secondaryColor block>
            Add union details to manage transportation organizations.
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mt-5">
        {/* Union Details Header */}
        <div className="flex items-center gap-2">
          <img src={UserIcon} alt="user_icon" />
          <div>
            <Text h2 style={{ fontWeight: 600 }}>
              Union Details
            </Text>
            <Text secondaryColor block>
              Complete the data to create a new union.
            </Text>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <Input
            label="Union Name"
            placeholder="Enter union name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Union Code"
            placeholder="Enter union code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            required
          />

          <Input
            label="Description"
            placeholder="Enter union description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          {/* Toggle Union Status */}
          <div className="flex items-center justify-between my-7">
            <Text>Union Status</Text>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.status}
                className="sr-only peer"
                onChange={() => setFormData({ ...formData, status: !formData.status })}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              <span className="ml-2">{formData.status ? "Active" : "Inactive"}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-3 mt-6">
        <Button
          className="!w-[140px] border !border-[red] !text-[red]"
          variant="outlined"
          onClick={handleClear}
        >
          Clear
        </Button>

        <div className="flex gap-2">
          <Button className="!w-[140px]" variant="outlined" onClick={() => navigate("/union")}>
            Cancel
          </Button>
          <Button
            loading={isCreating}
            className="!w-[100px]"
            leftIcon={<Save />}
            onClick={handleSave}
            disabled={!formData.name || !formData.code}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UnionForm;
