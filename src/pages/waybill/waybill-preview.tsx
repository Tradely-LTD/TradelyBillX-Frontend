import { CircleCheck, Copy, Download, Printer, Share2, Ship } from "lucide-react";
import Text from "@/common/text/text";
import Button from "@/common/button/button";
import { Card } from "iconsax-react";
import StatusIndicator from "@/common/status";
import { useGetWaybillQuery } from "./waybill.api";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "@/common/loader/loader";
import { formatID } from "@/utils/helper";
import { QRCodeSVG } from "qrcode.react";
import urls from "@/utils/config";

const WaybillPreview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: waybillData, isLoading, isFetching } = useGetWaybillQuery({ id: id ?? "" });
  const waybill = waybillData?.data;
  const qrcode = `${urls.API_BASE_URL}/receipt/${id}`;
  console.log(qrcode);
  if (isFetching || isLoading) {
    return <Loader />;
  }
  if (!waybill) {
    return <p>Not found</p>;
  }

  return (
    <div className="max-w-9xl mx-auto py-6 bg-white">
      <div className="bg-white my-3 border border-gray-200 rounded-md p-3">
        <div className="flex gap-5">
          <div className="w-[70%]">
            <div className="bg-[#F7F8FB] p-3 rounded-md  flex flex-col justify-between mb-4">
              <Text h3>Waybill Information</Text>
              <div className="flex gap-3 ">
                <div className="p-3 rounded-md border bg-white">
                  <QRCodeSVG value={qrcode} size={100} level="H" />
                </div>
                <div className="w-full flex flex-col gap-3">
                  <div className="flex gap-2 items-start justify-between">
                    <div>
                      <Text>Waybill ID</Text>
                    </div>
                    <div className="flex gap-4">
                      {formatID(waybill.id)}
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
                      {formatID(waybill.id)}
                      <Text className="!flex items-center gap-2" color="green">
                        <Copy size={14} color="green" /> Copy
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 my-3">
                <Button
                  onClick={() => {
                    navigate(`/receipt/${id}`);
                  }}
                  className="!h-[35px]"
                  leftIcon={<Download size={16} />}
                >
                  Download/Print Waybill
                </Button>
              </div>
            </div>

            <div className="bg-[#F7F8FB] p-3 rounded-md flex flex-col justify-between">
              <Text h3>Drive and Vehicle Information</Text>
              <div className="flex gap-3">
                <div>
                  <LabelData title="Driver's Name" value={waybill?.driverName} />
                </div>
                <div>
                  <LabelData title="Driver's Phone Number" value={waybill?.driverPhone} />
                </div>
                <div>
                  <LabelData title="Vehicle Number" value={waybill.vehicleNumber} />
                </div>
              </div>
            </div>
          </div>
          <div className="w-[30%]">
            <div className="bg-[#F7F8FB] p-2 rounded-md ">
              <Text h3>Transaction ID</Text>
              <div className="flex justify-between my-3">
                <Text color="#64748B">Transaction ID</Text>
                <p className="flex gap-2 font-semibold text-[#2C7743]">
                  {formatID(waybill.id)} <Copy color="green" />
                </p>
              </div>
              <div className="flex justify-between">
                <Text color="#64748B">Receipt</Text>
                <p className="flex gap-2 font-semibold text-[#2C7743]">
                  {formatID(waybill.id)} <Copy color="green" />
                </p>
              </div>
            </div>
            <div className="bg-[#F7F8FB] p-2 rounded-md ">
              <Text h3>Products</Text>

              <div className="">
                {waybill?.products?.map((product, index) => (
                  <ProductCard
                    key={index}
                    number={(index + 1).toString()}
                    title={product.productName}
                    quantity={product.unit}
                    value={product.quantity}
                  />
                ))}
              </div>
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
              <StatusIndicator status={waybill.shipmentStatus} />
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
              <LabelData title="State" value={waybill.loadingState} />
              <LabelData title="LGA" value={waybill.loadingLGA} />
              <LabelData title="Town/City" value={waybill.loadingTown} />
              <LabelData title="Market/Location" value={waybill.loadingMarket} />
            </div>

            <div className="bg-[#F7F8FB] py-2 rounded-md">
              <Text h3>Delivery Location</Text>
              <div className="flex gap-2">
                <LabelData title="State" value={waybill.deliveryState} />
                <LabelData title="LGA" value={waybill.deliveryLGA} />
                <LabelData title="Town/City" value={waybill.deliveryTown} />
                <LabelData title="Market/Location" value={waybill.deliveryMarket} />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="bg-[#F7F8FB] py-2 rounded-md">
                <Text h3 style={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Ship size="16" /> Departure
                </Text>
                <div className="flex gap-2">
                  <LabelData title="Date" value={waybill.departureDate} />
                  <LabelData title="Time" value={waybill.departureTime} />
                </div>
              </div>
              <div className="bg-[#F7F8FB] py-2 rounded-md">
                <Text h3 style={{ display: "flex", gap: 3, alignItems: "center" }}>
                  <Ship size="16" /> Arrival
                </Text>
                <div className="flex gap-2">
                  <LabelData title="Date" value={waybill.arrivalDate} />
                  <LabelData title="Time" value={waybill.arrivalTime} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#F7F8FB] p-2 rounded-md w-[30%]">
            <Text h3 block>
              Goods Information
            </Text>
            <div className="bg-white p-3 rounded-md my-2">
              <LabelData title="Goods Owner" value={waybill.goodsOwnerName} />
              <LabelData title="Goods Receiver" value={waybill.goodsReceiverName} />
            </div>

            <hr />

            <div>
              <Text h3>Payment Summary</Text>
              <div className="flex items-center justify-between my-2">
                <Text block>Payment Status</Text>
                <StatusIndicator status={waybill.paymentStatus} />
              </div>
              <div className="flex items-center justify-between my-2">
                <Text block>Incident Status</Text>
                <StatusIndicator status={waybill.incidentStatus} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-5 my-4 items-start">
          <div className="bg-[#F7F8FB] p-3 rounded-md w-[70%] flex flex-col justify-between">
            <Text h3>Payment Method</Text>
            <div className="bg-white p-3 rounded-md flex items-center justify-between">
              <div className="flex gap-2">
                <Card />
                <Text>{"**** **** **** " + waybill.id.slice(-4)}</Text>
              </div>
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

const LabelData = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="my-2">
      <Text color="#64748B">{title}</Text>
      <Text block h3>
        {value}
      </Text>
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
  number: string;
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

export default WaybillPreview;
