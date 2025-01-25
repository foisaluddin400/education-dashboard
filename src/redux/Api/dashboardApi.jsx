import { baseApi } from "./baseApi";

const dashboard = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getChart: builder.query({
        query: (year) => ({
          url: `/meta/user-chart-data?year=${year}`,
          method: "GET",
        }),
        providesTags: ["chart"],
      }),
  }),
});


export const {
  useGetChartQuery,
} = dashboard;
