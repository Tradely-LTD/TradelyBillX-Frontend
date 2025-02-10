import WaybillForm from "./components/WaybillForm";
import { FormProvider } from "./formContext";

export default function Waybill() {
  return (
    <FormProvider>
      <div className="w-full mx-auto px-4 py-2 bg-white">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-2xl font-semibold">Create New Waybill</div>
            <div className="text-[#64748B]">
              Apply for waybills through the system by submitting product and shipment details.
            </div>
          </div>
        </div>
        <WaybillForm />
      </div>
    </FormProvider>
  );
}
