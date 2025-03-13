import { baseApi } from "@/store/baseApi";
import { Methods } from "@/utils/enums";
import { toast } from "react-toastify";

export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStates: builder.query<StateResponse, void>({
      query: () => ({
        url: "/location/states",
        method: Methods.Get,
      }),
      providesTags: ["LOCATION"],
    }),
    getLGAs: builder.query<TownResponse, { stateId: string }>({
      query: ({ stateId }) => ({
        url: `/location/lgas/state/${stateId}`,
        method: Methods.Get,
      }),
      providesTags: ["LOCATION"],
    }),
    getLGA: builder.query<
      { data: { id: string; label: string; value: string; status_allowed: boolean } },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `/location/lgas/${id}`,
        method: Methods.Get,
      }),
      providesTags: ["LOCATION"],
    }),
    getMarket: builder.query<TownResponse, { lgaId: string }>({
      query: ({ lgaId }) => ({
        url: `/location/market/lga/${lgaId}`,
        method: Methods.Get,
      }),
      providesTags: ["LOCATION"],
    }),
    createMarket: builder.mutation<TownResponse, RequestPayload>({
      query: (data) => ({
        url: `/location/market`,
        method: Methods.Post,
        body: data,
      }),
      invalidatesTags: ["LOCATION"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Town/City Added Successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage =
            err.error.data.error || err?.error || "Failed to create the town/city";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),
    updateMarket: builder.mutation<TownResponse, RequestPayloadTown>({
      query: ({ id, ...rest }) => ({
        url: `/location/market/${id}`,
        method: Methods.Put,
        body: rest,
      }),
      invalidatesTags: ["LOCATION"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Updated Successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage =
            err.error.data.error || err?.error || "Failed to update the town/city";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),
    updateState: builder.mutation<StateResponse, any>({
      query: ({ id, ...rest }) => ({
        url: `/location/states/${id}`,
        method: Methods.Patch,
        body: { ...rest, stateId: id },
      }),
      invalidatesTags: ["LOCATION"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Updated Successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage =
            err.error.data.error || err?.error || "Failed to update the town/city";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),
    deleteTowns: builder.mutation<StateResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/location//towns/${id}`,
        method: Methods.Delete,
      }),
      invalidatesTags: ["LOCATION"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Deleted Successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage =
            err.error.data.error || err?.error || "Failed to delete the town/city";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),
  }),
});

export const {
  useGetStatesQuery,
  useGetLGAsQuery,
  useGetLGAQuery,
  useCreateMarketMutation,
  useGetMarketQuery,
  useUpdateMarketMutation,
  useDeleteTownsMutation,
  useUpdateStateMutation,
} = locationApi;

export interface RequestPayload {
  status_allowed: boolean;
  label: string;
  value: string;
  lgaId: string;
}
interface RequestPayloadTown {
  status_allowed: boolean;
  label: string;
  value: string;
  id: string;
}
export interface State {
  allow_price_edit: boolean;
  aufcdn_percentage: string;
  aufcdn_recipient_code: string;
  constant_price: string;
  enable_internal_revenue: boolean;
  government_percentage: string;
  government_recipient_code: string;
  id: string;
  label: string;
  status_allowed: boolean;
  tradely_percentage: string;
  value: string;
}
interface TownResponse {
  data: {
    id: string;
    label: string;
    value: string;
    status_allowed: boolean;
  }[];
  message: string;
}
interface StateResponse {
  data: State[];
  message: string;
}
