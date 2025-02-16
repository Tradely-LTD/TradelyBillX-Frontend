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
  const {
    trigger,
    formState: { errors },
  } = useFormContext();
  // const driversError = errors.driverName || errors.driverPhone || errors.vehicleNumber;

  const handleNext = async () => {
    let fieldsToValidate = [];

    if (step === 0) {
      fieldsToValidate = ["driverName", "driverPhone", "vehicleNumber"];
    }
    // else if (step === 1) {
    //   fieldsToValidate = ["shipmentType", "destination", "pickupDate"];
    // } else if (step === 2) {
    //   fieldsToValidate = ["productName", "quantity", "price"];
    // } else if (step === 3) {
    //   fieldsToValidate = ["paymentMethod", "totalAmount"];
    // }

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
