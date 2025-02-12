import { baseApi } from "@/store/baseApi";
import { Methods } from "@/utils/enums";
import { toast } from "react-toastify";

export const wayBillApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWaybills: builder.query<WaybillsResponse, void>({
      query: () => ({
        url: "/waybill/list",
        method: Methods.Get,
      }),
      providesTags: ["WAYBILL"],
    }),

    createWayBills: builder.mutation({
      query: (data) => ({
        url: `/waybill/generate`,
        method: Methods.Post,
        body: data,
      }),
      invalidatesTags: ["WAYBILL"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Waybill Added Successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage = err.error.data.error || err?.error || "Failed to create the waybill";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),
  }),
});

export const { useCreateWayBillsMutation, useGetWaybillsQuery } = wayBillApi;

interface WaybillsResponse {
  data: {
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
    id: string;
    deliveryState: string;
    deliveryLGA: string;
    deliveryTown: string;
    shipmentStatus: "IN_TRANSIT" | "DELIVERED" | "CANCELLED";
    paymentStatus: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "REFUNDED";
    incidentStatus: "SAFE" | "REPORTED" | "REVIEWING" | "RESOLVED";
    // products: [];
    goodsOwnerName: string;
    goodsReceiverName: string;
  }[];
  message: string;
}
