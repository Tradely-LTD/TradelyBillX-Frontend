//@ts-nocheck
import Text from "@/common/text/text";
import { Copy, Eye, Siren } from "lucide-react";
import EmergencyIcon from "@/assets/emergency-siren.svg";
import Button from "@/common/button/button";
import ArrowRight from "../../../../public/ArrowRight.svg";
import StatusIndicator from "@/common/status";
import styled from "styled-components";
import { Call } from "iconsax-react";
import { useGetIncidentQuery } from "../incidents.api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

function IncidentPreview() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetIncidentQuery({ id: id ?? "" });
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const incident = data?.data;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  if (isLoading) {
    return (
      <div className="">
        <Skeleton height={"60vh"} width={"100%"} />
      </div>
    );
  }

  if (error) {
    return <div className="p-4">Error loading incident: {error.message}</div>;
  }

  if (!incident) {
    return <div className="p-4">No incident data found</div>;
  }

  return (
    <Container>
      <div className="flex gap-2 my-3">
        <Text secondaryColor>Incident Reporting</Text>
        <img src={ArrowRight} className="h-[20px] w-[20px]" />
        <Text className="underline !font-semibold" color="green">
          {incident.id || "IC90123"}
        </Text>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 my-3">
          <img src={EmergencyIcon} alt="emergency_icon" />
          <div>
            <Text h3 block>
              {incident.id || "IC9123"}
            </Text>
            <Text secondaryColor>Incident ID</Text>
          </div>
        </div>
        <div>
          <Button
            leftIcon={<Copy size={15} />}
            style={{ border: "1px solid" }}
            className="!border-gray !h-[35px]"
            variant="ghost"
            onClick={() => copyToClipboard(incident.id)}
          >
            {copied ? "Copied!" : "Copy ID"}
          </Button>
        </div>
      </div>
      <section>
        <div className="bg-[#F7F8FB] p-2 rounded-md">
          <Text h3>Incident Details</Text>

          <div className="bg-[white] p-2 my-3 flex justify-between rounded-md">
            <Text style={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Siren /> Reporting Status
            </Text>
            <StatusIndicator status={incident.status || "Resolved"} />
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-2 justify-between my-3">
              <Text color="#64748B">Location</Text>
              <p className="flex gap-2 font-semibold text-[#2C7743]">{incident.location}</p>
            </div>
          </div>
          <>
            <Text>
              {incident.description ||
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt dignissimos natus delectus nam molestias necessitatibus expedita quis, reiciendis at sed alias officiis. Culpa dolorem, provident aliquid officiis error velit quibusdam."}
            </Text>
          </>
        </div>

        <div className="bg-[#F7F8FB] p-2 rounded-md">
          <Text h3>Date Created</Text>
          <div className="flex gap-2">
            <LabelData
              title="Date"
              value={incident.createdAt ? new Date(incident.createdAt).toLocaleDateString() : "N/A"}
            />
            <LabelData
              title="Time"
              value={incident.createdAt ? new Date(incident.createdAt).toLocaleTimeString() : "N/A"}
            />
          </div>
          <div className="flex flex-col gap-2 mt-4 justify-between">
            <Text color="#64748B">Resolution Note</Text>
            <p className="flex gap-2 font-semibold text-[#2C7743]">
              {incident.resolutionNotes || "waiting for response..."}{" "}
            </p>
          </div>
        </div>
        <div className="bg-[#F7F8FB] p-2 rounded-md">
          <Text h3>Incident Evidence</Text>
          <div className="flex gap-2 flex-wrap">
            {incident?.evidenceUrl && incident.evidenceUrl.length > 0 ? (
              incident.evidenceUrl.map((item, index) => (
                <div
                  key={index}
                  className="relative w-44 h-44 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100"
                  onClick={() => handleImageClick(item)}
                >
                  <img
                    src={item}
                    alt={`Evidence ${index + 1}`}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <Eye size={20} className="text-white" />
                  </div>
                </div>
              ))
            ) : (
              <>
                <div className="relative w-44 h-44 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Eye size={20} className="text-white" />
                  </div>
                </div>
                <div className="relative w-44 h-44 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <Eye size={20} className="text-white" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="bg-[#F7F8FB] p-2 rounded-md">
          <Text h3>Help</Text>
          <Text block secondaryColor>
            Need assistance with this incident? Contact our support team or cancel your request.
          </Text>
          <Button fullWidth className="!h-[35px] my-2" leftIcon={<Call size={19} />}>
            Contact Us
          </Button>
          <Button
            variant="outlined"
            className="!h-[35px] my-2"
            fullWidth
            onClick={() => {
              // Handle cancel request logic here
              if (window.confirm("Are you sure you want to cancel this request?")) {
                // Add cancellation logic
              }
            }}
          >
            Cancel Request
          </Button>
          <Button
            variant="outlined"
            className="!h-[35px] my-2"
            fullWidth
            onClick={() => {
              // Navigate back to incident list
              window.history.back();
            }}
          >
            Back to List
          </Button>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <img src={selectedImage} alt="Selected Evidence" className="max-w-[90%] max-h-[90%]" />
        </div>
      )}
    </Container>
  );
}

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
export default IncidentPreview;

const Container = styled.div`
  section {
    display: grid;
    grid-template-columns: 70% 30%;
    min-height: 100vh;
    grid-template-rows: 1fr 2fr;
    align-items: start;
    gap: 1rem;
  }
`;
