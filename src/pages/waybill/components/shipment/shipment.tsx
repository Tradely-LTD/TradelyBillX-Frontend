import { Calendar, Clock } from "iconsax-react";

import Input from "@/common/input/input";
import SelectComponent from "@/common/input/select";
import React, { ChangeEvent, useEffect, useState } from "react";
// import { useFormContext } from "../formContext";
import { useShipmentLocation } from "../../useShipmentLocation";
import { setCurrentState } from "../../waybill.slice";
import { useDispatch } from "react-redux";
import { useUserSlice } from "@/pages/auth/authSlice";
import Text from "@/common/text/text";
import { useGetLGAQuery } from "@/pages/location/location.api";

export const ShipmentDetails: React.FC = ({ methods }) => {
  // const [selectedState, setSelectedState] = useState<any | null>(null);
  const [selectedStateId, setSelectedStateId] = useState<any | null>(null);
  // const [selectedTown, setSelectedTown] = useState<string>("");
  const [selectedLGA, setSelectedLGA] = useState<any | null>(null);
  const [selectedLGAId, setSelectedLGAId] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { loginResponse } = useUserSlice();
  const userState = loginResponse?.user?.state;
  console.log(loginResponse?.user);
  const [selectedDeliveryState, setSelectedDeliveryState] = useState<any | null>(null);
  const [selectedDeliveryStateId, setSelectedDeliveryStateId] = useState<any | null>(null);
  // const [selectedDeliveryTown, setSelectedDeliveryTown] = useState<string>("");
  const [selectedDeliveryLGA, setSelectedDeliveryLGA] = useState<any | null>(null);
  const [selectedDeliveryLGAId, setSelectedDeliveryLGAId] = useState<string | null>(null);

  const { data: LGAData, isLoading: isLoadingLGA } = useGetLGAQuery(
    { id: loginResponse?.user.market?.lgaId ?? "" },
    { skip: loginResponse?.user.market?.lgaId === null }
  );
  console.log(LGAData);
  const {
    statesData: DeliveryStates,
    isFetchingLGA: isFetchingLGADelivery,
    isStatesLoading: isLoadingState,
    isLGALoading: isLoadingLGADelivery,
    // isLoadingTown: isLoadingTownDelivery,
    lgasData: lgaDelivery,
    // towns: townsDelivery,
  } = useShipmentLocation({
    selectedLGAId: selectedDeliveryLGAId ?? "",
    selectedStateId: selectedDeliveryStateId,
  });
  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = methods;

  useEffect(() => {
    if (userState) {
      setValue("loadingState", userState.value);
      setValue("loadingMarket", loginResponse?.user.market?.label);
      setSelectedStateId(userState.id);
      setSelectedLGAId(loginResponse?.user?.market?.lgaId ?? "");
      dispatch(setCurrentState({ state: userState }));
    }
  }, [userState, setValue, dispatch]);

  useEffect(() => {
    setValue("loadingLGA", LGAData?.data?.label);
  }, [LGAData, setValue]);

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
            <h3 className="font-medium mt-3">Loading Location</h3>
            <Text block secondaryColor>
              State: {userState?.label}
            </Text>

            <Text block secondaryColor>
              LGA: {isLoadingLGA ? "Loading..." : LGAData?.data?.label}
            </Text>
            <Text block secondaryColor>
              Market: {loginResponse?.user.market?.label}
            </Text>
          </div>
        </div>

        <div className="flex flex-col gap-[20px] md:w-1/2 w-full">
          <div className="space-y-4">
            {/* <SelectComponent
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
                dispatch(setCurrentState({ state: rest.state }));
              }}
              value={watch("loadingState")}
              isLoading={isStatesLoading}
              label="Select state"
              disabled
            /> */}

            {/* <SelectComponent
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
              value={watch("loadingLGA")}
              isLoading={isLGALoading || isFetchingLGA}
              disabled={!userState}
            /> */}

            <Input
              label="Town/City (Optional)"
              value={watch("loadingTown")}
              {...register("loadingTown")}
              error={errors.loadingTown?.message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue("loadingTown", e.target.value);
                clearErrors("loadingTown");
              }}
              placeholder="Type full Loading Town/City"
            />

            {/* <Input
              {...register("loadingMarket")}
              error={errors.loadingMarket?.message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue("loadingMarket", e.target.value);
                clearErrors("loadingMarket");
              }}
              label="Market/Location"
              placeholder="Type full address"
              value={watch("loadingMarket")}
            /> */}
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="font-medium">Delivery Location</h3>
            <SelectComponent
              required
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
              error={errors?.deliveryState?.message}
              value={watch("deliveryState")}
              isLoading={isLoadingState}
              label="Select state"
            />

            <SelectComponent
              label="Select LGA"
              required
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
              error={errors?.deliveryLGA?.message}
              value={watch("deliveryLGA")}
              isLoading={isLoadingLGADelivery || isFetchingLGADelivery}
              disabled={!selectedDeliveryState}
            />

            <Input
              label="Town/City"
              value={watch("deliveryTown")}
              {...register("deliveryTown")}
              error={errors.deliveryTown?.message}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue("deliveryTown", e.target.value);
                clearErrors("deliveryTown");
              }}
              placeholder="Type full Delivery Town/City"
            />

            <Input
              label="Market/Location"
              required
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
                        required
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
                        required
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
                        required
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
                        required
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
              required
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
              required
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
