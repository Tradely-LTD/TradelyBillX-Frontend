import { Clock, MapPin, Truck, User, Phone } from "lucide-react";
import { useGetWaybillQuery } from "../waybill/waybill.api";
import { useParams } from "react-router-dom";
import { Loader } from "@/common/loader/loader";

const WaybillReceipt = () => {
  const { id } = useParams();
  const { data: waybillData, isLoading, isFetching } = useGetWaybillQuery({ id: id ?? "" });
  const data = waybillData?.data;

  if (isFetching || isLoading) {
    return <Loader />;
  }
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-6 border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800">Waybill Receipt</h1>
        <p className="text-gray-600">Waybill ID: {data?.id}</p>
      </div>

      {/* Status Section */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-2 bg-blue-50 rounded">
          <p className="text-sm text-gray-600">Shipment Status</p>
          <p className="font-semibold text-blue-600">{data?.shipmentStatus}</p>
        </div>
        <div className="text-center p-2 bg-green-50 rounded">
          <p className="text-sm text-gray-600">Payment Status</p>
          <p className="font-semibold text-green-600">{data?.paymentStatus}</p>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded">
          <p className="text-sm text-gray-600">Incident Status</p>
          <p className="font-semibold text-purple-600">{data?.incidentStatus}</p>
        </div>
      </div>

      {/* Location Details */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-blue-500" />
            <span className="font-semibold">Pickup Location</span>
          </div>
          <div className="pl-6 space-y-1">
            <p className="text-sm">Market: {data?.loadingMarket}</p>
            <p className="text-sm">State: {data?.loadingState}</p>
            <p className="text-sm">LGA: {data?.loadingLGA}</p>
            <p className="text-sm">Town: {data?.loadingTown}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-green-500" />
            <span className="font-semibold">Delivery Location</span>
          </div>
          <div className="pl-6 space-y-1">
            <p className="text-sm">Market: {data?.deliveryMarket}</p>
            <p className="text-sm">State: {data?.deliveryState}</p>
            <p className="text-sm">LGA: {data?.deliveryLGA}</p>
            <p className="text-sm">Town: {data?.deliveryTown}</p>
          </div>
        </div>
      </div>

      {/* Time Details */}
      <div className="grid grid-cols-2 gap-6 mb-6 border-t border-b py-4">
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
            <p className="text-sm">Date: {data?.arrivalDate}</p>
            <p className="text-sm">Time: {data?.arrivalTime}</p>
          </div>
        </div>
      </div>

      {/* People Details */}
      <div className="space-y-4 mb-6">
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
      </div>

      {/* Vehicle Details */}
      <div className="border-t pt-4">
        <div className="flex items-center gap-2">
          <Truck size={16} className="text-gray-500" />
          <span className="font-semibold">Vehicle Number:</span>
          <span className="text-sm">{data?.vehicleNumber}</span>
        </div>
      </div>
    </div>
  );
};

export default WaybillReceipt;
