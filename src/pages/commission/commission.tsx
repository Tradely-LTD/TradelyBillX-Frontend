import Button from "@/common/button/button";
import StatsCard from "@/common/cards/StatsCard";
import Text from "@/common/text/text";
import { Sort } from "iconsax-react";
import { Copy, Download, Eye, Filter, Pencil, Printer, Share2, Trash2 } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/utils/app-paths";
import { Modal } from "@/common/modal/modal";
import { QRCodeSVG } from "qrcode.react";
import MSGIcon from "@/assets/MSG.svg";

const chartData = Array.from({ length: 20 }, (_, i) => ({
  name: i,
  value: Math.floor(Math.random() * 50) + 50,
}));

// Stats cards data
const statsCards = [
  {
    title: "Total Reporting",
    value: "100",
    change: "5% last month",
    data: chartData,
  },
  {
    title: "Open Reporting",
    value: "100",
    change: "+5% last month",
    data: chartData,
  },
];

// Updated transaction data to match table headers
const transactions = [
  {
    id: "INC12345",
    incidentId: "INCD67890",
    waybillId: "2000 NGN",
    incidentType: "Vehicle Breakdown",
    status: "Open",
    dateTime: "2023-10-15",
  },
  {
    id: "INC12345",
    incidentId: "INCD67890",
    waybillId: "2000 NGN",
    incidentType: "Vehicle Breakdown",
    status: "Open",
    dateTime: "2023-10-15",
  },
  {
    id: "INC12345",
    incidentId: "INCD67890",
    waybillId: "2000 NGN",
    incidentType: "Vehicle Breakdown",
    status: "Open",
    dateTime: "2023-10-15",
  },
  {
    id: "INC12345",
    incidentId: "INCD67890",
    waybillId: "2000 NGN",
    incidentType: "Vehicle Breakdown",
    status: "Open",
    dateTime: "2023-10-15",
  },
  {
    id: "INC12345",
    incidentId: "INCD67890",
    waybillId: "2000 NGN",
    incidentType: "Vehicle Breakdown",
    status: "Open",
    dateTime: "2023-10-15",
  },
  {
    id: "INC12345",
    incidentId: "INCD67890",
    waybillId: "2000 NGN",
    incidentType: "Vehicle Breakdown",
    status: "Open",
    dateTime: "2023-10-15",
  },
  {
    id: "INC12345",
    incidentId: "INCD67890",
    waybillId: "2000 NGN",
    incidentType: "Vehicle Breakdown",
    status: "Open",
    dateTime: "2023-10-15",
  },
  {
    id: "INC12345",
    incidentId: "INCD67890",
    waybillId: "2000 NGN",
    incidentType: "Vehicle Breakdown",
    status: "Open",
    dateTime: "2023-10-15",
  },
];

function CommisionTracker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"dateTime" | "incidentType" | null>(null);

  // Handle bulk selection
  const handleBulkSelection = (checked: boolean) => {
    if (checked) {
      setSelectedItems(transactions.map((tx) => tx.id));
    } else {
      setSelectedItems([]);
    }
  };

  // Handle individual selection
  const handleIndividualSelection = (id: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Handle sorting
  const handleSort = (key: "dateTime" | "incidentType") => {
    setSortBy(key);
  };

  // Handle filtering
  const handleFilter = () => {
    alert("Custom filter logic can be implemented here.");
  };

  // Filter and sort transactions based on state

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div>
          <Text block h1>
            Agent Commision Tracker
          </Text>
          <Text secondaryColor>
            Track commission earnings for each application and waybill payments.
          </Text>
        </div>
        <div className="flex gap-1 flex-col ">
          <span className="text-gray-500 block ">Date Range</span>
          <input type="date" className="px-4 py-2 bg-white border rounded-lg flex items-center" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="my-4 flex items-center justify-between">
        <Text h2 block>
          All Commision
        </Text>
        <div className="flex gap-3">
          <Button
            className="!w-[120px] !h-[40px] !text-[#64748B]"
            variant="outlined"
            leftIcon={<Sort />}
            onClick={() => handleSort(sortBy === "dateTime" ? "incidentType" : "dateTime")}
          >
            Sort by
          </Button>
          {/* <Button
            className="!w-[100px] !h-[40px] !text-[#64748B]"
            variant="outlined"
            leftIcon={<Filter />}
            onClick={handleFilter}
          >
            Filter
          </Button> */}
        </div>
      </div>

      <div>
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-[#F7F8FB] rounded-tl-2xl text-left rounded-tr-2xl p-3">
            <tr>
              <th className="py-2 px-4 border-b">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedItems.length === transactions.length}
                    onCheckedChange={handleBulkSelection}
                    id="select-all"
                  />
                  <label htmlFor="select-all">Transaction Id</label>
                </div>
              </th>
              <th className="py-2 px-4 border-b">Waybill Id</th>
              <th className="py-2 px-4 border-b">Commission Earned</th>
              <th className="py-2 px-4 border-b">Transaction Date</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={tx.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedItems.includes(tx.id)}
                      onCheckedChange={() => handleIndividualSelection(tx.id)}
                      id={`tx-${index}`}
                    />
                    <label htmlFor={`tx-${index}`}>{tx.id}</label>
                  </div>
                </td>
                <td className="py-2 px-4 border-b">{tx.incidentId}</td>
                <td className="py-2 px-4 border-b">{tx.waybillId}</td>

                <td className="py-2 px-4 border-b">{tx.dateTime}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="p-1 flex items-center gap-1 rounded-md text-green-700 font-semibold hover:text-gray-700 border"
                    >
                      <Eye size={18} /> View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        onClose={() => {
          setIsModalOpen(false);
        }}
        isOpen={isModalOpen}
        header={
          <>
            <Text h3>Commission Details</Text>
          </>
        }
        children={
          <div className="p-2 border rounded-md">
            <div className="flex gap-3 p-4">
              <img src={MSGIcon} />
              <div>
                <Text block secondaryColor>
                  Commision Earned
                </Text>
                <Text h3>2000 NGN</Text>
              </div>
            </div>

            <div className="bg-[#F7F8FB] p-3 rounded-md my-3">
              <Text h3>Transaction Details</Text>
              <div className="flex gap-2 items-center justify-between">
                <div className="flex flex-col gap-2 my-2">
                  <Text secondaryColor>Transaction Date</Text>
                  <Text>14 Oct 2024, 8:00</Text>
                </div>
                <div className="flex flex-col gap-2 my-2">
                  <Text secondaryColor>Transaction Date</Text>
                  <Text>14 Oct 2024, 8:00</Text>
                </div>
                <Button variant="ghost" className="!bg-[white]">
                  Got to Details
                </Button>
              </div>
            </div>

            <div className="bg-[#F7F8FB] p-3 rounded-md  flex flex-col justify-between mb-4">
              <Text h3>Waybill Information</Text>
              <div className="flex gap-3 my-2">
                <div className="p-3 rounded-md border bg-white">
                  <QRCodeSVG value={"tradely"} size={80} level="H" />
                </div>
                <div className="w-full flex  flex-col gap-3 ">
                  <div className="flex gap-2 items-start justify-between">
                    <div>
                      <Text>Waybill ID</Text>
                    </div>
                    <div className="flex gap-4">
                      <Text>61234242</Text>
                      <Text className="!flex items-center gap-2" color="green">
                        <Copy size={14} color="green" /> Copy
                      </Text>
                    </div>
                  </div>
                  <div className="flex gap-2 items-start justify-between">
                    <div>
                      <Text>Waybill Number</Text>
                    </div>
                    <div className="flex gap-4">
                      <Text>61234242</Text>
                      <Text className="!flex items-center gap-2" color="green">
                        <Copy size={14} color="green" /> Copy
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        footer={
          <>
            <div className="flex gap-2 my-3">
              <Button
                variant="ghost"
                className="!bg-white !border !border-[gray] !h-[35px]"
                style={{ border: "1px solid grey" }}
                leftIcon={<Printer size={16} />}
                onClick={() => setIsModalOpen(false)}
              >
                Back to List
              </Button>

              <Button className="!h-[35px]" leftIcon={<Download size={16} />}>
                Download Report
              </Button>
            </div>
          </>
        }
      />
    </div>
  );
}

export default CommisionTracker;
