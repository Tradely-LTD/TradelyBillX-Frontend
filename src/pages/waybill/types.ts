import * as yup from "yup";

export interface FormValues {
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  loadingState: string;
  loadingLGA: string;
  loadingTownCity: string;
  loadingMarket: string;
  deliveryState: string;
  deliveryLGA: string;
  deliveryTownCity: string;
  deliveryMarket: string;
}

export interface WayBillFormData {
  driverName: string;
  driverPhone: string;
  vehicleNumber: string;
  loadingMarket: string;
  deliveryMarket: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  loadingState: string;
  loadingLGA: string;
  loadingTown: string;

  deliveryState: string;
  deliveryLGA: string;
  deliveryTown: string;

  // products: [];
  goodsOwnerName: string;
  goodsReceiverName: string;
}

export const wayBillSchema = yup.object().shape({
  driverName: yup.string().required("Driver's name is required"),
  driverPhone: yup.string().required("Driver's phone number is required"),
  vehicleNumber: yup.string().required("Vehicle number is required"),
  loadingMarket: yup.string().required("Loading market is required"),
  deliveryMarket: yup.string().required("Delivery market is required"),
  departureDate: yup.string().required("Departure date is required"),
  departureTime: yup.string().required("Departure time is required"),
  arrivalDate: yup.string().required("Arrival date is required"),
  arrivalTime: yup.string().required("Arrival time is required"),
  loadingState: yup.string().required("Loading state is required"),
  loadingLGA: yup.string().required("Loading LGA is required"),
  loadingTown: yup.string().required("Loading town is required"),

  deliveryState: yup.string().required("Delivery state is required"),
  deliveryLGA: yup.string().required("Delivery LGA is required"),
  deliveryTown: yup.string().required("Delivery town is required"),
  // products: yup.array().of(yup.object()).min(1, "At least one product is required"),

  goodsOwnerName: yup.string().required("Good Owners Name is required"),
  goodsReceiverName: yup.string().required("Good Receiver Name is required"),
});
