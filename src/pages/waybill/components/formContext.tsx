//@ts-nocheck
import React, { createContext, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { WayBillFormData, wayBillSchema } from "../types";

// Define the type for the form context
type FormContextType = UseFormReturn<WayBillFormData>;

// Create the context
const FormContext = createContext<FormContextType | null>(null);

// FormProvider component
export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm<WayBillFormData>({
    resolver: yupResolver(wayBillSchema),
    defaultValues: {
      products: [],
    },
  });
  return <FormContext.Provider value={methods}>{children}</FormContext.Provider>;
};

// useFormContext hook
export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};
