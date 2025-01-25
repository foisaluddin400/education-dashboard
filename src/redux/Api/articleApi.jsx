import { baseApi } from "./baseApi";

const article = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: () => {
        return {
          url: "/article/get-all-article",
          method: "GET",
        };
      },
      providesTags: ["article"],
    }),
    postArticle: builder.mutation({
      query: (data) => {
        return {
          url: "/article/create-article",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["article"],
    }),
    updateArticle: builder.mutation({
      query: ({ formData, id }) => {
        return {
          url: `/article/update-article/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["article"],
    }),

    deleteArticle: builder.mutation({
      query: (id) => {
        return {
          url: `/article/delete-article/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["article"],
    }),

    getSingleArticle: builder.query({
      query: ({ id }) => {
        return {
          url: `/article/single-article/${id}`,
          method: "GET",
        };
      },
      providesTags: ["article"],
    }),



    getTotalArticle: builder.query({
      query: () => {
        return {
          url: '/meta/dashboard-meta-data',
          method: "GET",
        };
      },
      providesTags: ["article"],
    }),




  }),
});

export const {
  useGetSingleArticleQuery,
  useGetArticleQuery,
  useDeleteArticleMutation,
  usePostArticleMutation,
  useUpdateArticleMutation,
  useGetTotalArticleQuery
} = article;
