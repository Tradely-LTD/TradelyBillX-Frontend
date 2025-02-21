import { baseApi } from "@/store/baseApi";
import { Methods } from "@/utils/enums";
import { toast } from "react-toastify";

export const unionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUnion: builder.query<UnionResponse, void>({
      query: () => ({
        url: "/union",
        method: Methods.Get,
      }),
      providesTags: ["UNION"],
    }),

    createUnion: builder.mutation<Union, Partial<Union>>({
      query: (data) => ({
        url: `/union`,
        method: Methods.Post,
        body: data,
      }),
      invalidatesTags: ["UNION"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Union Added Successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage =
            err?.error?.data?.error || err?.error || "Failed to create the union";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),
    deleteUnion: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/union/${id}`,
        method: Methods.Delete,
      }),
      invalidatesTags: ["UNION"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Deleted Successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage =
            err?.error?.data?.error || err?.error || "Failed to delete the union";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),
    updateUnion: builder.mutation<Union, { data: Union }>({
      query: ({ data }) => ({
        url: `/union/${data.id}`,
        method: Methods.Put,
        body: data,
      }),
      invalidatesTags: ["UNION"],
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          toast.success("Union Updated Successfully", {
            position: "top-right",
          });
        } catch (err: any) {
          const errorMessage =
            err?.error?.data?.error || err?.error || "Failed to update the union";
          toast.error(errorMessage, {
            position: "top-right",
          });
        }
      },
    }),
  }),
});

export const {
  useGetUnionQuery,
  useDeleteUnionMutation,
  useUpdateUnionMutation,
  useCreateUnionMutation,
} = unionApi;

export interface Union {
  id: string;
  userId?: string;
  name: string;
  status?: boolean;
  code: string;
  description?: string;
  createdAt?: string;
}

export interface UnionResponse {
  data: Union[];
  message: string;
}
