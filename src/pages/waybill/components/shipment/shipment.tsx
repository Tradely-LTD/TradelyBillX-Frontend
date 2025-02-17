import { Calendar, Clock } from "iconsax-react";

import Input from "@/common/input/input";
import SelectComponent from "@/common/input/select";
import React, { ChangeEvent, useState } from "react";
import { useFormContext } from "../formContext";
import { useShipmentLocation } from "../../useShipmentLocation";
import { setCurrentState } from "../../waybill.slice";
import { useDispatch } from "react-redux";

export const ShipmentDetails: React.FC = () => {
  const [selectedState, setSelectedState] = useState<any | null>(null);
  const [selectedStateId, setSelectedStateId] = useState<any | null>(null);
  const [selectedTown, setSelectedTown] = useState<string>("");
  const [selectedLGA, setSelectedLGA] = useState<any | null>(null);
  const [selectedLGAId, setSelectedLGAId] = useState<string | null>(null);
  const dispatch = useDispatch();

  const [selectedDeliveryState, setSelectedDeliveryState] = useState<any | null>(null);
  const [selectedDeliveryStateId, setSelectedDeliveryStateId] = useState<any | null>(null);
  const [selectedDeliveryTown, setSelectedDeliveryTown] = useState<string>("");
  const [selectedDeliveryLGA, setSelectedDeliveryLGA] = useState<any | null>(null);
  const [selectedDeliveryLGAId, setSelectedDeliveryLGAId] = useState<string | null>(null);
  const {
    statesData,
    isFetchingLGA,
    isStatesLoading,
    isLGALoading,
    isLoadingTown,
    lgasData,
    towns,
  } = useShipmentLocation({
    selectedLGAId: selectedLGAId ?? "",
    selectedStateId: selectedStateId,
  });
  const {
    statesData: DeliveryStates,
    isFetchingLGA: isFetchingLGADelivery,
    isStatesLoading: isLoadingState,
    isLGALoading: isLoadingLGADelivery,
    isLoadingTown: isLoadingTownDelivery,
    lgasData: lgaDelivery,
    towns: townsDelivery,
  } = useShipmentLocation({
    selectedLGAId: selectedDeliveryLGAId ?? "",
    selectedStateId: selectedDeliveryStateId,
  });
  const {
    register,
    setValue,
    clearErrors,
    watch,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col rounded-[15px] border border-[#F0F2F4] flex-wrap p-[20px] ">
      <div className="flex justify-between gap-[20px] flex-wrap md:flex-nowrap flex-1">
        <div className="flex gap-[10px]">
          <img src="logistics.png" className="h-[48px] w-[48px]" />
          <div>
            <div className="text-[18px] font-semibold">Shipment Information</div>
            <div className="text-[#64748B]">
              We need to verify where the loading location and delivery location of the shipment
              will be.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[20px] md:w-1/2 w-full">
          <div className="space-y-4">
            <h3 className="font-medium">Loading Location</h3>
            <SelectComponent
              options={
                statesData?.data?.length
                  ? statesData.data.map((state) => ({
                      label: state.label,
                      value: state.value,
                      id: state.id,
                      state,
                    }))
                  : [{ label: "No States available", value: "no data ", id: "" }]
              }
              onChange={(value, id, rest) => {
                setValue("loadingState", value);
                setSelectedState(value);
                setSelectedStateId(id);
                dispatch(setCurrentState({ state: rest.state }));
              }}
              // value={selectedState}
              value={watch("loadingState")}
              isLoading={isStatesLoading}
              label="Select state"
            />

            <SelectComponent
              label="Select LGA"
              options={
                lgasData?.data?.length
                  ? lgasData.data.map((lga) => ({
                      label: lga.label,
                      value: lga.value,
                      id: lga.id,
                    }))
                  : selectedLGA
                  ? [{ label: "No LGAs found for this state", value: "no data ", id: "" }]
                  : [{ label: "Select a state first", value: "no data ", id: "" }]
              }
              onChange={(value, id) => {
                setValue("loadingLGA", value);
                setSelectedLGA(value);
                setSelectedLGAId(id ?? "");
              }}
              // value={selectedLGA}
              value={watch("loadingLGA")}
              isLoading={isLGALoading || isFetchingLGA}
              disabled={!selectedState}
            />

            <SelectComponent
              label="Select town/city"
              options={
                towns?.data?.length
                  ? towns.data.map((lga) => ({
                      label: lga.label,
                      value: lga.value,
                      id: lga.id,
                    }))
                  : selectedTown
                  ? [{ label: "No Town/City found for this lga", value: "no data ", id: "" }]
                  : [{ label: "Select a LGA first", value: "no data ", id: "" }]
              }
              onChange={(value) => {
                setValue("loadingTown", value);
                setSelectedTown(value ?? "");
              }}
              // value={selectedTown}
              value={watch("loadingTown")}
              isLoading={isLoadingTown}
              disabled={!selectedLGA}
            />

            <Input
              {...register("loadingMarket")}
              error={errors.loadingMarket?.message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue("loadingMarket", e.target.value);
                clearErrors("loadingMarket");
              }}
              label="Market/Location"
              placeholder="Type full address"
              value={watch("loadingMarket")}
            />
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="font-medium">Delivery Location</h3>
            <SelectComponent
              options={
                DeliveryStates?.data?.length
                  ? DeliveryStates.data.map((state) => ({
                      label: state.label,
                      value: state.value,
                      id: state.id,
                    }))
                  : [{ label: "No States available", value: "no data ", id: "" }]
              }
              onChange={(value, id) => {
                setValue("deliveryState", value);
                setSelectedDeliveryState(value);
                setSelectedDeliveryStateId(id);
              }}
              // value={selectedDeliveryState}
              value={watch("deliveryState")}
              isLoading={isLoadingState}
              label="Select state"
            />

            <SelectComponent
              label="Select LGA"
              options={
                lgaDelivery?.data?.length
                  ? lgaDelivery.data.map((lga) => ({
                      label: lga.label,
                      value: lga.value,
                      id: lga.id,
                    }))
                  : selectedDeliveryLGA
                  ? [{ label: "No LGAs found for this state", value: "no data ", id: "" }]
                  : [{ label: "Select a state first", value: "no data ", id: "" }]
              }
              onChange={(value, id) => {
                setValue("deliveryLGA", value);
                setSelectedDeliveryLGA(value);
                setSelectedDeliveryLGAId(id ?? "");
              }}
              // value={selectedDeliveryLGA}
              value={watch("deliveryLGA")}
              isLoading={isLoadingLGADelivery || isFetchingLGADelivery}
              disabled={!selectedDeliveryState}
            />

            <SelectComponent
              label="Select town/city"
              options={
                townsDelivery?.data?.length
                  ? townsDelivery.data.map((lga) => ({
                      label: lga.label,
                      value: lga.value,
                      id: lga.id,
                    }))
                  : selectedDeliveryTown
                  ? [{ label: "No Town/City found for this lga", value: "no data ", id: "" }]
                  : [{ label: "Select a LGA first", value: "no data ", id: "" }]
              }
              onChange={(value) => {
                setValue("deliveryTown", value);
                setSelectedDeliveryTown(value ?? "");
              }}
              // value={selectedDeliveryTown}
              value={watch("deliveryTown")}
              isLoading={isLoadingTownDelivery}
              disabled={!selectedDeliveryLGA}
            />

            <Input
              label="Market/Location"
              {...register("deliveryMarket")}
              error={errors.deliveryMarket?.message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue("deliveryMarket", e.target.value);
                clearErrors("deliveryMarket");
              }}
              value={watch("deliveryMarket")}
              placeholder="Type full address"
            />
            <div className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Departure Detail</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        label="Date"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        rightIcon={<Calendar size="20" color="#64748b" variant="Bold" />}
                        {...register("departureDate")}
                        value={watch("departureDate")}
                        error={errors.departureDate?.message}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setValue("departureDate", e.target.value);
                          clearErrors("departureDate");
                        }}
                      />
                    </div>
                    <div>
                      <Input
                        label="Time"
                        type="time"
                        placeholder="00:00"
                        value={watch("departureTime")}
                        rightIcon={<Clock size="20" color="#64748b" variant="Bold" />}
                        {...register("departureTime")}
                        error={errors.departureTime?.message}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setValue("departureTime", e.target.value);
                          clearErrors("departureTime");
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-4">Arrival Detail</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        label="Date"
                        type="date"
                        placeholder="dd/mm/yyyy"
                        rightIcon={<Calendar size="20" color="#64748b" variant="Bold" />}
                        {...register("arrivalDate")}
                        value={watch("arrivalDate")}
                        error={errors.arrivalDate?.message}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setValue("arrivalDate", e.target.value);
                          clearErrors("arrivalDate");
                        }}
                      />
                    </div>
                    <div>
                      <Input
                        label="Time"
                        type="time"
                        {...register("arrivalTime")}
                        value={watch("arrivalTime")}
                        error={errors.arrivalTime?.message}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setValue("arrivalTime", e.target.value);
                          clearErrors("arrivalTime");
                        }}
                        placeholder="00:00"
                        rightIcon={<Clock size="20" color="#64748b" variant="Bold" />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-[20px] flex-wrap md:flex-nowrap  flex-1 mt-[30px]">
        <div className="flex gap-[10px]">
          <img src="child.png" className="h-[48px] w-[48px]" />
          <div>
            <div className="text-[18px] font-semibold">Owner & Receiver Information</div>
            <div className="text-[#64748B]">
              For ease of delivery, please include the name of the owner and recipient of the goods.
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[20px]  md:w-1/2 w-full ">
          <div className="space-y-4">
            <Input
              {...register("goodsOwnerName")}
              error={errors.arrivalDate?.message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue("goodsOwnerName", e.target.value);
                clearErrors("goodsOwnerName");
              }}
              label="Goods Owner's Name"
              name="loadingMarket"
              value={watch("goodsOwnerName")}
              placeholder="Type full name"
            />

            <Input
              label="Goods Receiver's Name"
              placeholder="Type full name"
              {...register("goodsReceiverName")}
              value={watch("goodsReceiverName")}
              error={errors.arrivalDate?.message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue("goodsReceiverName", e.target.value);
                clearErrors("goodsReceiverName");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
