//@ts-nocheck
import React, { useState } from "react";
import Button from "@/common/button/button";
import { DriverVehicleInfo } from "./driver/driver-from";
import { ShipmentDetails } from "./shipment/shipment";
import PaymentDetailsForm from "./products/PaymentDetailsForm";
import { ProductDetails } from "./products/ProductDetails";
import { FormProvider, useForm } from "react-hook-form";
import { wayBillSchema } from "../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFormContext } from "./formContext"; // Import useFormContext

const WaybillForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const TOTAL_STEPS = 3;

  // Initialize form methods using useForm
  const methods = useForm({
    resolver: yupResolver(wayBillSchema), // Your validation schema
  });

  const {
    trigger,
    formState: { errors },
  } = methods; // Destructure trigger and errors from methods

  const handleNext = async () => {
    // Define the fields to validate based on the current step
    let fieldsToValidate = [];
    switch (step) {
      case 0:
        fieldsToValidate = ["driverName", "driverPhone", "vehicleNumber"];
        break;
      case 1:
        fieldsToValidate = [
          "loadingMarket",
          "deliveryMarket",
          "departureDate",
          "departureTime",
          "arrivalDate",
          "arrivalTime",
          "loadingState",
          "loadingLGA",
          "deliveryState",
          "deliveryLGA",
          "deliveryTown",
        ];
        break;
      case 2:
        fieldsToValidate = ["products", "goodsOwnerName", "goodsReceiverName"];
        break;
      default:
        break;
    }

    // Trigger validation for the current step's fields
    const isValid = await trigger(fieldsToValidate);

    // If validation passes, move to the next step
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };
  console.log(errors);
  return (
    <FormProvider {...methods}>
      <div className="mt-4">
        {step === 0 && <DriverVehicleInfo methods={methods} />}
        {step === 1 && <ShipmentDetails methods={methods} />}
        {step === 2 && <ProductDetails methods={methods} />}
        {step === 3 && <PaymentDetailsForm methods={methods} />}
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
    </FormProvider>
  );
};

export default WaybillForm;
