import { MapPin } from "lucide-react";
import { useGetWaybillQuery } from "../waybill/waybill.api";
import { useParams } from "react-router-dom";
import { Loader } from "@/common/loader/loader";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Text from "@/common/text/text";
import { formatID, thousandFormatter } from "@/utils/helper";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import urls from "@/utils/config";
import { Calendar2 } from "iconsax-react";

const WaybillReceipt = () => {
  const { id } = useParams();
  const { data: waybillData, isLoading, isFetching } = useGetWaybillQuery({ id: id ?? "" });
  const data = waybillData?.data;
  const qrcode = `${urls.API_BASE_URL}/receipt/${id}`;
  const componentRef = useRef<HTMLDivElement | null>(null);

  // Updated for 80mm thermal printer (typically 302px width)
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "waybill",
    pageStyle: `
      @page { 
        size: 80mm auto !important;
        margin: 0 !important;
      }
      @media print {
        body { 
          width: 80mm !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .receipt-container {
          max-width: 80mm !important;
          width: 80mm !important;
          padding: 2mm !important;
          margin: 0 !important;
        }
        .text-sm {
          font-size: 8px !important;
          line-height: 1.2 !important;
        }
        .text-lg {
          font-size: 10px !important;
          line-height: 1.2 !important;
        }
        h2, h3 {
          font-size: 10px !important;
          margin: 2px 0 !important;
        }
        p {
          margin: 1px 0 !important;
        }
        .section {
          padding: 1mm !important;
          margin-bottom: 1mm !important;
        }
        .qr-code {
          width: 60px !important;
          height: 60px !important;
        }
        .flex-wrap {
          gap: 1mm !important;
        }
        img {
          height: 24px !important;
        }
      }
    `,
  });

  const handleDownload = async () => {
    const input = componentRef.current;
    if (!input) return;

    try {
      // Create PDF with appropriate dimensions for 80mm receipt (302px width)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: [80, 297], // 80mm width, dynamic height
      });

      // Get the height of the content
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: input.scrollWidth,
        windowHeight: input.scrollHeight,
      });

      const imgWidth = 80; // 80mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add image to PDF
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, imgWidth, imgHeight);

      // Save the PDF
      pdf.save(`waybill-${dateOnly}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (isFetching || isLoading) {
    return <Loader />;
  }
  const dateOnly = data?.createdAt?.split("T")[0];
  return (
    <>
      <div className="flex gap-2 justify-center">
        <button
          className="cursor-pointer p-1 font-semibold rounded-md text-green-600"
          onClick={() => handlePrint()}
        >
          Print
        </button>
        <button
          className="cursor-pointer p-1 font-semibold rounded-md text-green-600"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>

      <div
        ref={componentRef}
        className="receipt-container mx-auto bg-white p-2 shadow-lg rounded-lg"
        style={{ maxWidth: "302px" }}
      >
        {/* Logo and Header - Reduced spacing */}
        <div className="text-center my-1 flex justify-center items-center flex-col">
          <div>
            <img style={{ height: "24px" }} src="../vite.svg" />
          </div>
          <div>
            <Text h2 className="text-xs">
              AMALGAMATE UNION OF FOODSTUFF AND CATTLE DEALERS OF NIGERIA
            </Text>
            <Text secondaryColor block className="text-xs">
              Plot D36, Flat 6, Lagos Crescent Garki II, Abuja.
            </Text>
          </div>
        </div>

        {/* QR and Waybill Info - Stack on small width */}
        <div className="flex flex-col w-full gap-1">
          <div className="section p-1 border rounded-md bg-white flex justify-between items-center">
            <div>
              <Text secondaryColor className="text-xs">
                Date Issued
              </Text>
              <Text block h3 className="text-xs">
                06/10/2024
              </Text>
            </div>
            <QRCodeSVG value={qrcode} size={60} level="H" className="qr-code" />
          </div>

          <div className="section border p-1 rounded-md">
            <Text className="bg-[#F7F8FB] p-1 rounded-md text-xs" h3>
              Waybill Information
            </Text>

            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-1 items-start justify-between">
                <Text className="text-xs">Waybill ID</Text>
                <Text className="!flex items-center text-xs" color="green">
                  {formatID(data?.id ?? "")}
                </Text>
              </div>
              <div className="flex gap-1 items-start justify-between">
                <Text className="text-xs">Waybill Number</Text>
                <Text className="!flex items-center text-xs" color="green">
                  {formatID(data?.id ?? "")}
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Info - Reduced padding and margins */}
        <div className="section border p-1 rounded-md flex flex-col mb-1 mt-1">
          <Text className="bg-[#F7F8FB] p-1 rounded-md mb-1 text-xs" h3>
            Drive and Vehicle Information
          </Text>

          <div className="flex flex-col gap-1">
            <LabelData title="Driver's Name" value={data?.driverName ?? ""} />
            <LabelData title="Driver's Phone" value={data?.driverPhone ?? ""} />
            <LabelData title="Vehicle Number" value={data?.vehicleNumber ?? ""} />
          </div>
        </div>

        {/* Shipment Info - Reduced padding */}
        <div className="section border p-1 rounded-md flex flex-col mb-1">
          <Text className="bg-[#F7F8FB] p-1 rounded-md mb-1 text-xs" h3>
            Shipment Information
          </Text>

          <div className="mb-1">
            <Text className="mb-1 !flex items-center gap-1 text-xs">
              <MapPin size={12} /> Loading Location
            </Text>
            <div className="flex flex-col gap-1">
              <LabelData title="State" value={data?.loadingState ?? ""} />
              <LabelData title="LGA" value={data?.loadingLGA ?? ""} />
              <LabelData title="Town/City" value={data?.loadingMarket ?? ""} />
            </div>
          </div>

          <div className="border-t pt-1">
            <Text className="mb-1 !flex items-center gap-1 text-xs">
              <MapPin size={12} /> Delivery Location
            </Text>
            <div className="flex flex-col gap-1">
              <LabelData title="State" value={data?.deliveryState ?? ""} />
              <LabelData title="LGA" value={data?.deliveryLGA ?? ""} />
              <LabelData title="Town/City" value={data?.deliveryTown ?? ""} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1 border-t pt-1">
            <div>
              <div className="flex items-center gap-1">
                <Calendar2 size={12} />
                <span className="font-semibold text-xs">Departure</span>
              </div>

              <div className="pl-4">
                <p className="text-xs">Date: {data?.departureDate}</p>
                <p className="text-xs">Time: {data?.departureTime}</p>
              </div>
            </div>
            <div className="mt-1">
              <div className="flex items-center gap-1">
                <Calendar2 size={12} />
                <span className="font-semibold text-xs">Arrival</span>
              </div>
              <div className="pl-4">
                <p className="text-xs">Date: {data?.arrivalDate}</p>
                <p className="text-xs">Time: {data?.arrivalTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info - Reduced padding */}
        <div className="section border p-1 rounded-md flex flex-col mb-1">
          <Text className="bg-[#F7F8FB] p-1 rounded-md mb-1 text-xs" h3>
            Product Information
          </Text>
          <div className="grid grid-cols-2 gap-1 border-t pt-1">
            {data?.products.map((item, index) => (
              <ProductCard
                key={index}
                number={(index + 1).toString()}
                quantity={item?.quantity}
                title={item?.productName}
                value=""
                unit={item.unit}
              />
            ))}
          </div>
        </div>

        {/* Payment Info - Reduced padding */}
        <div className="section border p-1 rounded-md flex flex-col mb-1">
          <Text className="bg-[#F7F8FB] p-1 rounded-md mb-1 text-xs" h3>
            Payment Information
          </Text>
          <div>
            <FlexLabel title="Waybill Fee" value={thousandFormatter(data?.waybillFee ?? 0)} />
            <FlexLabel title="Agent Service Fee" value={thousandFormatter(data?.agentFee ?? 0)} />
            <hr className="border-dotted border-[1px] my-1" />
            <FlexLabel title="Total Price" value={thousandFormatter(data?.totalAmount ?? 0)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WaybillReceipt;

// Simplified components with smaller text and tighter spacing
const LabelData = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="mb-1">
      <p className="text-gray-600 text-xs">{title}</p>
      <Text block h3 className="text-xs">
        {value}
      </Text>
    </div>
  );
};

const FlexLabel = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="mb-1 flex justify-between">
      <p className="text-gray-600 text-xs">{title}</p>
      <Text block h3 className="text-xs">
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
  quantity: number;
  value: string;
  number: string;
  unit: string;
}) => {
  return (
    <div className="flex items-center mb-1 justify-between p-1 rounded-md bg-white">
      <div className="flex  items-center gap-1">
        <div className="bg-[#F7F8FB] w-3 h-3 flex items-center justify-center p-2 text-gray-700 rounded-full text-xs">
          {number}
        </div>
        <div>
          <Text color="#64748B" className="text-xs">
            {title}
          </Text>
          <Text block className="text-xs">
            {quantity}- {unit}
          </Text>
        </div>
      </div>
      <Text block className="text-xs">
        {value}
      </Text>
    </div>
  );
};
