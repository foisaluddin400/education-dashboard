import { baseApi } from "./baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /** Setting APIs */
    getTermsConditions: builder.query({
      query: () => {
        return {
          url: "/manage/get-terms-conditions",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),
    updateTermsCondition: builder.mutation({
      query: (data) => {
        return {
          url: "/manage/add-terms-conditions",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["terms"],
    }),




    getContuct: builder.query({
        query: () => {
          return {
            url: "/manage/get-terms-conditions",
            method: "GET",
          };
        },
        providesTags: ["terms"],
      }),
      updateContuct: builder.mutation({
        query: (data) => {
          return {
            url: "/manage/add-terms-conditions",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["terms"],
      }),



      getLaw: builder.query({
        query: () => {
          return {
            url: "/manage/get-law-form",
            method: "GET",
          };
        },
        providesTags: ["terms"],
      }),
      updateLaw: builder.mutation({
        query: (data) => {
          return {
            url: "/manage/add-law-form",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["terms"],
      }),




      getAbout: builder.query({
        query: () => {
          return {
            url: "/manage/get-about-us",
            method: "GET",
          };
        },
        providesTags: ["terms"],
      }),
      updateAbout: builder.mutation({
        query: (data) => {
          return {
            url: "/manage/add-about-us",
            method: "POST",
            body: data,
          };
        },
        invalidatesTags: ["terms"],
      }),


   
    getprivecyConditions: builder.query({
      query: () => {
        return {
          url: "/manage/get-privacy-policy",
          method: "GET",
        };
      },
      providesTags: ["terms"],
    }),

    postPrivecy: builder.mutation({
      query: (data) => {
        console.log("data", data);
        return {
          url: "/manage/add-privacy-policy",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["terms"],
    }),
  }),
});

export const {
  useGetTermsConditionsQuery,
  useUpdateTermsConditionMutation,
useGetLawQuery,
useGetAboutQuery,
useUpdateAboutMutation,
useUpdateLawMutation,
  useGetContuctQuery,
  useUpdateContuctMutation,
  useGetprivecyConditionsQuery,
  usePostPrivecyMutation,
} = settingApi;
