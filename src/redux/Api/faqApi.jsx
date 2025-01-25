import { baseApi } from "./baseApi";

const faq = baseApi.injectEndpoints({
  endpoints: (builder) => ({
     /** Setting APIs */
     getFaq: builder.query({
        query: () => {
            return {
                url: '/manage/get-faq',
                method: 'GET'
            }
        },
        providesTags: ['terms']
    }),

    addFaq: builder.mutation({
        query: (data) => {
            return {
                url: '/manage/add-faq',
                method: "POST",
                body: data
            }
        }, invalidatesTags: ['faq']
    }),

    getFaqUpdate: builder.mutation({
        query: ({ id, data }) => {
            console.log(id, data)
          return {
            url: `/manage/edit-faq/${id}`,
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["faq"], 
      }),

  
      deleteFaq :  builder.mutation({
        query : (id)=>{
            return {
                url : `/manage/delete-faq/${id}`,
                method : 'DELETE'
            }
        },
        invalidatesTags :['faq']
    }),

    
      
  }),
});

export const {
useAddFaqMutation,
useDeleteFaqMutation,
useGetFaqQuery,
useGetFaqUpdateMutation

 
} = faq;
