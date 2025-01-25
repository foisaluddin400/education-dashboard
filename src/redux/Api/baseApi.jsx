import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://143.110.241.146:9050",
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    if (token) {
      headers.set("Authorization", `${token}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["overview", "host"],
  endpoints: () => ({}),
});

export const imageUrl = "http://143.110.241.146:9050";
