import { useState } from "react";
import { TabButton, TabContainer } from "../../common/tab";
import PaymentGateway from "./components/paymentGateway";
import SecurityNotification from "./components/securityNotification";
import UnionManagement from "./components/unionManagement";
import Button from "../../common/button/button";
import { Filter, Sort } from "iconsax-react";

const Configuration = () => {
  const [activeTab, setActiveTab] = useState("payment");

  const handleSwitchTab = (value: string) => {
    setActiveTab(value);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "payment":
        return (
          <div>
            <PaymentGateway />
          </div>
        );
      case "security":
        return <SecurityNotification />;
      case "union":
        return <UnionManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full mx-auto px-4 py-2 ">
      <div className="text-2xl font-semibold"> Payment Gateway Setup</div>
      <div className="text-[#64748B]">
        You can set up payment gateways that are enabled for agents to use for
        transactions.
      </div>

      <div className="my-4 flex  items-center justify-between">
        <div className="w-[100%]">
          <TabContainer style={{ width: "70%" }}>
            <TabButton
              onClick={() => handleSwitchTab("payment")}
              active={activeTab === "payment"}
            >
              Payment Gateway
            </TabButton>
            <TabButton
              onClick={() => handleSwitchTab("security")}
              active={activeTab === "security"}
            >
              Security & Notification
            </TabButton>
            <TabButton
              onClick={() => handleSwitchTab("union")}
              active={activeTab === "union"}
            >
              Union Management
            </TabButton>
          </TabContainer>
        </div>

        <div className="flex gap-3">
          <Button
            className="!w-[120px]"
            variant="outlined"
            leftIcon={<Filter />}
          >
            Filter
          </Button>
          <Button className="!w-[120px]" variant="outlined" leftIcon={<Sort />}>
            Sort by
          </Button>
        </div>
      </div>

      <div className="tab-content my-6">{renderTabContent()}</div>
    </div>
  );
};

export default Configuration;
