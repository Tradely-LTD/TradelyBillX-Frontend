export interface Step {
  label: string;
  component: React.ComponentType;
}

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
