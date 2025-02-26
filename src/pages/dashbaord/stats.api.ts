import { baseApi } from "@/store/baseApi";
import { Methods } from "@/utils/enums";

interface StatisticsResponse {
  message: string;
  data: {
    totalWaybills: number;
    totalIncidents: number;
    totalPayments: number;
    paymentsAmount: number;
  };
  success: boolean;
}

export const statsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStatsRecord: builder.query<StatisticsResponse, void>({
      query: () => ({
        url: "/stats",
        method: Methods.Get,
      }),
      //   providesTags: ["STATISTICS"],
    }),
  }),
});

export const { useGetStatsRecordQuery } = statsApi;
