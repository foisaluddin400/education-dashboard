import { baseApi } from "./baseApi";

const videos = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getVideos: builder.query({
      query: () => {
        return {
          url: "/video/get-all-videos",
          method: "GET",
        };
      },
      providesTags: ["videos"],
    }),


    getshortVideos: builder.query({
      query: ({ sort }) => {
        return {
          url: `/video/get-all-videos/?sort=${sort}`,
          method: "GET",
        };
      },
      providesTags: ["videos"],
    }),
    

    postVideos: builder.mutation({
      query: (data) => {
        return {
          url: "/video/create-video",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["videos"],
    }),

    updateVideos: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/video/update-video/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["videos"],
    }),

    deleteVideos: builder.mutation({
      query: (id) => {
        return {
          url: `/video/delete-video/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["videos"],
    }),

    getSingleVideos: builder.query({
      query: ({ id }) => {
        return {
          url: `/video/get-single-video/${id}`,
          method: "GET",
        };
      },
      providesTags: ["videos"],
    }),



   

  }),
});

export const {
 useGetVideosQuery,
 usePostVideosMutation,
 useUpdateVideosMutation,
 useDeleteVideosMutation,
 useGetSingleVideosQuery,
 useGetshortVideosQuery
 
} = videos;
