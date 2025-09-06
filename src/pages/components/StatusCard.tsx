//@ts-nocheck
import AnimatedPieChart from "@/common/ui/AnimatedPieChart";

const Card = ({ className = "", children }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}  `}>
    {children}
  </div>
);

const CardHeader = ({ className = "", children }) => (
  <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>
);

const CardTitle = ({ className = "", children }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>{children}</h3>
);

const CardContent = ({ className = "", children }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);
export const StatusCard = ({ title, statusData }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <div className="w-32 flex-shrink-0">
            <AnimatedPieChart size={300} data={statusData} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4 w-full sm:w-auto">
            {statusData.map((status, index) => (
              <div
                key={index}
                className="flex flex-col items-center sm:flex-row sm:items-center gap-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                  <span className="text-gray-600 text-sm">{status.status}</span>
                </div>
                <span className="font-semibold">{status.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
