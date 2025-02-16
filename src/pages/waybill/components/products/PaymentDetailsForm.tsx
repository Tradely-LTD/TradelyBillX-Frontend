import { Copy, Ship } from "lucide-react";
import { useFormContext } from "../formContext";
import Text from "@/common/text/text";
import Button from "@/common/button/button";

import StatusIndicator from "@/common/status";
import PaystackPayment from "../paystack";
import { useStateSlice } from "../../waybill.slice";
import Input from "@/common/input/input";
import { useState } from "react";
import { useUserSlice } from "@/pages/auth/authSlice";

const PaymentDetailsForm = () => {
  const { watch } = useFormContext();
  const formValues = watch();
  const { state } = useStateSlice();
  const [agentAmount, setAmount] = useState(0);
  const { loginResponse } = useUserSlice();
  const totalAmount = agentAmount + Number(state?.constant_price);

  return (
    <div className="max-w-9xl mx-auto py-6 bg-white">
      <div className="bg-white my-3 border border-gray-200 rounded-md p-3">
        <div className="flex gap-5">
          <div className="w-[70%]">
            <div className="bg-[#F7F8FB] p-3 rounded-md flex flex-col justify-between">
              <Text h3>Drive and Vehicle Information</Text>
              <div className="flex gap-3">
                <div>
                  <LabelData title="Driver's Name" value={formValues.driverName} />
                </div>
                <div>
                  <LabelData title="Driver's Phone Number" value={formValues.driverPhone} />
                </div>
                <div>
                  <LabelData title="Vehicle Number" value={formValues.vehicleNumber} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F7F8FB] p-2 rounded-md w-[30%]">
            <Text h3>Transaction ID</Text>
            <div className="flex justify-between my-3">
              <Text color="#64748B">Transaction ID</Text>
              <p className="flex gap-2 font-semibold text-[#2C7743]">
                {formValues.transactionId || "TRX001"} <Copy color="green" />
              </p>
            </div>
            <div className="flex justify-between">
              <Text color="#64748B">Receipt</Text>
              <p className="flex gap-2 font-semibold text-[#2C7743]">
                {formValues.receiptNumber || "32414"} <Copy color="green" />
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-5 my-4 items-start">
          <div className="bg-[#F7F8FB] p-3 rounded-md w-[70%] flex flex-col justify-between">
            <Text h3>Shipment Information</Text>
            <div className="bg-[white] p-2 my-3 flex justify-between rounded-md">
              <Text style={{ display: "flex", gap: 3, alignItems: "center" }}>
                <Ship size="16" /> Shipment Status
              </Text>
              <StatusIndicator status={formValues?.shipmentStatus || "Pending"} />
            </div>

            <Text
              style={{
                display: "flex",
                fontWeight: "500",
                margin: "10px 0px",
                gap: 3,
                alignItems: "center",
              }}
            >
              <Ship size="16" /> Loading Location
            </Text>
            <div className="flex gap-2">
              <LabelData title="State" value={formValues.loadingState} />
              <LabelData title="LGA" value={formValues.loadingLGA} />
              <LabelData title="Town/City" value={formValues.loadingTown} />
              <LabelData title="Market/Location" value={formValues.loadingMarket} />
            </div>

            <div className="bg-[#F7F8FB] py-2 rounded-md">
              <Text h3>Delivery Location</Text>
              <div className="flex gap-2">
                <LabelData title="State" value={formValues.deliveryState} />
                <LabelData title="LGA" value={formValues.deliveryLGA} />
                <LabelData title="Town/City" value={formValues.deliveryTown} />
                <LabelData title="Market/Location" value={formValues.deliveryMarket} />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="bg-[#F7F8FB] py-2 rounded-md">
                <Text h3 style={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Ship size="16" /> Departure
                </Text>
                <div className="flex gap-2">
                  <LabelData title="Date" value={formValues.departureDate} />
                  <LabelData title="Time" value={formValues.departureTime} />
                </div>
              </div>
              <div className="bg-[#F7F8FB] py-2 rounded-md">
                <Text h3 style={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Ship size="16" /> Arrival
                </Text>
                <div className="flex gap-2">
                  <LabelData title="Date" value={formValues.arrivalDate} />
                  <LabelData title="Time" value={formValues.arrivalTime} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F7F8FB] p-2 rounded-md w-[30%]">
            <Text h3 block>
              Product Information
            </Text>
            <div className="">
              {formValues?.products?.map((product, index) => (
                <ProductCard
                  key={index}
                  number={(index + 1).toString()}
                  quantity={product.productName}
                  title={product.unit}
                  value={product?.quantity ?? "0"}
                />
              ))}
            </div>
            <hr />

            <div>
              <Text h3>Payment Summary</Text>
              {/* <div className="flex items-center justify-between my-2">
                <Text block>Item Total</Text>
                <Text style={{ fontWeight: "600" }}>{formValues.products?.length || 0} Items</Text>
              </div> */}
              <div className="flex items-center justify-between my-2">
                <Text block>Agent Service Fee</Text>
                <Text style={{ fontWeight: "600" }}>{agentAmount} NGN</Text>
              </div>
              <div className="flex items-center justify-between my-2">
                <Text block>Waybill Fee</Text>
                <Text style={{ fontWeight: "600" }}>{state?.constant_price} NGN</Text>
              </div>
              <hr className="border-dotted border-[2px]" />
              <div className="flex items-center justify-between my-2">
                <Text block>Total Price</Text>
                <Text style={{ fontWeight: "600" }}>{totalAmount || "0"} NGN</Text>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 my-4 items-start">
          <div>
            {state?.allow_price_edit && (
              <>
                <div className="bg-white p-3 rounded-md ">
                  <Input
                    label="Agent Service Fee"
                    value={agentAmount}
                    onChange={(e) => {
                      setAmount(Number(e.target.value));
                    }}
                  />
                </div>
              </>
            )}
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-1">
                <input type="checkbox" className="w-4 h-4 text-green-600" />
                <span className="text-sm">
                  By clicking this, I agree to AUFCDN{" "}
                  <a href="#" className="text-blue-500">
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-500">
                    Privacy Policy
                  </a>
                </span>
              </div>
              <PaystackPayment
                amount={totalAmount}
                email={loginResponse?.user?.email ?? ""}
                reference={""}
                stateId={state?.id ?? ""}
              />
            </div>
          </div>

          <div className="bg-[#F7F8FB] p-2 rounded-md w-[30%]">
            <Text h3 block>
              Help
            </Text>
            <Text>If You have a question or encounter a problem, we can help you any time.</Text>
            <div className="my-4">
              <Button className="!h-[30px] my-3" fullWidth>
                Contact Us
              </Button>
              <Button variant="outlined" fullWidth className="!bg-white !border-none !h-[30px]">
                Go to My Waybills
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({
  title,
  quantity,
  value,
  number,
}: {
  title: string;
  quantity: string;
  value: string;
  number: string | number;
}) => {
  return (
    <div className="flex items-center my-2 justify-between p-2 rounded-md bg-white">
      <div className="flex items-center gap-2">
        <div className="bg-[#F7F8FB] w-4 h-4 flex items-center justify-center p-3 text-gray-700 rounded-full">
          {number}
        </div>
        <div>
          <Text color="#64748B">{title}</Text>
          <Text block h3>
            {quantity}
          </Text>
        </div>
      </div>
      <Text block>{value}</Text>
    </div>
  );
};

const LabelData = ({ title, value }: { title: string; value: string }) => {
  return (
    <div>
      <Text color="#64748B">{title}</Text>
      <Text block h3>
        {value}
      </Text>
    </div>
  );
};

export default PaymentDetailsForm;
