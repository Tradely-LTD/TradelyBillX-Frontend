//@ts-nocheck
import Input from "@/common/input/input";
import { ChangeEvent } from "react";

export const DriverVehicleInfo = ({ methods }) => {
  const {
    register,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
  } = methods;
  return (
    <>
      <div className="rounded-[15px] border border-[#F0F2F4] p-[20px] flex flex-wrap md:flex-nowrap justify-between gap-[20px] flex-1">
        <div className="flex gap-[10px]">
          <img src="truck.png" className="h-[48px] w-[48px]" alt="Truck" />
          <div>
            <div className="text-[18px] font-semibold">Driver and Vehicle Information</div>
            <div className="text-[#64748B]">
              We need to check the driver and vehicle information for verification.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[20px] w-full md:w-1/2">
          <Input
            {...register("driverName")}
            error={errors.driverName?.message} // Pass error message to Input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue("driverName", e.target.value);
              clearErrors("driverName");
            }}
            required
            label="Driver's Name"
            name="driverName"
            value={watch("driverName")}
            placeholder="Victor Osimhen"
          />
          <Input
            {...register("driverPhone")}
            error={errors.driverPhone?.message} // Pass error message to Input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue("driverPhone", e.target.value);
              clearErrors("driverPhone");
            }}
            required
            label="Driver's Phone Number"
            name="driverPhone"
            placeholder="+234 00-000-000"
            value={watch("driverPhone")}
          />
          <Input
            {...register("vehicleNumber")}
            error={errors.vehicleNumber?.message} // Pass error message to Input
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setValue("vehicleNumber", e.target.value);
              clearErrors("vehicleNumber");
            }}
            required
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
