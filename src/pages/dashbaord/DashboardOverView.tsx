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
import AnimatedPieChart from "../../common/ui/AnimatedPieChart";

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

const CardHeader = ({ className = "", children }: cardProps) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>
);

const CardTitle = ({ className = "", children }: cardProps) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
);

const CardContent = ({ className = "", children }: cardProps) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

// Payment Stats Card Component
const PaymentStatsCard = () => (
  <div className="grid grid-cols-2 gap-[10px] p-8 rounded-lg my-6">
    <div className="space-y-2 w-[90%] bg-gray-50 p-[20px] rounded-lg">
      <p className="text-gray-600 text-lg">Payments Made</p>
      <p className="text-4xl font-bold text-gray-900">100.538.149 NGN</p>
      <div className="flex items-center text-green-500">
        <span className="text-sm">+5% last month</span>
      </div>
    </div>
    <div className="space-y-2 w-[90%] bg-gray-50 p-[20px] rounded-lg">
      <p className="text-gray-600 text-lg">Commission Earned</p>
      <p className="text-4xl font-bold text-gray-900">20.000.000 NGN</p>
      <div className="flex items-center text-green-500">
        <span className="text-sm">+5% last month</span>
      </div>
    </div>
  </div>
);

// Dashboard Component
const DashboardOverview = () => {
  // Sample data for line charts
  console.log("dash");
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

  // Status data for donut charts
  const waybillStatus = [
    { status: "Pending", percentage: 40, color: "rgb(239, 68, 68)" },
    { status: "In Transit", percentage: 35, color: "rgb(59, 130, 246)" },
    { status: "Delivered", percentage: 25, color: "rgb(45, 212, 191)" },
  ];

  const incidentStatus = [
    { status: "Open", percentage: 40, color: "rgb(239, 68, 68)" },
    { status: "In Progress", percentage: 35, color: "rgb(59, 130, 246)" },
    { status: "Resolved", percentage: 25, color: "rgb(45, 212, 191)" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-gray-500">Access a detailed overview of essentials data</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Date Range</span>
          <input
            type="date"
            className="px-4 py-2 bg-white border rounded-lg flex items-center space-x-2"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index} className=" max-w-[300px] h-[130px]">
            <CardContent>
              <div className="flex flex-row justify-between">
                <div className="w-[60%]  flex h-auto flex-col gap-[5px]">
                  <h3 className="text-gray-500 font-medium">{stat.title}</h3>
                  <span className="text-3xl font-semibold">{stat.value}</span>
                  <span className="text-green-500 text-sm">{stat.change}</span>
                </div>
                <div className="flex-1 flex justify-end items-center w-1/2">
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

      {/* Status Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Waybills Status */}
        <Card>
          <CardHeader>
            <CardTitle>Waybills Status</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-[50px] items-center">
            <AnimatedPieChart data={waybillStatus} />
            <div className="space-y-4">
              {waybillStatus.map((status, index) => (
                <div key={index} className="flex flex-col items-center space-x-2">
                  <div className="flex items-center gap-[10px]">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: status.color }}
                    />
                    <span className="text-gray-600">{status.status}</span>
                  </div>
                  <span className="font-semibold">{status.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Incidents Status */}
        <Card>
          <CardHeader>
            <CardTitle>Incidents Status</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-[50px] items-center">
            <AnimatedPieChart data={incidentStatus} />
            <div className="space-y-4">
              {incidentStatus.map((status, index) => (
                <div key={index} className="flex flex-col items-center space-x-2">
                  <div className="flex items-center gap-[10px]">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: status.color }}
                    />
                    <span className="text-gray-600">{status.status}</span>
                  </div>
                  <span className="font-semibold">{status.percentage}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Payment & Commission</h2>

        <BarChart
          width={window.innerWidth - 350}
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="payment" fill="#8884d8" />
          <Bar dataKey="commission" fill="#82ca9d" />
        </BarChart>
        <PaymentStatsCard />
      </div>
    </div>
  );
};

export default DashboardOverview;
