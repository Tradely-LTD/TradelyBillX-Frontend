import StatsCard from "@/common/cards/StatsCard";
import { TabButton, TabContainer } from "@/common/tab";
import Text from "@/common/text/text";
import { Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { useGetWaybillsQuery } from "./waybill.api";
import StatusIndicator from "@/common/status";
import { formatID } from "@/utils/helper";
import { appPaths } from "@/utils/app-paths";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/common/loader/loader";
import EmptyState from "../components/empty-state";
import Skeleton from "react-loading-skeleton";
import { useGetStatsRecordQuery } from "../dashbaord/stats.api";

const chartData = Array.from({ length: 20 }, (_, i) => ({
  name: i,
  value: Math.floor(Math.random() * 50) + 50,
}));

function WaybillsList() {
  const [activeTab, setActiveTab] = useState("all");
  // const [sortBy, setSortBy] = useState<"dateTime" | "amount" | null>(null);
  //   const [filterByStatus, setFilterByStatus] = useState<string | null>(null);
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetWaybillsQuery();

  const handleSwitchTab = (value: string) => {
    setActiveTab(value);
    // setFilterByStatus(value === "all" ? null : value); // Update filter based on tab
  };

  // Handle sorting
  // const handleSort = (key: "dateTime" | "amount") => {
  //   setSortBy(key);
  // };

  // // Handle filtering
  // const handleFilter = () => {
  //   // Implement custom filtering logic if needed
  //   alert("Custom filter logic can be implemented here.");
  // };

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
      data: chartData,
    },
    {
      title: "Incidents Reported",
      value: totalIncidents,
      change: "+0% last month",
      data: chartData,
    },
    {
      title: "Payments Made",
      value: totalPayments,
      change: "+0% last month",
      data: chartData,
    },
    {
      title: "Total Amount",
      value: paymentsAmount,
      change: "+0% last month",
      data: chartData,
    },
  ];

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div>
          <Text block h1>
            Waybill Management
          </Text>
          <Text secondaryColor>
            This is a list of all waybill generation activities across the platform.{" "}
          </Text>
        </div>
        {/* <div>
          <div className="flex gap-1 flex-col ">
            <span className="text-gray-500 block ">Date Range</span>
            <input type="date" className="px-4 py-2 bg-white border rounded-lg flex items-center" />
          </div>
        </div> */}
      </div>

      {isLoadingStats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} height={"130px"} width={"300px"} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statsCards.map((stat, index) => (
            <StatsCard
              change={stat.change}
              data={stat.data}
              title={stat.title}
              value={stat?.value ?? 0}
              key={index}
            />
          ))}
        </div>
      )}

      <div className="my-5 flex items-center justify-between">
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

        {/* <div className="flex gap-3">
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
        </div> */}
      </div>

      {isLoading || isFetching ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {data?.data.length ? (
            <div>
              <table className="min-w-full bg-white border rounded-lg">
                <thead className="bg-[#F7F8FB] text-left rounded-tl-2xl rounded-tr-2xl p-3">
                  <tr>
                    <th className="py-2 px-4 border-b">
                      <div className="flex items-center gap-2">
                        <label htmlFor="select-all">Waybill Id</label>
                      </div>
                    </th>
                    <th className="py-2 px-4 border-b">Origin</th>
                    <th className="py-2 px-4 border-b">Destination</th>
                    <th className="py-2 px-4 border-b">Payment Status</th>
                    <th className="py-2 px-4 border-b">Shipment Status</th>
                    <th className="py-2 px-4 border-b">Arrival Date </th>
                    <th className="py-2 px-4 border-b">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.map((tx) => (
                    <tr key={tx.arrivalDate} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b"> {formatID(tx.id)}</td>
                      <td className="py-2 px-4 border-b">{tx.loadingState}</td>
                      <td className="py-2 px-4 border-b">{tx.deliveryState}</td>
                      <td className="py-2 px-4 border-b">
                        <StatusIndicator status={tx.paymentStatus} />
                      </td>
                      <td className="py-2 px-4 border-b">
                        <StatusIndicator status={tx.shipmentStatus} />
                      </td>
                      <td className="py-2 px-4 border-b">{tx.arrivalDate}</td>
                      <td className="py-2 px-4 border-b">
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigate(`${appPaths.waybil}/${tx.id}`)}
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <Eye size={18} />
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
          ) : (
            <EmptyState onButtonClick={() => navigate(-1)} />
          )}
        </>
      )}
    </div>
  );
}

export default WaybillsList;
