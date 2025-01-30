import Button from '@/common/button/button';
import WaybillForm from './components/WaybillForm';

export default function Waybill() {
  return (
    <div className="w-full mx-auto px-4 py-2 bg-white">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-2xl font-semibold">Create New Waybill</div>
          <div className="text-[#64748B]">
            Apply for waybills through the system by submitting product and
            shipment details.
          </div>
        </div>
      </div>
      <WaybillForm />
    </div>
  );
}
