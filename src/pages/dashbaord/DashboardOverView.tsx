import { LineChart, Line, ResponsiveContainer } from "recharts";
import AnimatedPieChart from "@/common/ui/AnimatedPieChart";

// Card Components
const Card = ({ className = "", children }) => (
  <div
    className={`bg-white rounded-lg border border-gray-200 shadow-sm  ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ className = "", children }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>
);

const CardTitle = ({ className = "", children }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-6  ${className}`}>{children}</div>
);

// Dashboard Component
const DashboardOverview = () => {
  // Sample data for line charts
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

  // SVG donut chart component
  const DonutChart = ({ data, size = 150 }) => {
    let startAngle = 0;
    const radius = size / 2;
    const centerX = radius;
    const centerY = radius;
    const innerRadius = radius * 0.6;

    return (
      <svg width={size} height={size} className="transform -rotate-90">
        {data.map((item, index) => {
          const percentage = item.percentage;
          const angle = (percentage / 100) * 360;
          const endAngle = startAngle + angle;

          // Calculate path
          const x1 = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
          const y1 = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
          const x2 = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
          const y2 = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

          const largeArcFlag = angle > 180 ? 1 : 0;

          // Create path for arc
          const d = `
            M ${
              centerX + innerRadius * Math.cos((startAngle * Math.PI) / 180)
            } ${centerY + innerRadius * Math.sin((startAngle * Math.PI) / 180)}
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
            L ${centerX + innerRadius * Math.cos((endAngle * Math.PI) / 180)} ${
            centerY + innerRadius * Math.sin((endAngle * Math.PI) / 180)
          }
            A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${
            centerX + innerRadius * Math.cos((startAngle * Math.PI) / 180)
          } ${centerY + innerRadius * Math.sin((startAngle * Math.PI) / 180)}
          `;

          startAngle = endAngle;

          return <path key={index} d={d} fill={item.color} />;
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Overview</h2>
          <p className="text-gray-500">
            Access a detailed overview of essentials data
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-gray-500">Date Range</span>
          <button className="px-4 py-2 bg-white border rounded-lg flex items-center space-x-2">
            <span>1 Oct - 30 Oct 2024</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardContent>
              <div className="flex flex-row justify-between space-y-4">
                <div className="w-1/2 flex flex-col gap-[20px]">
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
                <div
                  key={index}
                  className="flex flex-col items-center space-x-2"
                >
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
          <CardContent className="flex  gap-[50px] items-center">
            <AnimatedPieChart data={incidentStatus} />
            <div className="space-y-4">
              {incidentStatus.map((status, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-x-2"
                >
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
    </div>
  );
};

export default DashboardOverview;
