import Input from "@/common/input/input";
import { ChangeEvent } from "react";
import { useFormContext } from "../formContext";

export const DriverVehicleInfo = () => {
  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <div className="rounded-[15px] border border-[#F0F2F4] p-[20px] flex justify-between gap-[20px] flex-1">
        <div className="flex gap-[10px]">
          <img src="truck.png" className="h-[48px] w-[48px]" />
          <div>
            <div className="text-[18px] font-semibold">Driver and Vehicle Information</div>
            <div className="text-[#64748B]">
              We need to check the driver and vehicle information for verification.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] w-1/2">
          <Input
            {...register("driverName")}
            error={errors.driverName?.message}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue("driverName", e.target.value);
              clearErrors("driverName");
            }}
            label="Driver's Name"
            name="driverName"
            value={watch("driverName")}
            placeholder="Victor Osimhen"
          />
          <Input
            {...register("driverPhone")}
            error={errors.driverName?.message}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue("driverPhone", e.target.value);
              clearErrors("driverPhone");
            }}
            label="Driver's Phone Number"
            name="driverPhone"
            placeholder="+234 00-000-000"
            value={watch("driverPhone")}
          />
          <Input
            {...register("vehicleNumber")}
            error={errors.driverName?.message}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue("vehicleNumber", e.target.value);
              clearErrors("vehicleNumber");
            }}
            label="Vehicle Number"
            name="vehicleNumber"
            placeholder="Type vehicle number"
            value={watch("vehicleNumber")}
          />
        </div>
      </div>
    </>
  );
};
