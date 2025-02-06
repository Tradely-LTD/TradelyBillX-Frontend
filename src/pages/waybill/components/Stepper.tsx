import React from "react";
import { Step } from "../types";

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex justify-between items-center h-[52px] rounded-[40px] my-[30px] bg-[#F7F8FB]  px-[10px]">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center  ">
          {index < currentStep ? (
            <img src="Passed.svg" className="h-[20px] w-[20px] mx-[10px]" />
          ) : (
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center  ${
                index === currentStep
                  ? "bg-gray-300 text-gray-600"
                  : index < currentStep
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600  "
              }`}
            >
              {index + 1}
            </div>
          )}

          <span
            className={`ml-2 ${
              index === currentStep ? "text-gray-600" : "text-gray-600 opacity-[0.5]"
            }`}
          >
            {step.label}
          </span>
          {index < steps.length - 1 && (
            <img src="ArrowRight.svg" className="h-[20px]  w-[20px] mx-[20px]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
