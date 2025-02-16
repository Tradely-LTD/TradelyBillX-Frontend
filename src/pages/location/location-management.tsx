import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Pencil, Trash2 } from "lucide-react";

import Button from "@/common/button/button";
import { TabButton, TabContainer, TabPanel } from "@/common/tab";
import StatusIndicator from "@/common/status";
import Text from "@/common/text/text";
import { Loader } from "@/common/loader/loader";
import SelectComponent from "@/common/input/select";
import {
  State,
  useDeleteTownsMutation,
  useGetLGAsQuery,
  useGetStatesQuery,
  useGetTownsQuery,
  useUpdateStateMutation,
  useUpdateTownsMutation,
} from "./location.api";
import { Modal } from "@/common/modal/modal";
import Input from "@/common/input/input";

const LocationManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("states");
  const [selectedState, setSelectedState] = useState<any | null>(null);
  const [selectedTown, setSelectedTown] = useState<string>("");
  const [selectedTownStatus, setSelectedTownStatus] = useState<boolean>(false);
  const [selectedLGA, setSelectedLGA] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTownId, setEditingTownId] = useState<string | null>(null);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const [editingState, setEditingState] = useState({
    id: "",
    value: "",
    status_allowed: false,
    allow_price_edit: true,
    constant_price: "1000",
    enable_internal_revenue: false,
    tradely_percentage: "10",
    aufcdn_percentage: "90",
    government_percentage: "0",
    aufcdn_recipient_code: "1224",
    government_recipient_code: "1224",
  });

  const { data: statesData, isLoading: isStatesLoading } = useGetStatesQuery();
  const {
    data: lgasData,
    isLoading: isLGALoading,
    isFetching: isFetchingLGA,
  } = useGetLGAsQuery({ stateId: selectedState }, { skip: selectedState === null });
  const [deleteTown, { isLoading: isDeleting }] = useDeleteTownsMutation();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [townToDelete, setTownToDelete] = useState<string | null>(null);

  const handleDeleteTown = () => {
    if (!townToDelete) return;
    deleteTown({ id: townToDelete });
    setIsDeleteModalOpen(false);
    setTownToDelete(null);
  };

  const { data: towns, isLoading, isFetching } = useGetTownsQuery({ lgaId: selectedLGA ?? "" });
  const [updateTown, { isLoading: isUpdating }] = useUpdateTownsMutation();
  const handleSwitchTab = (value: string) => {
    setActiveTab(value);
  };
  const [updateState, { isLoading: isStateUpdating }] = useUpdateStateMutation();
  const handleUpdateState = async () => {
    if (!editingState.id) return;
    try {
      await updateState({
        ...editingState,
      }).unwrap();
      setIsStateModalOpen(false);
    } catch (error) {
      console.error("Error updating state:", error);
    }
  };

  const handleEditState = (state: State) => {
    setEditingState({
      id: state?.id,
      value: state.value,
      status_allowed: state.status_allowed ?? false,
      allow_price_edit: state.allow_price_edit ?? true,
      constant_price: state.constant_price ?? "1000",
      enable_internal_revenue: state.enable_internal_revenue ?? false,
      tradely_percentage: state.tradely_percentage ?? "10",
      aufcdn_percentage: state.aufcdn_percentage ?? "90",
      government_percentage: state.government_percentage ?? "0",
      aufcdn_recipient_code: state.aufcdn_recipient_code ?? "1224",
      government_recipient_code: state.government_recipient_code ?? "1224",
    });
    setIsStateModalOpen(true);
  };
  const handleEditTown = (town: {
    id: any;
    label?: string;
    value: any;
    status_allowed?: boolean;
  }) => {
    setSelectedTown(town.value);
    setSelectedTownStatus(town.status_allowed ?? false);
    setEditingTownId(town.id);
    setIsModalOpen(true);
  };
  const handleUpdateTown = async () => {
    if (!editingTownId || !selectedTown.trim()) return;
    try {
      await updateTown({
        id: editingTownId,
        value: selectedTown,
        status_allowed: selectedTownStatus,
        label: selectedTown,
      }).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating town:", error);
    }
  };
  return (
    <div className="p-4">
      {/* Header Section */}
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
        <Button onClick={() => navigate("/location/add")}>Add Location</Button>
      </div>

      <div className="flex justify-between flex-wrap items-center mb-4">
        <div>
          <TabContainer>
            <TabButton onClick={() => handleSwitchTab("states")} active={activeTab === "states"}>
              States
            </TabButton>
            <TabButton onClick={() => handleSwitchTab("towns")} active={activeTab === "towns"}>
              Towns
            </TabButton>
            {/* <TabButton
              onClick={() => handleSwitchTab("restricted")}
              active={activeTab === "restricted"}
            >
              Restricted
            </TabButton> */}
          </TabContainer>
        </div>

        {/* Filters */}
        {activeTab === "towns" && (
          <div className="flex">
            <SelectComponent
              label="State"
              className="my-2 min-w-[150px] mr-2"
              options={
                statesData?.data?.length
                  ? statesData.data.map((state) => ({
                      label: state.label,
                      value: state.value,
                      id: state.id,
                    }))
                  : [{ label: "No States available", value: "no data ", id: "" }]
              }
              onChange={(value, id) => {
                setSelectedState(id);
              }}
              isLoading={isStatesLoading}
            />

            <SelectComponent
              label="LGA"
              className="my-2 min-w-[150px]"
              options={
                lgasData?.data?.length
                  ? lgasData.data.map((lga) => ({
                      label: lga.label,
                      value: lga.value,
                      id: lga.id,
                    }))
                  : selectedState
                  ? [{ label: "No LGAs found for this state", value: "no data ", id: "" }]
                  : [{ label: "Select a state first", value: "no data ", id: "" }]
              }
              onChange={(value, id) => {
                setSelectedLGA(id ?? "");
              }}
              isLoading={isLGALoading || isFetchingLGA}
              disabled={!selectedState}
            />
          </div>
        )}
      </div>

      <TabPanel active={activeTab === "states"}>
        <>
          {isStatesLoading ? (
            <Loader />
          ) : (
            <table className="min-w-full bg-white border rounded-lg">
              <thead className="bg-[#F7F8FB] rounded-tl-2xl rounded-tr-2xl p-3">
                <tr className="text-left">
                  <th className="py-2 px-4 border-b">S/N</th>
                  <th className="py-2 px-4 border-b">City/Town</th>
                  <th className="py-2 px-4 border-b">Gov't %</th>
                  <th className="py-2 px-4 border-b">AUFCDN %</th>
                  <th className="py-2 px-4 border-b">Allow agent</th>
                  <th className="py-2 px-4 border-b">Internal Revenue</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>

              <tbody>
                {statesData?.data?.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{item.value}</td>
                    <td className="py-2 px-4 border-b">{item.government_percentage}%</td>
                    <td className="py-2 px-4 border-b">{item.aufcdn_percentage}%</td>
                    <td className="py-2 px-4 border-b">
                      <StatusIndicator
                        status={item?.allow_price_edit ? "Allowed" : "Restricated"}
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <StatusIndicator
                        status={item?.enable_internal_revenue ? "Allowed" : "Restricated"}
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditState(item)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Pencil size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      </TabPanel>

      <TabPanel active={activeTab === "towns"}>
        {isLoading || isFetching ? (
          <Loader />
        ) : towns?.data.length ? (
          <>
            <table className="min-w-full bg-white border rounded-lg">
              <thead className="bg-[#F7F8FB] rounded-tl-2xl rounded-tr-2xl p-3">
                <tr className="text-left">
                  <th className="py-2 px-4 border-b">S/N</th>
                  <th className="py-2 px-4 border-b">City/Town</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Action</th>
                </tr>
              </thead>

              <tbody>
                {towns.data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{item.value}</td>
                    <td className="py-2 px-4 border-b">
                      <StatusIndicator status={item?.status_allowed ? "Allowed" : "Restricated"} />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditTown(item)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Pencil size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setTownToDelete(item.id);
                            setIsDeleteModalOpen(true);
                          }}
                          className="p-1 text-gray-500 hover:text-gray-700"
                          disabled={isDeleting}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex gap-3 justify-between py-3">
              <Button
                leftIcon={<ArrowLeft color="green" />}
                variant="outlined"
                className="!text-green-700 !rounded-lg"
              >
                Previous
              </Button>
              <Button
                rightIcon={<ArrowRight />}
                variant="outlined"
                className="!text-green-700 !rounded-lg"
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center min-h-[50vh] text-gray-500">
            {selectedState && selectedLGA ? (
              <p>No towns found for the selected State & LGA.</p>
            ) : (
              <p>Please select a State and LGA to view records.</p>
            )}
          </div>
        )}
      </TabPanel>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="!h-[300px]"
        header="Edit the town/city"
        children={
          <div className="p-5">
            <Input
              placeholder="Enter the town or city"
              onChange={(e) => setSelectedTown(e.target.value)}
              value={selectedTown}
            />
            <div>
              <div className="flex items-center justify-between my-7">
                <Text>Allow or restrict this location</Text>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTownStatus}
                    className="sr-only peer"
                    readOnly
                    onClick={() => setSelectedTownStatus(!selectedTownStatus)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  <span className="ml-2">{status ? "Allowed" : "Restricted"}</span>
                </label>
              </div>
            </div>
          </div>
        }
        footer={
          <div className="flex gap-2">
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outlined"
              className="!text-[red]"
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateTown} disabled={isUpdating}>
              {isUpdating ? "Updating..." : "Update"}
            </Button>
          </div>
        }
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        className="!h-[300px]"
        header="Confirm Deletion"
        footer={
          <div className="flex gap-2">
            <Button
              onClick={() => setIsDeleteModalOpen(false)}
              variant="outlined"
              className="!text-[red]"
            >
              Cancel
            </Button>
            <Button onClick={handleDeleteTown} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        }
      >
        <p>Are you sure you want to delete this town? {}</p>
      </Modal>
      <Modal
        isOpen={isStateModalOpen}
        onClose={() => setIsStateModalOpen(false)}
        className="!h-[600px]"
        header={`Edit ${editingState.value} State Details`}
        children={
          <div className="p-5 space-y-6 max-h-[500px] overflow-y-auto">
            <div className="flex items-center justify-between ">
              <Text>State Status</Text>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={editingState.status_allowed}
                  className="sr-only peer"
                  onChange={() =>
                    setEditingState({
                      ...editingState,
                      status_allowed: !editingState.status_allowed,
                    })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                <span className="ml-2">
                  {editingState.status_allowed ? "Allowed" : "Restricted"}
                </span>
              </label>
            </div>

            {/* Price Settings */}
            <div>
              <Text h3 className="mb-4 font-semibold">
                Price Settings
              </Text>
              <div className="flex items-center justify-between mb-4">
                <Text>Allow Price Editing</Text>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingState.allow_price_edit}
                    className="sr-only peer"
                    onChange={() =>
                      setEditingState({
                        ...editingState,
                        allow_price_edit: !editingState.allow_price_edit,
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <Input
                label="Constant Price"
                type="number"
                value={editingState.constant_price}
                onChange={(e) =>
                  setEditingState({ ...editingState, constant_price: e.target.value })
                }
              />
            </div>

            {/* Revenue Settings */}
            <div>
              <Text h3 className="mb-4 font-semibold">
                Revenue Settings
              </Text>
              <div className="flex items-center justify-between mb-4">
                <Text>Enable Internal Revenue</Text>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingState.enable_internal_revenue}
                    className="sr-only peer"
                    onChange={() =>
                      setEditingState({
                        ...editingState,
                        enable_internal_revenue: !editingState.enable_internal_revenue,
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="space-y-4">
                <Input
                  label="Tradely Percentage"
                  type="number"
                  value={editingState.tradely_percentage}
                  onChange={(e) =>
                    setEditingState({ ...editingState, tradely_percentage: e.target.value })
                  }
                />
                <Input
                  label="AUFCDN Percentage"
                  type="number"
                  value={editingState.aufcdn_percentage}
                  onChange={(e) =>
                    setEditingState({ ...editingState, aufcdn_percentage: e.target.value })
                  }
                />
                <Input
                  label="Government Percentage"
                  type="number"
                  value={editingState.government_percentage}
                  onChange={(e) =>
                    setEditingState({ ...editingState, government_percentage: e.target.value })
                  }
                />
                <Input
                  label="AUFCDN Recipient Code"
                  value={editingState.aufcdn_recipient_code}
                  onChange={(e) =>
                    setEditingState({ ...editingState, aufcdn_recipient_code: e.target.value })
                  }
                />
                <Input
                  label="Government Recipient Code"
                  value={editingState.government_recipient_code}
                  onChange={(e) =>
                    setEditingState({ ...editingState, government_recipient_code: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        }
        footer={
          <div className="flex gap-2">
            <Button
              onClick={() => setIsStateModalOpen(false)}
              variant="outlined"
              className="!text-[red]"
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateState} disabled={isStateUpdating}>
              {isStateUpdating ? "Updating..." : "Update"}
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default LocationManagement;
