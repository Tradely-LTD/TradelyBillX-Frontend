import { baseApi } from "@/store/baseApi";
import { Methods } from "@/utils/enums";
import { toast } from "react-toastify";

export const incidentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getIncidents: builder.query<IncidentsResponse, { status?: string } | undefined>({
      query: (params) => {
        // Add status as a query parameter if provided
        if (params?.status) {
          return {
            url: "/incidents",
            params: { status: params.status },
          };
        }
        return "/incidents";
      },
      providesTags: ["INCIDENT"],
    }),
    getIncidentStats: builder.query<IncidentStatsResponse, void>({
      query: () => "/incidents/stats",
      providesTags: ["INCIDENT"],
    }),

    getIncident: builder.query<{ success: boolean; data: Incident }, { id: string }>({
      query: ({ id }) => ({
        url: `/incidents/${id}`,
        method: Methods.Get,
      }),
      providesTags: ["INCIDENT"],
    }),

    createIncident: builder.mutation({
      query: (data) => ({
        url: "/incidents",
        method: Methods.Post,
        body: data,
      }),
      invalidatesTags: ["INCIDENT"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Incident reported successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage = err.error?.data?.error || err?.error || "Failed to report incident";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),

    updateIncident: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/incidents/${id}`,
        method: Methods.Put,
        body: data,
      }),
      invalidatesTags: ["INCIDENT"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Incident updated successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage = err.error?.data?.error || err?.error || "Failed to update incident";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),

    deleteIncident: builder.mutation({
      query: ({ id }) => ({
        url: `/incidents/${id}`,
        method: Methods.Delete,
      }),
      invalidatesTags: ["INCIDENT"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Incident deleted successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage = err.error?.data?.error || err?.error || "Failed to delete incident";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),
  }),
});

export const {
  useGetIncidentsQuery,
  useGetIncidentQuery,
  useCreateIncidentMutation,
  useUpdateIncidentMutation,
  useDeleteIncidentMutation,
  useGetIncidentStatsQuery,
} = incidentApi;

export interface IncidentStatsResponse {
  message: string;
  data: {
    total: number;
    reviewing: number;
    resolved: number;
  };
}

export interface Incident {
  id: string;
  waybillId: string;
  type: "ACCIDENT" | "THEFT" | "VEHICLE_BREAKDOWN" | "DELAY";
  description: string;
  location: string;
  reportedDate: string; // ISO string format (e.g., "2025-02-26T12:00:00Z")

  // Status Management
  status?: "REPORTED" | "REVIEWING" | "RESOLVED";

  // Resolution Details
  resolutionNotes?: string;
  resolvedDate?: string; // Nullable timestamp

  assignTeam?: string;
  evidenceUrl?: string[];
  // Metadata
  createdAt: string; // ISO string format
  updatedAt: string; // ISO string format
  createdBy: string;
  updatedBy?: string;
}

interface IncidentsResponse {
  data: Incident[];
  message: string;
}
