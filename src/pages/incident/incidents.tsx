import Button from "@/common/button/button";
import StatsCard from "@/common/cards/StatsCard";
import { TabButton, TabContainer } from "@/common/tab";
import Text from "@/common/text/text";
import { Sort } from "iconsax-react";
import { Filter, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@radix-ui/themes";
import StatusIndicator from "@/common/status";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/utils/app-paths";

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
  {
    title: "Inprogress Reported",
    value: "50",
    change: "+5% last month",
    data: chartData,
  },
  {
    title: "Respolved",
    value: "50",
    change: "+5% last month",
    data: chartData,
  },
];

// Updated transaction data to match table headers
const transactions = [
  {
    id: "INC12345",
    incidentId: "INCD67890",
    waybillId: "WB67890",
    incidentType: "Vehicle Breakdown",
    status: "Open",
    dateTime: "2023-10-15 14:30",
  },
  {
    id: "INC12346",
    incidentId: "INCD67891",
    waybillId: "WB67891",
    incidentType: "Accident",
    status: "Progress",
    dateTime: "2023-10-14 10:15",
  },
  {
    id: "INC12347",
    incidentId: "INCD67892",
    waybillId: "WB67892",
    incidentType: "Cargo Damage",
    status: "Resolved",
    dateTime: "2023-10-13 09:00",
  },
];

function Incidents() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"dateTime" | "incidentType" | null>(null);
  const [filterByStatus, setFilterByStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  // Handle tab switching
  const handleSwitchTab = (value: string) => {
    setActiveTab(value);
    setFilterByStatus(value === "all" ? null : value);
  };

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
  const filteredTransactions = transactions
    .filter((tx) => (filterByStatus ? tx.status.toLowerCase() === filterByStatus : true))
    .sort((a, b) => {
      if (sortBy === "dateTime") {
        return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
      } else if (sortBy === "incidentType") {
        return a.incidentType.localeCompare(b.incidentType);
      }
      return 0;
    });

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div>
          <Text block h1>
            Incident Reporting
          </Text>
          <Text secondaryColor>List of incidents on waybill request. </Text>
        </div>
        <div>
          <Button onClick={() => navigate(`/${appPaths.incident}/new`)}>New Incident</Button>
        </div>
      </div>
      <div className="flex justify-end my-3">
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
        <div className="w-[100%]">
          <TabContainer style={{ width: "450px" }}>
            <TabButton onClick={() => handleSwitchTab("all")} active={activeTab === "all"}>
              All
            </TabButton>
            <TabButton onClick={() => handleSwitchTab("open")} active={activeTab === "open"}>
              Open
            </TabButton>
            <TabButton
              onClick={() => handleSwitchTab("progress")}
              active={activeTab === "progress"}
            >
              In progress
            </TabButton>
            <TabButton
              onClick={() => handleSwitchTab("finished")}
              active={activeTab === "finished"}
            >
              Resolved
            </TabButton>
          </TabContainer>
        </div>

        <div className="flex gap-3">
          <Button
            className="!w-[120px] !h-[40px] !text-[#64748B]"
            variant="outlined"
            leftIcon={<Sort />}
            onClick={() => handleSort(sortBy === "dateTime" ? "incidentType" : "dateTime")}
          >
            Sort by
          </Button>
          <Button
            className="!w-[100px] !h-[40px] !text-[#64748B]"
            variant="outlined"
            leftIcon={<Filter />}
            onClick={handleFilter}
          >
            Filter
          </Button>
        </div>
      </div>

      <div>
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-[#F7F8FB] rounded-tl-2xl rounded-tr-2xl p-3">
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
              <th className="py-2 px-4 border-b">Incident Id</th>
              <th className="py-2 px-4 border-b">Waybill Id</th>
              <th className="py-2 px-4 border-b">Type of Incident</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Date & Time</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, index) => (
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
                <td className="py-2 px-4 border-b">{tx.incidentType}</td>
                <td className="py-2 px-4 border-b">
                  <StatusIndicator status={tx?.status as any} />
                </td>
                <td className="py-2 px-4 border-b">{tx.dateTime}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/${appPaths.incident}/preview`)}
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
      </div>
    </div>
  );
}

export default Incidents;
