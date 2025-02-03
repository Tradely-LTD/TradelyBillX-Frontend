import { useState } from "react";
import Button from "@/common/button/button";
import { TabButton, TabContainer } from "@/common/tab";
import { Sort } from "iconsax-react";
import { ArrowLeft, ArrowRight, Filter, Pencil, Trash2 } from "lucide-react";
import { Checkbox } from "@radix-ui/themes";
import Input from "@/common/input/input";
import StatusIndicator from "@/common/status";
import { useNavigate } from "react-router-dom";
import Text from "@/common/text/text";

const locations = [
  { state: "Kano", lga: "Kano", city: "Takai", status: true },
  { state: "Lagos", lga: "Ikeja", city: "Maryland", status: true },
  { state: "Kaduna", lga: "Zaria", city: "Samaru", status: false },
  { state: "Abuja", lga: "Municipal", city: "Garki", status: true },
  { state: "Oyo", lga: "Ibadan", city: "Mokola", status: false },
  { state: "Rivers", lga: "Port Harcourt", city: "GRA", status: true },
  { state: "Borno", lga: "Maiduguri", city: "Gamboru", status: false },
  { state: "Enugu", lga: "Enugu North", city: "Independence Layout", status: true },
  { state: "Sokoto", lga: "Sokoto South", city: "Tambuwal", status: false },
  { state: "Katsina", lga: "Katsina", city: "Funtua", status: true },
];

const LocationManagement = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleSwitchTab = (value: string) => {
    setActiveTab(value);
  };

  const handleBulkSelection = (checked: boolean) => {
    if (checked) {
      setSelectedItems(locations.map((data) => data.city));
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
          <Text block h1>
            Location Management
          </Text>
          <Text secondaryColor>
            Allows the Super Admin to restrict or allow waybill generation for specific locations
            (State, LGA, City/Town).
          </Text>
        </div>
        <div>
          <Button
            onClick={() => {
              navigate("/user");
            }}
          >
            Add Location
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
            <TabButton onClick={() => handleSwitchTab("allowed")} active={activeTab === "allowed"}>
              Allow
            </TabButton>
            <TabButton
              onClick={() => handleSwitchTab("restricated")}
              active={activeTab === "restricated"}
            >
              Restricated
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
      <table className="min-w-full bg-white border rounded-lg">
        <thead className=" bg-[#F7F8FB] rounded-tl-2xl rounded-tr-2xl p-3">
          <tr className=" text-left">
            <th className="py-2 px-4 border-b ">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedItems.length === locations.length}
                  onCheckedChange={handleBulkSelection}
                  id="select-all"
                />
                <label htmlFor="select-all">State</label>
              </div>
            </th>
            <th className="py-2 px-4 border-b">LGA</th>
            <th className="py-2 px-4 border-b">City/Town</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((value, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b ">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedItems.includes(value.city)}
                    onCheckedChange={() => handleIndividualSelection(value.city)}
                    id={`value-${index}`}
                  />
                  <label htmlFor={`value-${index}`}>{value.state}</label>
                </div>
              </td>

              <td className="py-2 px-4 border-b">{value.lga}</td>
              <td className="py-2 px-4 border-b">{value.city}</td>
              <td className="py-2 px-4 border-b ">
                <StatusIndicator status={value?.status ? "Allowed" : "Restricated"} />
              </td>
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

export default LocationManagement;
