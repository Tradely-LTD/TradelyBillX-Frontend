import Button from "@/common/button/button";
import StatsCard from "@/common/cards/StatsCard";
import { TabButton, TabContainer } from "@/common/tab";
import Text from "@/common/text/text";
import { Sort } from "iconsax-react";
import { Filter } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@radix-ui/themes";
import { useGetTransactionsQuery } from "../waybill/waybill.api";
import { useGetStatsRecordQuery } from "../dashbaord/stats.api";

// Skeleton Loader Component
const TransactionSkeleton = () => {
  return (
    <tr className="animate-pulse">
      {[...Array(6)].map((_, index) => (
        <td key={index} className="py-4 px-4 border-b">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </td>
      ))}
    </tr>
  );
};

// Stats cards data generation function
const generateStatsCards = (transactions: any[]) => {
  return [
    {
      title: "Waybills Submitted",
      value: transactions.length.toString(),
      change: "+5% last month",
      data: transactions.map((_, i) => ({
        name: i,
        value: Math.floor(Math.random() * 50) + 50,
      })),
    },
    {
      title: "Total Payments",
      value: transactions
        .reduce((sum, tx) => sum + parseFloat(tx.amount), 0)
        .toLocaleString("en-NG", { style: "currency", currency: "NGN" }),
      change: "+5% last month",
      data: transactions.map((_, i) => ({
        name: i,
        value: Math.floor(Math.random() * 50) + 50,
      })),
    },
    {
      title: "Successful Transactions",
      value: transactions.filter((tx) => tx.paymentStatus === "SUCCESS").length.toString(),
      change: "+5% last month",
      data: transactions.map((_, i) => ({
        name: i,
        value: Math.floor(Math.random() * 50) + 50,
      })),
    },
  ];
};

function TransactionHistory() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"dateTime" | "amount" | null>(null);
  const [filterByStatus, setFilterByStatus] = useState<string | null>(null);
  const { data, isLoading } = useGetTransactionsQuery();

  const { data: statsData, isLoading: isLoadingStats, error } = useGetStatsRecordQuery();

  // Get statistics from API response
  const totalWaybills = statsData?.data?.totalWaybills || 0;
  const totalPayments = statsData?.data?.totalPayments || 0;
  const totalIncidents = statsData?.data?.totalIncidents || 0;
  const paymentsAmount = statsData?.data?.paymentsAmount || 0;
  // Stats cards data with updated values from API
  const statsCards = [
    {
      title: "Waybills Submitted",
      value: totalWaybills,
      change: "0% last month",
      // data: totalWaybills.map((_, i) => ({
      //   name: i,
      //   value: Math.floor(Math.random() * 50) + 50,
      // })),
    },
    {
      title: "Incidents Reported",
      value: totalIncidents,
      change: "+0% last month",
      // data: totalIncidents.map((_, i) => ({
      //   name: i,
      //   value: Math.floor(Math.random() * 50) + 50,
      // })),
    },
    {
      title: "Payments Made",
      value: totalPayments,
      change: "+0% last month",
      data: totalPayments + 50,
    },
    {
      title: "Total Amount",
      value: paymentsAmount,
      change: "+0% last month",
      // data: paymentsAmount.map((_, i) => ({
      //   name: i,
      //   value: Math.floor(Math.random() * 50) + 50,
      // })),
    },
  ];
  // Handle tab switching
  const handleSwitchTab = (value: string) => {
    setActiveTab(value);
    setFilterByStatus(value === "all" ? null : value);
  };

  // Handle bulk selection
  const handleBulkSelection = (checked: boolean) => {
    if (checked && data?.data) {
      setSelectedItems(data.data.map((tx: any) => tx.id));
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
    alert("Custom filter logic can be implemented here.");
  };

  // Filter and sort transactions based on state
  const filteredTransactions = data?.data
    ? data.data
        .filter((tx: any) =>
          filterByStatus
            ? filterByStatus === "pending"
              ? tx.paymentStatus !== "SUCCESS"
              : tx.paymentStatus === "SUCCESS"
            : true
        )
        .sort((a: any, b: any) => {
          if (sortBy === "amount") {
            return parseFloat(a.amount) - parseFloat(b.amount);
          }
          return 0;
        })
    : [];

  // const statsCards = data?.data ? generateStatsCards(data.data) : [];

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div>
          <Text block h1>
            Transaction History
          </Text>
          <Text secondaryColor>List of payments on waybill request.</Text>
        </div>
        <div>
          <div className="flex gap-1 flex-col">
            <span className="text-gray-500 block">Date Range</span>
            <input type="date" className="px-4 py-2 bg-white border rounded-lg flex items-center" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? [...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse bg-gray-200 h-36 rounded-lg"></div>
            ))
          : statsCards.map((stat, index) => <StatsCard key={index} {...stat} />)}
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
                    checked={data?.data && selectedItems.length === data.data.length}
                    onCheckedChange={handleBulkSelection}
                    id="select-all"
                  />
                  <label htmlFor="select-all">Transaction Id</label>
                </div>
              </th>
              <th className="py-2 px-4 border-b">Waybill Id</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Payment Method</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? [...Array(5)].map((_, index) => <TransactionSkeleton key={index} />)
              : filteredTransactions.map((tx: any, index: number) => (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedItems.includes(tx.id)}
                          onCheckedChange={() => handleIndividualSelection(tx.id)}
                          id={`tx-${index}`}
                        />
                        <label htmlFor={`tx-${index}`}>{tx.transactionRef}</label>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">{tx.id}</td>
                    <td className="py-2 px-4 border-b">
                      {parseFloat(tx.amount).toLocaleString("en-NG", {
                        style: "currency",
                        currency: "NGN",
                      })}
                    </td>
                    <td className="py-2 px-4 border-b">-</td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          tx.paymentStatus === "SUCCESS"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {tx.paymentStatus}
                      </span>
                    </td>
                    {/* <td className="py-2 px-4 border-b">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`${appPaths.transaction}/${tx.id}`)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Pencil size={18} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-gray-700">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td> */}
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransactionHistory;
