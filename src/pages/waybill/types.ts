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

  products?: {
    id?: string | number;
    productName: string;
    unit: string;
    quantity: number;
  }[];
  goodsOwnerName: string;
  goodsReceiverName: string;
  shipmentStatus: string;
  transactionReference: string;
}

export const wayBillSchema = yup.object().shape({
  driverName: yup.string().required("Driver's name is required"),
  driverPhone: yup.string().required("Driver's phone number is required"),
  vehicleNumber: yup.string().required("Vehicle number is required"),
  loadingMarket: yup.string().required("Loading market is required"),
  deliveryMarket: yup.string(),
  departureDate: yup.string().required("Departure date is required"),
  departureTime: yup.string(),
  arrivalDate: yup.string(),
  arrivalTime: yup.string(),

  loadingState: yup.string().required("Loading state is required"),
  loadingLGA: yup.string().required("Loading LGA is required"),
  loadingTown: yup.string(),

  deliveryState: yup.string().required("Delivery state is required"),
  deliveryLGA: yup.string().required("Delivery LGA is required"),
  deliveryTown: yup.string(),
  // products: yup.array().of(yup.object()).min(1, "At least one product is required"),
  products: yup
    .array()
    .of(
      yup.object().shape({
        productName: yup.string().required("Product Name is required"),
        unit: yup.string().required("Unit is required"),
        quantity: yup
          .number()
          .required("Quantity is required")
          .min(0, "Quantity must be greater than or equal to 0"),
      })
    )
    .min(1, "At least one product is required"),

  goodsOwnerName: yup.string(),
  goodsReceiverName: yup.string(),
  shipmentStatus: yup.string().required("Shipment Status is required"),
  transactionReference: yup.string().required("Shipment Status is required"),
});
