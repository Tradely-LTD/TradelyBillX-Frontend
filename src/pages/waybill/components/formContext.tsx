import React, { createContext, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WayBillFormData, wayBillSchema } from "../types";

// type FormContextType = UseFormReturn;

const FormContext = createContext<FormContextType | null>(null);
type FormContextType = UseFormReturn<WayBillFormData>;
export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm({
    resolver: yupResolver(wayBillSchema),
  });
  console.log(methods.getValues());
  return <FormContext.Provider value={methods}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
