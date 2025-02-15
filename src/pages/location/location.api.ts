import { baseApi } from "@/store/baseApi";
import { Methods } from "@/utils/enums";
import { toast } from "react-toastify";

export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLocations: builder.query<LocationsResponse, void>({
      query: () => ({
        url: "/location/all",
        method: Methods.Get,
      }),
      providesTags: ["LOCATION"],
    }),
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
    getTowns: builder.query<TownResponse, { lgaId: string }>({
      query: ({ lgaId }) => ({
        url: `/location/towns/lga/${lgaId}`,
        method: Methods.Get,
      }),
      providesTags: ["LOCATION"],
    }),
    createTowns: builder.mutation<TownResponse, RequestPayload>({
      query: (data) => ({
        url: `/location/towns`,
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
    updateTowns: builder.mutation<TownResponse, RequestPayloadTown>({
      query: ({ id, ...rest }) => ({
        url: `/location/towns/${id}`,
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
  useCreateTownsMutation,
  useGetLocationsQuery,
  useGetTownsQuery,
  useUpdateTownsMutation,
  useDeleteTownsMutation,
  useUpdateStateMutation,
} = locationApi;

interface RequestPayload {
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
interface LocationsResponse {
  data: {
    id: string;
    label: string;
    value: string;
    status_allowed: boolean;
    lgas: {
      id: string;
      stateId: string;
      label: string;
      value: string;
      status_allowed: boolean;
      towns: {
        id: string;
        lgaId: string;
        label: string;
        value: string;
        status_allowed: boolean;
      }[];
    }[];
  }[];
  message: string;
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
