//@ts-nocheck
import React, { useState } from "react";
import Button from "@/common/button/button";
import { DriverVehicleInfo } from "./driver/driver-from";
import { ShipmentDetails } from "./shipment/shipment";
import PaymentDetailsForm from "./products/PaymentDetailsForm";
import { ProductDetails } from "./products/ProductDetails";
import { useFormContext } from "./formContext";

const WaybillForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const TOTAL_STEPS = 3;
  const { trigger } = useFormContext();

  const handleNext = async () => {
    let fieldsToValidate:
      | string
      | string[]
      | readonly (
          | "driverName"
          | "driverPhone"
          | "vehicleNumber"
          | "loadingMarket"
          | "deliveryMarket"
          | "departureDate"
          | "departureTime"
          | "arrivalDate"
          | "arrivalTime"
          | "loadingState"
          | "loadingLGA"
          | "loadingTown"
          | "deliveryState"
          | "deliveryLGA"
          | "deliveryTown"
          | "products"
          | "goodsOwnerName"
          | "goodsReceiverName"
          | "shipmentStatus"
          | "transactionReference"
          | `products.${number}`
          | `products.${number}.id`
          | `products.${number}.productName`
          | `products.${number}.unit`
          | `products.${number}.quantity`
        )[]
      | undefined = [];

    if (step === 0) {
      fieldsToValidate = ["driverName", "driverPhone", "vehicleNumber"];
    }

    const isValid = await trigger(fieldsToValidate, { shouldFocus: true });
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <>
      <div className="mt-4">
        {step === 0 && <DriverVehicleInfo />}
        {step === 1 && <ShipmentDetails />}
        {step === 2 && <ProductDetails />}
        {step === 3 && <PaymentDetailsForm />}
      </div>

      <div className="flex justify-between mt-8">
        <div>
          {step > 0 && (
            <Button type="button" onClick={handlePrev}>
              Previous
            </Button>
          )}
        </div>
        <div>
          {step < TOTAL_STEPS ? (
            <Button type="button" onClick={handleNext}>
              Next
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default WaybillForm;

/*
  const stepValidationFields = {
      0: ["driverName", "driverPhone", "vehicleNumber"],
      1: [
        "loadingState",
        "loadingLGA",
        "loadingTown",
        "loadingMarket",
        "deliveryState",
        "deliveryLGA",
        "deliveryTown",
        "deliveryMarket",
        "departureDate",
        "departureTime",
        "arrivalDate",
        "arrivalTime",
      ],
      2: ["products"],
      3: ["goodsOwnerName", "goodsReceiverName", "shipmentStatus", "transactionReference"],
    };

*/
