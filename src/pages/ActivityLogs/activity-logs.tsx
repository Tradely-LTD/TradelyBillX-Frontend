//@ts-nocheck
import Button from "@/common/button/button";
import StatsCard from "@/common/cards/StatsCard";
import { TabButton, TabContainer } from "@/common/tab";
import Text from "@/common/text/text";
import { Sort } from "iconsax-react";
import { useState } from "react";
import StatusIndicator from "@/common/status";
import BillIcon from "@/assets/Bill List.svg";
import MoneyIcon from "@/assets/Money Bag.svg";
import ShieldIcon from "@/assets/Shield Warning.svg";
import { ArrowUpRight } from "lucide-react";

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
    title: "Payment Made",
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

function ActivityLogs() {
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState<"dateTime" | "incidentType" | null>(null);

  const handleSwitchTab = (value: string) => {
    setActiveTab(value);
    // setFilterByStatus(value === "all" ? null : value);
  };

  // Handle sorting
  const handleSort = (key: "dateTime" | "incidentType") => {
    setSortBy(key);
  };

  return (
    <div>
      <div className="flex justify-between mb-5">
        <div>
          <Text block h1>
            Activity Logs
          </Text>
          <Text secondaryColor>
            View all activity logs, including waybill applications, payments made, and incidents
            reported.{" "}
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
        <div className="w-[100%]">
          <TabContainer style={{ width: "450px" }}>
            <TabButton onClick={() => handleSwitchTab("all")} active={activeTab === "all"}>
              All
            </TabButton>
            <TabButton onClick={() => handleSwitchTab("open")} active={activeTab === "open"}>
              Waybill
            </TabButton>
            <TabButton
              onClick={() => handleSwitchTab("progress")}
              active={activeTab === "progress"}
            >
              Payment
            </TabButton>
            <TabButton
              onClick={() => handleSwitchTab("finished")}
              active={activeTab === "finished"}
            >
              Incident
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
        </div>
      </div>

      <div>
        <Text secondaryColor className="!font-semibold ">
          Today, 14 Oct 2024
        </Text>
        <AcitivityCard status="success" type="bill" />
        <AcitivityCard status="progress" type="payment" />
        <AcitivityCard status="pending" type="incident" />
      </div>
    </div>
  );
}

const AcitivityCard = ({ status, type }: { type: string; status: string }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 border-b my-2 py-3">
        {type === "bill" && <img src={BillIcon} className="bg-[#F7F8FB] p-2 rounded-full" />}
        {type === "payment" && <img src={MoneyIcon} className="bg-[#F7F8FB] p-2 rounded-full" />}
        {type === "incident" && <img src={ShieldIcon} className="bg-[#F7F8FB] p-2 rounded-full" />}
        <div>
          <Text h3 block>
            Waybill Request
          </Text>
          <Text block secondaryColor>
            434,435235 NGN
          </Text>
        </div>
        <div className="p-1 bg-[#C4CBD4] rounded-full" />
        {status === "pending" && <StatusIndicator status="PENDING" />}
        {status === "success" && <StatusIndicator status="SUCCESS" />}
        {status === "progress" && <StatusIndicator status="Progress" />}
      </div>
      <Button
        style={{ border: "1px solid" }}
        className="!h-[38px]  !border-gray-500"
        variant="ghost"
        rightIcon={<ArrowUpRight size={20} />}
      >
        Details
      </Button>
    </div>
  );
};
export default ActivityLogs;
