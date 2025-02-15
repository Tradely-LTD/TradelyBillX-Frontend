import Button from "@/common/button/button";
import StatusIndicator from "@/common/status";
import Text from "@/common/text/text";
import { Card } from "iconsax-react";
import { CircleCheck, Copy, Download, Printer, Share2, Ship } from "lucide-react";
import Stepper from "../../common/Stepper/Stepper";
import { useState } from "react";
import ArrowRight from "../../../public/ArrowRight.svg";
import { QRCodeSVG } from "qrcode.react";

const steps: any = [
  { label: "Driver/Vehicle Information" },
  { label: "Shipment Details" },
  { label: "Product Details" },
  { label: "Payment Details" },
];

function Transaction() {
  const [isViewWaybill, setisViewWaybill] = useState(false);
  const text = "https://example.com";
  return (
    <div>
      <div>
        <div className="flex gap-2">
          <Text>Transaction History</Text>
          <img src={ArrowRight} className="h-[20px]  w-[20px]]" />
          <Text className="underline !font-semibold" color="green">
            TRANX002
          </Text>
        </div>
        {isViewWaybill ? (
          <>
            <div className="flex justify-between">
              <Text h3>All Done! New Waybill Successfully Generated 🧾</Text>
              <StatusIndicator status="Success" />
            </div>
            <Text>Your payment was successful and we have confirmed it.</Text>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <Text h3>Please Make Payment Before 14 Oct 2024, 23:54</Text>
              <StatusIndicator status="Pending" />
            </div>
            <Text>To get a waybill, please complete your payment</Text>
          </>
        )}
      </div>
      <div>
        <Stepper steps={steps} currentStep={4} />
      </div>

      <div className="bg-white my-3 border border-gray-200 rounded-md  p-3">
        <div className="flex   gap-5">
          <div className=" w-[70%]">
            {isViewWaybill && (
              <div className="bg-[#F7F8FB] p-3 rounded-md  flex flex-col justify-between mb-4">
                <Text h3>Waybill Information</Text>
                <div className="flex gap-3 ">
                  <div className="p-3 rounded-md border bg-white">
                    <QRCodeSVG value={text} size={100} level="H" />
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <div className="flex gap-2 items-start justify-between">
                      <div>
                        <Text>Waybill ID</Text>
                      </div>
                      <div className="flex gap-4">
                        <Text>61234242</Text>
                        <Text className="!flex items-center gap-2" color="green">
                          <Copy size={14} color="green" /> Copy
                        </Text>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start justify-between">
                      <div>
                        <Text>Waybill Number</Text>
                      </div>
                      <div className="flex gap-4">
                        <Text>61234242</Text>
                        <Text className="!flex items-center gap-2" color="green">
                          <Copy size={14} color="green" /> Copy
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 my-3">
                  <Button className="!h-[35px]" leftIcon={<Download size={16} />}>
                    Download Waybill
                  </Button>
                  <Button
                    variant="ghost"
                    className="!bg-white !border !border-[gray] !h-[35px]"
                    leftIcon={<Printer size={16} />}
                  >
                    Print
                  </Button>
                  <Button
                    variant="ghost"
                    className="!bg-white !border !border-[gray] !h-[35px]"
                    leftIcon={<Share2 size={16} />}
                  >
                    Share
                  </Button>
                </div>
              </div>
            )}
            <div className="bg-[#F7F8FB] p-3 rounded-md flex flex-col justify-between">
              <Text h3>Drive and Vehicle Information</Text>
              <div className="flex gap-3">
                <div>
                  <LabelData title="Driver's Name" value="John Doe" />
                </div>
                <div>
                  <LabelData title="Driver's Phone Number" value="0812345678" />
                </div>
                <div>
                  <LabelData title="Vehicle Number" value="ABC-123" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F7F8FB] p-2 rounded-md w-[30%]">
            <Text h3>Transaction ID</Text>
            <div className="flex justify-between my-3">
              <Text color="#64748B"> Transaction ID</Text>
              <p className="flex gap-2 font-semibold text-[#2C7743]">
                TRX001 <Copy color="green" />
              </p>
            </div>
            <div className="flex justify-between">
              <Text color="#64748B"> Receipt</Text>
              <p className="flex gap-2 font-semibold text-[#2C7743]">
                32414 <Copy color="green" />
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-5 my-4 items-start ">
          <div className="bg-[#F7F8FB] p-3 rounded-md w-[70%] flex flex-col justify-between">
            <Text h3>Drive and Vehicle Information</Text>
            <div className="flex gap-3">
              <div>
                <LabelData title="Driver's Name" value="John Doe" />
              </div>
              <div>
                <LabelData title="Driver's Phone Number" value="0812345678" />
              </div>
              <div>
                <LabelData title="Vehicle Number" value="ABC-123" />
              </div>
            </div>
            <div className="bg-[#F7F8FB] py-2 rounded-md ">
              <Text h3>Shipment Information</Text>
              <div className="bg-[white] p-2 my-3 flex justify-between rounded-md">
                <Text style={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Ship size="16" /> Shipment Status
                </Text>
                <StatusIndicator status="Pending" />
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
                <LabelData title="State" value="Ebonyi" />
                <LabelData title="LGA" value="Onicha" />
                <LabelData title="Town/City" value="Onicha" />
                <LabelData title="Market/Location" value="4Q6, Onitsha, Nigria" />
              </div>
            </div>

            <div className="bg-[#F7F8FB] py-2 rounded-md">
              <Text h3>Delivery Location</Text>

              <div className="flex gap-2">
                <LabelData title="State" value="Ebonyi" />
                <LabelData title="LGA" value="Onicha" />
                <LabelData title="Town/City" value="Onicha" />
                <LabelData title="Market/Location" value="4Q6, Onitsha, Nigria" />
              </div>
            </div>
            <div className="flex justify-between">
              <div className="bg-[#F7F8FB] py-2 rounded-md">
                <Text h3 style={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Ship size="16" /> Depature{" "}
                </Text>

                <div className="flex gap-2">
                  <LabelData title="Date" value="01/01/24" />
                  <LabelData title="Time" value="08:40Pm" />
                </div>
              </div>
              <div className="bg-[#F7F8FB] py-2 rounded-md">
                <Text h3 style={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Ship size="16" /> Arrival
                </Text>

                <div className="flex gap-2">
                  <LabelData title="Date" value="01/01/24" />
                  <LabelData title="Time" value="08:40Pm" />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#F7F8FB] p-2 rounded-md w-[30%]">
            <Text h3 block>
              Product Information
            </Text>

            <div className="">
              <ProductCard number="1" title="Corn" quantity="Kiligrom" value="800 kg" />
              <ProductCard number="2" title="Corn" quantity="Kiligrom" value="800 kg" />
              <ProductCard number="3" title="Corn" quantity="Kiligrom" value="800 kg" />
            </div>
            <hr />

            <div>
              <Text h3>Payment Summary</Text>
              <div className="flex items-center justify-between my-2">
                <Text block>Item Total</Text>
                <Text style={{ fontWeight: "600" }}>3 Items</Text>
              </div>
              <div className="flex items-center justify-between my-2">
                <Text block>Item Price</Text>
                <Text style={{ fontWeight: "600" }}>5,1341 NGN</Text>
              </div>
              <div className="flex items-center justify-between my-2">
                <Text block>Waybill Fee</Text>
                <Text style={{ fontWeight: "600" }}>5,133 NGN</Text>
              </div>
              <hr className="border-dotted border-[2px]" />
              <div className="flex items-center justify-between my-2">
                <Text block>Total Price</Text>
                <Text style={{ fontWeight: "600" }}>5,1341 NGN</Text>
              </div>
              {isViewWaybill && (
                <Button fullWidth className="!h-[35px]" leftIcon={<Download size={16} />}>
                  Download Waybill
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-5 my-4 items-start ">
          <div className="bg-[#F7F8FB] p-3 rounded-md w-[70%] flex flex-col justify-between">
            <Text h3>Payment Method</Text>

            <div className="bg-white p-3 rounded-md flex items-center justify-between">
              <div className="flex gap-2">
                <Card />
                <Text>454362526452</Text>
              </div>
              <Text>12/28</Text>
              <CircleCheck fill="green" color="white" />
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
              <Button
                onClick={() => setisViewWaybill(true)}
                variant="outlined"
                fullWidth
                className="!bg-white !border-none !h-[30px]"
              >
                Go to My Waybills
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductCard = ({
  title,
  quantity,
  value,
  number,
}: {
  title: string;
  quantity: string;
  value: string;
  number: string;
}) => {
  return (
    <>
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
        <Text block>{value} </Text>
      </div>
    </>
  );
};
const LabelData = ({ title, value }: { title: string; value: string }) => {
  return (
    <>
      <div>
        <Text color="#64748B">{title}</Text>
        <Text block h3>
          {value}
        </Text>
      </div>
    </>
  );
};
export default Transaction;
