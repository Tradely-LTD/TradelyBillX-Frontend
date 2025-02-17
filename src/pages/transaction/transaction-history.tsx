import Button from "@/common/button/button";
import StatsCard from "@/common/cards/StatsCard";
import { TabButton, TabContainer } from "@/common/tab";
import Text from "@/common/text/text";
import { Sort } from "iconsax-react";
import { Filter, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@radix-ui/themes";
import { appPaths } from "@/utils/app-paths";
import { useNavigate } from "react-router-dom";

const chartData = Array.from({ length: 20 }, (_, i) => ({
  name: i,
  value: Math.floor(Math.random() * 50) + 50,
}));

// Stats cards data
const statsCards = [
  {
    title: "Waybills Submitted",
    value: "100",
    change: "5% last month",
    data: chartData,
  },
  {
    title: "Payments Made",
    value: "100",
    change: "+5% last month",
    data: chartData,
  },
  {
    title: "Incidents Reported",
    value: "50",
    change: "+5% last month",
    data: chartData,
  },
];

// Sample transaction data
const transactions = [
  {
    id: "TX12345",
    waybillId: "WB67890",
    amount: "₦50,000",
    paymentMethod: "Card",
    dateTime: "2023-10-15 14:30",
    status: "Pending",
  },
  {
    id: "TX12346",
    waybillId: "WB67891",
    amount: "₦30,000",
    paymentMethod: "Bank Transfer",
    dateTime: "2023-10-14 10:15",
    status: "Finished",
  },
  {
    id: "TX12347",
    waybillId: "WB67892",
    amount: "₦20,000",
    paymentMethod: "Card",
    dateTime: "2023-10-13 09:00",
    status: "Pending",
  },
];

function TransactionHistory() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"dateTime" | "amount" | null>(null);
  const [filterByStatus, setFilterByStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  // Handle tab switching
  const handleSwitchTab = (value: string) => {
    setActiveTab(value);
    setFilterByStatus(value === "all" ? null : value); // Update filter based on tab
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
  const handleSort = (key: "dateTime" | "amount") => {
    setSortBy(key);
  };

  // Handle filtering
  const handleFilter = () => {
    // Implement custom filtering logic if needed
    alert("Custom filter logic can be implemented here.");
  };

  // Filter and sort transactions based on state
  const filteredTransactions = transactions
    .filter((tx) => (filterByStatus ? tx.status.toLowerCase() === filterByStatus : true))
    .sort((a, b) => {
      if (sortBy === "dateTime") {
        return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
      } else if (sortBy === "amount") {
        return (
          parseFloat(a.amount.replace("₦", "").replace(",", "")) -
          parseFloat(b.amount.replace("₦", "").replace(",", ""))
        );
      }
      return 0;
    });

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div>
          <Text block h1>
            Transaction History
          </Text>
          <Text secondaryColor>List of payments on waybill request. </Text>
        </div>
        <div>
          <div className="flex gap-1 flex-col ">
            <span className="text-gray-500 block ">Date Range</span>
            <input type="date" className="px-4 py-2 bg-white border rounded-lg flex items-center" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="my-4 flex items-center justify-between">
        <div className="w-[100%]">
          <TabContainer style={{ width: "350px" }}>
            <TabButton onClick={() => handleSwitchTab("all")} active={activeTab === "all"}>
              All
            </TabButton>
            <TabButton onClick={() => handleSwitchTab("pending")} active={activeTab === "pending"}>
              Pending
            </TabButton>
            <TabButton
              onClick={() => handleSwitchTab("finished")}
              active={activeTab === "finished"}
            >
              Finished
            </TabButton>
          </TabContainer>
        </div>

        <div className="flex gap-3">
          <Button
            className="!w-[120px] !h-[40px] !text-[#64748B]"
            variant="outlined"
            leftIcon={<Sort />}
            onClick={() => handleSort(sortBy === "dateTime" ? "amount" : "dateTime")}
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
              <th className="py-2 px-4 border-b">Waybill Id</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Payment Method</th>
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
                <td className="py-2 px-4 border-b">{tx.waybillId}</td>
                <td className="py-2 px-4 border-b">{tx.amount}</td>
                <td className="py-2 px-4 border-b">{tx.paymentMethod}</td>
                <td className="py-2 px-4 border-b">{tx.dateTime}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`${appPaths.transaction}/123`)}
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

export default TransactionHistory;
