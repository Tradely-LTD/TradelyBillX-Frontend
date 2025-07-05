//@ts-nocheck
import {
  LineChart,
  Line,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { StatusCard } from "../components/StatusCard";
import { useEffect, useRef, useState } from "react";
import { useGetStatsRecordQuery } from "./stats.api";
import Skeleton from "react-loading-skeleton";
import { thousandFormatter } from "@/utils/helper";

const data = [
  { name: "01 Oct", payment: 100.5, commission: 38.1 },
  { name: "02 Oct", payment: 200.0, commission: 50.0 },
  { name: "03 Oct", payment: 150.0, commission: 45.0 },
  { name: "04 Oct", payment: 300.0, commission: 60.0 },
  { name: "05 Oct", payment: 250.0, commission: 55.0 },
  { name: "06 Oct", payment: 400.0, commission: 70.0 },
  { name: "07 Oct", payment: 350.0, commission: 65.0 },
];

interface cardProps {
  className?: string;
  children: React.ReactNode;
}
// Card Components
const Card = ({ className = "", children }: cardProps) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}  `}>
    {children}
  </div>
);

const CardContent = ({ className = "", children }: cardProps) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Payment Stats Card Component
const PaymentStatsCard = ({ totalPayments = 0, paymentsAmount = 0 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-8 rounded-lg my-6 w-full">
    <div className="space-y-2 w-full bg-gray-50 p-2 sm:p-[20px] rounded-lg">
      <p className="text-gray-600 text-base sm:text-lg">Payments Made</p>
      <p className="text-2xl sm:text-4xl font-bold text-gray-900 break-words">
        {totalPayments} NGN
      </p>
      <div className="flex items-center text-green-500">
        <span className="text-xs sm:text-sm">0% last month</span>
      </div>
    </div>
    <div className="space-y-2 w-full bg-gray-50 p-2 sm:p-[20px] rounded-lg">
      <p className="text-gray-600 text-base sm:text-lg">Commission Earned</p>
      <p className="text-2xl sm:text-4xl font-bold text-gray-900 break-words">
        {paymentsAmount} NGN
      </p>
      <div className="flex items-center text-green-500">
        <span className="text-xs sm:text-sm">0% last month</span>
      </div>
    </div>
  </div>
);

// Dashboard Component
const DashboardOverview = () => {
  const chartData = Array.from({ length: 20 }, (_, i) => ({
    name: i,
    value: Math.floor(Math.random() * 50) + 50,
  }));

  const { data: statsData, isLoading, isFetching } = useGetStatsRecordQuery();

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

  // Status data for donut charts
  const waybillStatus = [
    { status: "Pending", percentage: 0, color: "rgb(239, 68, 68)" },
    { status: "In Transit", percentage: 0, color: "rgb(59, 130, 246)" },
    { status: "Delivered", percentage: 0, color: "rgb(45, 212, 191)" },
  ];

  const incidentStatus = [
    { status: "Open", percentage: 0, color: "rgb(239, 68, 68)" },
    { status: "In Progress", percentage: 0, color: "rgb(59, 130, 246)" },
    { status: "Resolved", percentage: 0, color: "rgb(45, 212, 191)" },
  ];

  const [chartDimensions, setChartDimensions] = useState({ width: 350, height: 300 });
  const containerRef = useRef(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Set responsive width while maintaining aspect ratio
        const newWidth = Math.max(containerWidth - 40, 280); // Minimum width of 280px
        const newHeight = Math.max(newWidth * 0.9, 250); // Maintain aspect ratio with minimum height

        setChartDimensions({ width: newWidth, height: newHeight });
      }
    };

    // Initial sizing
    updateDimensions();

    // Add resize listener
    window.addEventListener("resize", updateDimensions);

    // Cleanup
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-gray-500">Access a detailed overview of essentials data</p>
        </div>
        {/* <div className="flex items-center space-x-2">
          <span className="text-gray-500">Date Range</span>
          <input
            type="date"
            className="px-4 py-2 bg-white border rounded-lg flex items-center space-x-2"
          />
        </div> */}
      </div>

      {/* Stats Grid */}

      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} height={"130px"} width={"300px"} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {statsCards.map((stat, index) => (
            <Card key={index} className="h-[130px]">
              <CardContent>
                <div className="flex flex-row justify-between">
                  <div className="w-full md:w-[70%]  flex h-auto flex-col gap-[3px] ">
                    <h3 className="text-gray-500 font-medium">{stat.title}</h3>
                    <span className="text-3xl font-semibold">{thousandFormatter(stat.value)}</span>
                    <span className="text-green-500 text-sm">{stat.change}</span>
                  </div>
                  <div className=" md:flex flex-1 hidden justify-end items-center w-1/2">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stat.data}>
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#0EA5E9"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Status Charts Grid */}

      {isLoading || isFetching ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, index) => (
            <Skeleton key={index} height={"330px"} width={"500px"} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusCard title="Waybills Status" statusData={waybillStatus} />
          <StatusCard title="Incidents Status" statusData={incidentStatus} />
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Payment & Commission</h2>

        {isLoading || isFetching ? (
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {[...Array(1)].map((_, index) => (
              <Skeleton key={index} height={"350px"} className="w-full" />
            ))}
          </div>
        ) : (
          <div ref={containerRef} className="w-full overflow-x-auto">
            <div className="">
              {/* Ensures minimum width for legibility */}
              <BarChart
                width={chartDimensions.width}
                height={400}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: window.innerWidth < 768 ? 12 : 14 }} />
                <YAxis tick={{ fontSize: window.innerWidth < 768 ? 12 : 14 }} />
                <Tooltip />
                <Legend
                  wrapperStyle={{
                    fontSize: window.innerWidth < 768 ? "12px" : "14px",
                  }}
                />
                <Bar dataKey="payment" fill="#8884d8" />
                <Bar dataKey="commission" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {[...Array(2)].map((_, index) => (
              <Skeleton key={index} height={"130px"} className="w-full" />
            ))}
          </div>
        ) : (
          <PaymentStatsCard totalPayments={totalPayments} paymentsAmount={paymentsAmount} />
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
