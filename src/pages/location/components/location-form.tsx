import Button from "@/common/button/button";
import SelectComponent from "@/common/input/select";
import Text from "@/common/text/text";
import { Save } from "lucide-react";
import UserIcon from "@/assets/user.svg";
import { useEffect, useState } from "react";
import { useCreateTownsMutation, useGetLGAsQuery, useGetStatesQuery } from "../location.api";
import Input from "@/common/input/input";
import { capitalizeFirstLetter } from "@/utils/helper";
import { useNavigate } from "react-router-dom";

function LocationForm() {
  const [status, setStatus] = useState(false);
  const [selectedState, setSelectedState] = useState<any | null>(null);
  const [selectedLGA, setSelectedLGA] = useState<string | null>(null);
  const [selectedTown, setSelectedTown] = useState<string>("");
  const navigate = useNavigate();
  // const location = useLocation();
  // const stateData = location.state || {};
  // console.log(stateData, "STADA");
  const { data: statesData, isLoading: isStatesLoading } = useGetStatesQuery();
  const {
    data: lgasData,
    isLoading: isLGALoading,
    isFetching: isFetchingLGA,
  } = useGetLGAsQuery({ stateId: selectedState }, { skip: selectedState === null });
  const [handleCreateTown, { isLoading: isCreating, isSuccess }] = useCreateTownsMutation();

  const handleSave = () => {
    const locationData = {
      lgaId: selectedLGA ?? "",
      label: selectedTown,
      value: selectedTown,
      status_allowed: status,
    };
    if (selectedLGA) {
      handleCreateTown(locationData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/location");
    }
  }, [isSuccess]);
  return (
    <div className="p-5 bg-white shadow-md rounded-md">
      <div className="flex justify-between items-center my-2">
        <div>
          <Text h1>Create New Location</Text>
          <Text secondaryColor block>
            Add location details that will be displayed when the user creates a waybill.
          </Text>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start mt-5">
        {/* Location Details */}
        <div className="flex items-center gap-2">
          <img src={UserIcon} alt="user_icon" />
          <div>
            <Text h2 style={{ fontWeight: 600 }}>
              Location
            </Text>
            <Text secondaryColor block>
              Complete the data to add a new location.
            </Text>
          </div>
        </div>

        {/* Form Fields */}
        <div>
          {/* State Selection */}
          <SelectComponent
            label="State"
            className="my-2"
            // defaultValue={stateData?.stateName}
            options={
              statesData?.data?.length
                ? statesData.data.map((lga) => ({
                    label: lga.label,
                    value: lga.value,
                    id: lga.id,
                  }))
                : [{ label: "No State available", value: "No data" }]
            }
            onChange={(_, id) => {
              setSelectedState(id);
            }}
            isLoading={isStatesLoading}
          />

          {/* LGA Selection (Dependent on State) */}
          <SelectComponent
            label="LGA"
            className="my-2"
            // defaultValue={stateData?.lgaName}
            options={
              lgasData?.data?.length
                ? lgasData.data.map((lga) => ({
                    label: lga.label,
                    value: lga.value,
                    id: lga.id,
                  }))
                : [{ label: "No LGAs available", value: "No data" }]
            }
            onChange={(_, id) => {
              setSelectedLGA(id ?? "");
            }}
            isLoading={isLGALoading || isFetchingLGA}
            disabled={!selectedState}
          />

          {/* Town/City Selection */}
          {/* <SelectComponent
            label="Town/City"
            className="my-2"
            options={
              towns?.data?.length
                ? towns.data.map((lga) => ({
                    label: lga.label,
                    value: lga.value,
                    id: lga.id,
                  }))
                : [{ label: "No Town available", value: "No data" }]
            }
            onChange={(value) => setSelectedTown(value)}
            disabled={!selectedLGA}
          /> */}
          <Input
            label="Town/City"
            onChange={(e) => setSelectedTown(capitalizeFirstLetter(e.target.value))}
            value={selectedTown}
            placeholder="Enter town or city"
          />

          {/* Toggle Location Status */}
          <div className="flex items-center justify-between my-7">
            <Text>Allow or restrict this location</Text>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={status}
                className="sr-only peer"
                readOnly
                onClick={() => setStatus(!status)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              <span className="ml-2">{status ? "Allowed" : "Restricted"}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center gap-3">
        <Button
          className="!w-[140px] border !border-[red] !text-[red]"
          variant="outlined"
          onClick={() => {
            setSelectedState(null);
            setSelectedLGA(null);
            setSelectedTown("");
            setStatus(false);
          }}
        >
          Clear
        </Button>

        <div className="flex gap-2">
          <Button className="!w-[140px]" variant="outlined">
            Save as Draft
          </Button>
          <Button
            loading={isCreating}
            className="!w-[100px]"
            leftIcon={<Save />}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LocationForm;
