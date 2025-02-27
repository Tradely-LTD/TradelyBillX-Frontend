import { MapPin } from "lucide-react";
import { useGetWaybillQuery } from "../waybill/waybill.api";
import { useParams } from "react-router-dom";
import { Loader } from "@/common/loader/loader";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Text from "@/common/text/text";
import { formatID, thousandFormatter } from "@/utils/helper";
import { QRCodeSVG } from "qrcode.react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import urls from "@/utils/config";
import { Calendar2 } from "iconsax-react";
import { TabButton, TabContainer } from "@/common/tab";

const WaybillReceipt = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("80");

  const { data: waybillData, isLoading, isFetching } = useGetWaybillQuery({ id: id ?? "" });
  const data = waybillData?.data;
  const qrcode = `${urls.SERVER_BASE_URL}/receipt/${id}`;
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "waybill",
    pageStyle:
      activeTab === "80"
        ? `
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
          font-size: 5px !important;
          line-height: 1.2 !important;
        }
        .text-lg {
          font-size: 5px !important;
          line-height: 1.2 !important;
        }
        h2, h3 {
          font-size: 5px !important;
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
          width: 100px !important;
          height: 100px !important;
        }
        .flex-wrap {
          gap: 1mm !important;
        }
        img {
          height: 24px !important;
        }
      }
    `
        : `
      @page { 
        size: A4 !important;
        margin: 0 !important;
      }
      @media print {
        body { 
          width: 210mm !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .receipt-container {
          max-width: 210mm !important;
          width: 210mm !important;
          padding: 10mm !important;
          margin: 0 !important;
        }
        .text-sm {
          font-size: 12px !important;
          line-height: 1.5 !important;
        }
        .text-lg {
          font-size: 14px !important;
          line-height: 1.5 !important;
        }
        h2, h3 {
          font-size: 16px !important;
          margin: 5px 0 !important;
        }
        p {
          margin: 3px 0 !important;
        }
        .section {
          padding: 5mm !important;
          margin-bottom: 5mm !important;
        }
        .qr-code {
          width: 100px !important;
          height: 100px !important;
        }
        .flex-wrap {
          gap: 5mm !important;
        }
        img {
          height: 48px !important;
        }
      }
    `,
  });

  const handleDownload = async () => {
    const input = componentRef.current;
    if (!input) return;

    const dateOnly = data?.createdAt?.split("T")[0] || new Date().toISOString().split("T")[0];

    try {
      // Create PDF with appropriate dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      // Get the height of the content
      const canvas = await html2canvas(input, {
        scale: 2,
        useCORS: true,
        logging: false,
        windowWidth: input.scrollWidth,
        windowHeight: input.scrollHeight,
      });

      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const totalPages = Math.ceil(imgHeight / pdf.internal.pageSize.getHeight());

      // Generate PDF page by page
      for (let page = 0; page < totalPages; page++) {
        // Add new page if not first page
        if (page > 0) {
          pdf.addPage();
        }

        // Calculate the portion of the image to use for this page
        const pageHeight = pdf.internal.pageSize.getHeight();
        const sourceY = page * (canvas.height / totalPages);
        const destY = page === 0 ? 0 : 0;

        // Create a temporary canvas for this page section
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height / totalPages;
        const tempCtx = tempCanvas.getContext("2d");

        if (tempCtx) {
          tempCtx.drawImage(
            canvas,
            0, // source x
            sourceY, // source y
            canvas.width, // source width
            canvas.height / totalPages, // source height
            0, // dest x
            0, // dest y
            tempCanvas.width, // dest width
            tempCanvas.height // dest height
          );
        }

        // Add this section to the PDF
        const imgData = tempCanvas.toDataURL("image/png");
        pdf.addImage(
          imgData,
          "PNG",
          0,
          destY,
          imgWidth,
          pdf.internal.pageSize.getHeight(),
          "",
          "FAST"
        );
      }

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
  const handleTabSwitch = (value: string) => {
    setActiveTab(value);
  };
  return (
    <>
      <TabContainer className="!w-fit">
        <TabButton onClick={() => handleTabSwitch("80")} active={activeTab === "80"}>
          80 mm
        </TabButton>
        <TabButton onClick={() => handleTabSwitch("A4")} active={activeTab === "A4"}>
          A4
        </TabButton>
      </TabContainer>
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
        id="receipt-container"
        className="receipt-container mx-auto bg-white p-2 shadow-lg rounded-lg"
        style={{ maxWidth: activeTab === "80" ? "302px" : "210mm" }}
      >
        {/* Logo and Header - Reduced spacing */}
        <div className="text-center my-1 flex justify-center items-center flex-col">
          <div>
            <img style={{ height: activeTab === "80" ? "24px" : "48px" }} src="../vite.svg" />
          </div>
          <div>
            <Text
              h2
              style={{ fontSize: activeTab === "80" ? 12 : 24 }}
              className={activeTab === "80" ? "text-[8px]" : "text-lg"}
            >
              AMALGAMATE UNION OF FOODSTUFF AND CATTLE DEALERS OF NIGERIA
            </Text>
            <Text
              style={{ fontSize: activeTab === "80" ? 12 : 24 }}
              secondaryColor
              block
              className={activeTab === "80" ? "text-xs" : "text-sm"}
            >
              Plot D36, Flat 6, Lagos Crescent Garki II, Abuja.
            </Text>
          </div>
        </div>

        {/* QR and Waybill Info - Stack on small width */}
        <div className="flex flex-col w-full gap-1">
          <div className="section p-1 border rounded-md bg-white flex justify-between items-center">
            <div>
              <Text
                style={{ fontSize: activeTab === "80" ? 12 : 24 }}
                secondaryColor
                className={activeTab === "80" ? "text-xs" : "text-sm"}
              >
                Date Issued
              </Text>
              <Text
                style={{ fontSize: activeTab === "80" ? 12 : 24 }}
                block
                h3
                className={activeTab === "80" ? "text-xs" : "text-sm"}
              >
                06/10/2024
              </Text>
            </div>
          </div>

          <div className="section border p-1 rounded-md">
            <Text
              style={{ fontSize: activeTab === "80" ? 12 : 24 }}
              className="bg-[#F7F8FB] p-1 rounded-md text-xs"
              h3
            >
              Waybill Information
            </Text>

            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-1 items-start justify-between">
                <Text
                  style={{ fontSize: activeTab === "80" ? 12 : 24 }}
                  className={activeTab === "80" ? "text-xs" : "text-sm"}
                >
                  Waybill ID
                </Text>
                <Text
                  style={{ fontSize: activeTab === "80" ? 12 : 24 }}
                  className="!flex items-center text-xs"
                  color="green"
                >
                  {formatID(data?.id ?? "")}
                </Text>
              </div>
              <div className="flex gap-1 items-start justify-between">
                <Text
                  style={{ fontSize: activeTab === "80" ? 12 : 24 }}
                  className={activeTab === "80" ? "text-xs" : "text-sm"}
                >
                  Waybill Number
                </Text>
                <Text
                  style={{ fontSize: activeTab === "80" ? 12 : 24 }}
                  className="!flex items-center text-xs"
                  color="green"
                >
                  {formatID(data?.id ?? "")}
                </Text>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Info - Reduced padding and margins */}
        <div className="section border p-1 rounded-md flex flex-col mb-1 mt-1">
          <Text
            style={{ fontSize: activeTab === "80" ? 12 : 24 }}
            className="bg-[#F7F8FB] p-1 rounded-md mb-1 text-xs"
            h3
          >
            Drive and Vehicle Information
          </Text>

          <div className="flex flex-col gap-1">
            <LabelData activeTab={activeTab} title="Driver's Name" value={data?.driverName ?? ""} />
            <LabelData
              activeTab={activeTab}
              title="Driver's Phone"
              value={data?.driverPhone ?? ""}
            />
            <LabelData
              activeTab={activeTab}
              title="Vehicle Number"
              value={data?.vehicleNumber ?? ""}
            />
          </div>
        </div>

        {/* Shipment Info - Reduced padding */}
        <div className="section border p-1 rounded-md flex flex-col mb-1">
          <Text
            style={{ fontSize: activeTab === "80" ? 12 : 24 }}
            className="bg-[#F7F8FB] p-1 rounded-md mb-1 text-xs"
            h3
          >
            Shipment Information
          </Text>

          <div className="mb-1">
            <Text className="mb-1 !flex items-center gap-1 text-xs">
              <MapPin size={12} /> Loading Location
            </Text>
            <div className="flex flex-col gap-1">
              <LabelData activeTab={activeTab} title="State" value={data?.loadingState ?? ""} />
              <LabelData activeTab={activeTab} title="LGA" value={data?.loadingLGA ?? ""} />
              <LabelData
                activeTab={activeTab}
                title="Town/City"
                value={data?.loadingMarket ?? ""}
              />
            </div>
          </div>

          <div className="border-t pt-1">
            <Text className="mb-1 !flex items-center gap-1 text-xs">
              <MapPin size={12} /> Delivery Location
            </Text>
            <div className="flex flex-col gap-1">
              <LabelData activeTab={activeTab} title="State" value={data?.deliveryState ?? ""} />
              <LabelData activeTab={activeTab} title="LGA" value={data?.deliveryLGA ?? ""} />
              <LabelData activeTab={activeTab} title="Town/City" value={data?.deliveryTown ?? ""} />
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
          <Text
            style={{ fontSize: activeTab === "80" ? 12 : 24 }}
            className="bg-[#F7F8FB] p-1 rounded-md mb-1 text-xs"
            h3
          >
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
          <Text
            style={{ fontSize: activeTab === "80" ? 12 : 24 }}
            className="bg-[#F7F8FB] p-1 rounded-md mb-1 text-xs"
            h3
          >
            Payment Summary
          </Text>
          <div>
            <FlexLabel
              activeTab={activeTab}
              title="Waybill Fee"
              value={thousandFormatter(data?.waybillFee ?? 0)}
            />
            <FlexLabel
              activeTab={activeTab}
              title="Agent Service Fee"
              value={thousandFormatter(data?.agentFee ?? 0)}
            />
            <hr className="border-dotted border-[1px] my-1" />
            <FlexLabel
              activeTab={activeTab}
              title="Total Price"
              value={thousandFormatter(data?.totalAmount ?? 0)}
            />
          </div>
        </div>
        <div className="flex justify-center items-center w-full">
          <QRCodeSVG
            value={qrcode}
            size={activeTab === "80" ? 120 : 100}
            level="H"
            className="qr-code"
          />
        </div>
      </div>
    </>
  );
};

export default WaybillReceipt;

// Simplified components with smaller text and tighter spacing
const LabelData = ({
  title,
  value,
  activeTab,
}: {
  title: string;
  value: string;
  activeTab?: string;
}) => {
  return (
    <div className="mb-1">
      <p className="text-gray-600 text-xs">{title}</p>
      <Text style={{ fontSize: activeTab === "80" ? 12 : 24 }} block h3 className="text-xs">
        {value}
      </Text>
    </div>
  );
};

const FlexLabel = ({
  title,
  value,
  activeTab,
}: {
  title: string;
  value: string;
  activeTab?: string;
}) => {
  return (
    <div className="mb-1 flex justify-between">
      <p className="text-gray-600 text-xs">{title}</p>
      <Text style={{ fontSize: activeTab === "80" ? 12 : 24 }} block h3 className="text-xs">
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
