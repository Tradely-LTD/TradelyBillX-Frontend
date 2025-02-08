import Text from "@/common/text/text";
import { Copy, Eye, Siren } from "lucide-react";
import EmergencyIcon from "@/assets/emergency-siren.svg";
import Button from "@/common/button/button";
import ArrowRight from "../../../../public/ArrowRight.svg";
import StatusIndicator from "@/common/status";
import styled from "styled-components";
import { Call } from "iconsax-react";

function IncidentPreview() {
  return (
    <Container>
      <div className="flex gap-2 my-3">
        <Text secondaryColor>Incident Reporting</Text>
        <img src={ArrowRight} className="h-[20px]  w-[20px]]" />
        <Text className="underline !font-semibold" color="green">
          IC90123
        </Text>
      </div>
      <div className="flex  justify-between items-center ">
        <div className="flex gap-3 my-3">
          <img src={EmergencyIcon} alt="user_icon" />
          <div>
            <Text h3 block>
              IC9123
            </Text>
            <Text secondaryColor>Incident ID</Text>
          </div>
        </div>
        <div>
          <Button
            leftIcon={<Copy size={15} />}
            style={{ border: "1px solid" }}
            className=" !border-gray !h-[35px]"
            variant="ghost"
          >
            Copy ID
          </Button>
        </div>
      </div>
      <section>
        {/* <div className="flex gap-3 items-start"> */}
        <div className="bg-[#F7F8FB] p-2 rounded-md ">
          <Text h3>Incident Details</Text>

          <div className="bg-[white] p-2 my-3 flex justify-between rounded-md">
            <Text style={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Siren /> Reporting Status
            </Text>
            <StatusIndicator status="Resolved" />
          </div>

          <div className="flex gap-2 items-center">
            <div className="flex flex-col gap-2 justify-between my-3">
              <Text color="#64748B"> Transaction ID</Text>
              <p className="flex gap-2 font-semibold text-[#2C7743]">
                TRX001 <Copy color="green" />
              </p>
            </div>
            <div className="flex flex-col gap-2 justify-between">
              <Text color="#64748B"> Receipt</Text>
              <p className="flex gap-2 font-semibold text-[#2C7743]">
                32414 <Copy color="green" />
              </p>
            </div>
          </div>
          <>
            <Text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt dignissimos natus
              delectus nam molestias necessitatibus expedita quis, reiciendis at sed alias officiis.
              Culpa dolorem, provident aliquid officiis error velit quibusdam.
            </Text>
          </>
        </div>

        <div className="bg-[#F7F8FB] p-2 rounded-md ">
          <Text h3>Date Created</Text>
          <div className="flex gap-2">
            <LabelData title="Date" value="123" />
            <LabelData title="Time" value="123" />
          </div>
        </div>
        <div className="bg-[#F7F8FB] p-2 rounded-md ">
          <Text h3>Incident Evidence</Text>
          <div className="flex gap-2 ">
            <div className="relative w-44 h-44 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
              <img src={""} alt={"file.name"} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Eye size={20} className="text-white" />
              </div>
            </div>
            <div className="relative w-44 h-44 border border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
              <img src={""} alt={"file.name"} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <Eye size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F7F8FB] p-2 rounded-md ">
          <Text h3>Help</Text>
          <Text block secondaryColor>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. distinctio nihil.
          </Text>
          <Button fullWidth className="!h-[35px] my-2" leftIcon={<Call size={19} />}>
            Contact Us
          </Button>
          <Button variant="outlined" className="!h-[35px] my-2" fullWidth>
            Cancel Request
          </Button>
          <Button variant="outlined" className="!h-[35px] my-2" fullWidth>
            Back to List{" "}
          </Button>
        </div>
        {/* </div> */}
      </section>
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
