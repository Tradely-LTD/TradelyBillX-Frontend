import React, { useEffect, useState } from "react";
import Button from "@/common/button/button";
import { DriverVehicleInfo } from "./driver/driver-from";
import { ShipmentDetails } from "./shipment/shipment";
import PaymentDetailsForm from "./products/PaymentDetailsForm";
import { ProductDetails } from "./products/ProductDetails";
import { FormProvider, useFormContext } from "../formContext";
import { useCreateWayBillsMutation } from "../waybill.api";
import { useNavigate } from "react-router-dom";

const WaybillForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const TOTAL_STEPS = 3; // Define total steps (0-based index)
  const { getValues } = useFormContext();
  const navigate = useNavigate();
  const [createWayBill, { isLoading, isSuccess }] = useCreateWayBillsMutation();

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };
  useEffect(() => {
    if (isSuccess) {
      navigate("/waybill/list");
    }
  }, [isSuccess]);
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
          ) : (
            <Button
              loading={isLoading}
              onClick={() => {
                createWayBill(getValues());
                console.log(getValues());
              }}
              type="submit"
            >
              Submit
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default WaybillForm;
