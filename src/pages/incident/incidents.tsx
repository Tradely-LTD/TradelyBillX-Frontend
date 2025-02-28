import Button from "@/common/button/button";
import StatsCard from "@/common/cards/StatsCard";
import { TabButton, TabContainer } from "@/common/tab";
import Text from "@/common/text/text";
import { useState } from "react";
import StatusIndicator from "@/common/status";
import { useNavigate } from "react-router-dom";
import { appPaths } from "@/utils/app-paths";
import { Incident, useGetIncidentsQuery, useGetIncidentStatsQuery } from "./incidents.api";
import { formatID } from "@/utils/helper";
import Skeleton from "react-loading-skeleton";
import { Eye } from "lucide-react";

// Helper function to get readable incident type
const getReadableIncidentType = (type: string): string => {
  const typeMap: Record<string, string> = {
    ACCIDENT: "Accident",
    THEFT: "Theft",
    VEHICLE_BREAKDOWN: "Vehicle Breakdown",
    DELAY: "Delay",
  };

  return typeMap[type] || type;
};

// Helper function to map UI status to API status
const mapStatusToAPI = (uiStatus: string): string | null => {
  if (!uiStatus || uiStatus === "all") return null;

  const statusMap: Record<string, string> = {
    open: "REPORTED",
    progress: "REVIEWING",
    resolved: "RESOLVED",
  };

  return statusMap[uiStatus] || null;
};

// Helper function to map API status to UI status
const mapStatusForUI = (status?: string): string => {
  if (!status) return "Open";

  const statusMap: Record<string, string> = {
    REPORTED: "Open",
    REVIEWING: "Progress",
    RESOLVED: "Resolved",
  };

  return statusMap[status] || status;
};

function Incidents() {
  const [activeTab, setActiveTab] = useState("all");
  // const [sortBy, setSortBy] = useState<"reportedDate" | "type" | null>(null);
  // const [dateRange, setDateRange] = useState<string>(new Date().toISOString().split("T")[0]);

  const navigate = useNavigate();

  // Convert UI tab to API status
  const apiStatus = mapStatusToAPI(activeTab);

  // Get incidents with backend filtering
  const {
    data: incidentsResponse,
    isLoading,
    isFetching: isFetching,
  } = useGetIncidentsQuery(apiStatus ? { status: apiStatus } : undefined);

  // Get incident statistics from backend
  const {
    data: statsResponse,
    isLoading: statsLoading,
    isFetching: statsFetching,
  } = useGetIncidentStatsQuery();

  // Process incidents data
  const incidents = incidentsResponse?.data || [];

  // Get stats from the backend response
  const statsData = statsResponse?.data || {
    total: 0,
    // open: 0,
    reviewing: 0,
    resolved: 0,
  };

  // Generate chart data based on incidents
  const generateChartData = (incidents: Incident[]) => {
    return Array.from({ length: 20 }, (_, i) => ({
      name: i,
      value: Math.floor(Math.random() * 50) + 50, // Replace with actual data calculation
    }));
  };

  const chartData = generateChartData(incidents);

  // Stats cards data
  const statsCards = [
    {
      title: "Total Reporting",
      value: statsData?.total?.toString(),
      change: `${statsData.total > 0 ? "+" : ""}5% last month`, // Replace with actual calculation
      data: chartData,
    },
    {
      title: "Open Reporting",
      value: statsData?.reviewing?.toString(),
      change: "+5% last month",
      data: chartData,
    },

    {
      title: "Resolved",
      value: statsData?.resolved?.toString(),
      change: "+5% last month",
      data: chartData,
    },
  ];

  // Handle tab switching - now changes API query parameter
  const handleSwitchTab = (value: string) => {
    setActiveTab(value);
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

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

      <div className="">
        {statsLoading || statsFetching ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} height={"130px"} width={"300px"} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statsCards.map((stat, index) => (
              <StatsCard key={index} {...stat} />
            ))}
          </div>
        )}
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
            {/* <TabButton
              onClick={() => handleSwitchTab("progress")}
              active={activeTab === "progress"}
            >
              In progress
            </TabButton> */}
            <TabButton
              onClick={() => handleSwitchTab("resolved")}
              active={activeTab === "resolved"}
            >
              Resolved
            </TabButton>
          </TabContainer>
        </div>

        {/* <div className="flex gap-3">
          <Button
            className="!w-[120px] !h-[40px] !text-[#64748B]"
            variant="outlined"
            leftIcon={<Sort />}
            onClick={() => handleSort(sortBy === "reportedDate" ? "type" : "reportedDate")}
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
        <div className="">
          <Skeleton height={"400px"} className="w-full" />
        </div>
      ) : (
        <div>
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-[#F7F8FB] rounded-tl-2xl rounded-tr-2xl p-3">
              <tr>
                <th className="py-2 px-4 border-b">
                  <div className="flex items-center gap-2">
                    <label htmlFor="select-all">S/N</label>
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
              {incidents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4">
                    No incidents found
                  </td>
                </tr>
              ) : (
                incidents.map((incident, index) => (
                  <tr key={incident.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center gap-2">
                        <label htmlFor={`inc-${index}`}>{index + 1}</label>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">{`${formatID(incident.id)}`}</td>
                    <td className="py-2 px-4 border-b">{formatID(incident.waybillId)}</td>
                    <td className="py-2 px-4 border-b">{getReadableIncidentType(incident.type)}</td>
                    <td className="py-2 px-4 border-b">
                      <StatusIndicator status={mapStatusForUI(incident.status) as any} />
                    </td>
                    <td className="py-2 px-4 border-b">{formatDateTime(incident.reportedDate)}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/${appPaths.incident}/${incident.id}`)}
                          className="p-1 text-gray-500 hover:text-gray-700"
                        >
                          <Eye size={18} />
                        </button>
                        {/* <button className="p-1 text-gray-500 hover:text-gray-700">
                          <Trash2 size={18} />
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Incidents;
