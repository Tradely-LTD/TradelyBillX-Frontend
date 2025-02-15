import { Clock, MapPin } from "lucide-react";
import { useGetWaybillQuery } from "../waybill/waybill.api";
import { useParams } from "react-router-dom";
import { Loader } from "@/common/loader/loader";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Text from "@/common/text/text";
import { formatID } from "@/utils/helper";
import { QRCodeSVG } from "qrcode.react";
// import html2canvas from "html2canvas";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import urls from "@/utils/config";

const WaybillReceipt = () => {
  const { id } = useParams();
  const { data: waybillData, isLoading, isFetching } = useGetWaybillQuery({ id: id ?? "" });
  const data = waybillData?.data;
  const qrcode = `${urls.API_BASE_URL}/receipt/${id}`;
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "waybill",
  });

  if (isFetching || isLoading) {
    return <Loader />;
  }
  const dateOnly = data?.createdAt?.split("T")[0];

  const handleDownload = async () => {
    const input = componentRef.current;
    if (input) {
      const pdf = new jsPDF("portrait", "px", "a4");
      const canvas = await html2canvas(input, { scale: 3 });
      const imgData = canvas.toDataURL("image/png");
      const imageProperties = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imageProperties.height * pdfWidth) / imageProperties.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`waybill-${dateOnly}.pdf`);
    }
  };
  return (
    <>
      <div className="max-w-3xl mx-auto  flex gap-2">
        <div
          className="cursor-pointer p-1 font-semibold rounded-md   text-green-600"
          onClick={() => handlePrint()}
        >
          Print
        </div>
        <div
          className="cursor-pointer p-1 font-semibold rounded-md  text-green-600"
          onClick={handleDownload}
        >
          Download
        </div>
      </div>

      <div ref={componentRef} className="max-w-3xl mx-auto bg-white p-4 shadow-lg rounded-lg ">
        <div className="text-center my-3 flex justify-center items-center flex-col">
          <div>
            <img style={{ height: "40px" }} src="../vite.svg" />
          </div>
          <div>
            <Text h2>AMALGAMATE UNION OF FOODSTUFF AND CATTLE DEALERS OF NIGERIA</Text>
            <Text secondaryColor block>
              Plot D36, Flat 6, Lagos Crescent Garki II, Abuja.
            </Text>
          </div>
        </div>

        <div className="flex flex-wrap w-full  flex-col md:flex-row-reverse justify-between items-center">
          <div className="p-3 my-2  w-[100%] md:w-[40%]   flex flex-row-reverse justify-between gap-1 items-center border rounded-md bg-white">
            <QRCodeSVG value={qrcode} size={90} level="H" />
            <div>
              <Text secondaryColor className=" rounded-md my-2">
                Date Issued
              </Text>
              <Text block h3>
                06/10/2024
              </Text>
            </div>
          </div>
          <div className="border p-3 rounded-md   w-[100%] md:w-[40%]   flex flex-col justify-between mb-4">
            <Text className="bg-[#F7F8FB] p-3 rounded-md my-2" h3>
              Waybill Information
            </Text>

            <div className="w-full flex flex-col gap-3">
              <div className="flex gap-2 items-start justify-between">
                <div>
                  <Text>Waybill ID</Text>
                </div>
                <div className="flex gap-4">
                  <Text className="!flex items-center gap-2" color="green">
                    {formatID(data?.id ?? "")}
                  </Text>
                </div>
              </div>
              <div className="flex gap-2 items-start justify-between">
                <div>
                  <Text>Waybill Number</Text>
                </div>
                <div className="flex gap-4">
                  <Text className="!flex items-center gap-2" color="green">
                    {formatID(data?.id ?? "")}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border p-3 rounded-md min-w-full  flex flex-col justify-between mb-4">
          <Text className="bg-[#F7F8FB] p-3 rounded-md my-2" h3>
            Drive and Vehicle Information
          </Text>

          <div className="flex flex-wrap gap-3">
            <div>
              <LabelData title="Driver's Name" value={data?.driverName ?? ""} />
            </div>
            <div>
              <LabelData title="Driver's Phone Number" value={data?.driverPhone ?? ""} />
            </div>
            <div>
              <LabelData title="Vehicle Number" value={data?.vehicleNumber ?? ""} />
            </div>
          </div>
        </div>

        <div className="border p-3 rounded-md min-w-full  flex flex-col justify-between mb-4">
          <Text className="bg-[#F7F8FB] p-3 rounded-md my-2" h3>
            Shipment Status
          </Text>

          <div className="">
            <div>
              <Text className=" rounded-md my-2 !flex items-center gap-2">
                <MapPin size={16} /> Loading Location
              </Text>
            </div>
            <div className="flex flex-wrap gap-2">
              <div>
                <LabelData title="State" value={data?.loadingState ?? ""} />
              </div>
              <div>
                <LabelData title="LGA" value={data?.loadingLGA ?? ""} />
              </div>
              <div>
                <LabelData title="Town/City" value={data?.loadingMarket ?? ""} />
              </div>
            </div>
          </div>

          <div className="border-t">
            <div>
              <Text className=" rounded-md my-2 !flex items-center gap-2">
                <MapPin size={16} /> Delivery Location
              </Text>
            </div>
            <div className="flex flex-wrap gap-2">
              <div>
                <LabelData title="State" value={data?.deliveryState ?? ""} />
              </div>
              <div>
                <LabelData title="LGA" value={data?.deliveryLGA ?? ""} />
              </div>
              <div>
                <LabelData title="Town/City" value={data?.deliveryTown ?? ""} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-1 border-t  py-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-500" />
                <span className="font-semibold">Departure</span>
              </div>

              <div className="pl-6">
                <p className="text-sm">Date: {data?.departureDate}</p>
                <p className="text-sm">Time: {data?.departureTime}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-green-500" />
                <span className="font-semibold">Arrival</span>
              </div>
              <div className="pl-6">
                <p className="text-sm ">Date: {data?.arrivalDate}</p>
                <p className="text-sm">Time: {data?.arrivalTime}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border p-3 rounded-md min-w-full  flex flex-col justify-between mb-4">
          <Text className="bg-[#F7F8FB] p-3 rounded-md my-2" h3>
            Product Information
          </Text>
          <div>
            <div>
              {data?.products.map((item, index) => {
                return (
                  <ProductCard
                    number={(index + 1).toString()}
                    quantity={item?.quantity}
                    title={item?.productName}
                    value=""
                    unit={item.unit}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* People Details */}
        {/* <div className="space-y-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-500" />
              <span className="font-semibold">Goods Owner</span>
            </div>
            <p className="text-sm pl-6">{data?.goodsOwnerName}</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User size={16} className="text-gray-500" />
              <span className="font-semibold">Goods Receiver</span>
            </div>
            <p className="text-sm pl-6">{data?.goodsReceiverName}</p>
          </div>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-500" />
            <span className="font-semibold">Driver Details</span>
          </div>
          <div className="pl-6 flex gap-4">
            <p className="text-sm">{data?.driverName}</p>
            <div className="flex items-center gap-1">
              <Phone size={14} className="text-gray-500" />
              <p className="text-sm">{data?.driverPhone}</p>
            </div>
          </div>
        </div>
      </div> */}

        {/* Vehicle Details */}

        {/* <div className="border-t pt-4">
        <div className="flex items-center gap-2">
          <Truck size={16} className="text-gray-500" />
          <span className="font-semibold">Vehicle Number:</span>
          <span className="text-sm">{data?.vehicleNumber}</span>
        </div>
      </div> */}
      </div>
    </>
  );
};

export default WaybillReceipt;

const LabelData = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="my-2">
      <p className="text-gray-600">{title}</p>
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
  unit,
}: {
  title: string;
  quantity: string;
  value: string;
  number: string;
  unit: string;
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
            {quantity}- {unit}
          </Text>
        </div>
      </div>
      <Text block>{value}</Text>
    </div>
  );
};
