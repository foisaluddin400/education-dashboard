import { baseApi } from "./baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
 
     getCategory: builder.query({
        query: () => {
            return {
                url: '/category/all-categories',
                method: 'GET'
            }
        },
        providesTags: ['category']
    }),
    postCategory: builder.mutation({
        query: (data) => {
            return {
                url: '/category/create-category',
                method: "POST",
                body: data
            }
        }, invalidatesTags: ['category']
    }),
    updateCategory: builder.mutation({
        query: ({categoryId, data}) => {
          return {
            url: `/category/update-category/${categoryId}`,
            method: "PATCH",
            body: data
          };
        },
        providesTags: ["category"],
      }),


      deleteCategory :  builder.mutation({
        query : (id)=>{
            return {
                url : `/category/delete-category/${id}`,
                method : 'DELETE'
            }
        },
        invalidatesTags :['category']
    }),
  }),
});

export const {
useGetCategoryQuery,
usePostCategoryMutation,
useUpdateCategoryMutation,
useDeleteCategoryMutation

 
} = settingApi;
