import { baseApi } from "./baseApi";

const feedback = baseApi.injectEndpoints({
  endpoints: (builder) => ({
 
     getFeedback: builder.query({
        query: () => {
            return {
                url: '/feedback/all-feedbacks',
                method: 'GET'
            }
        },
        providesTags: ['feedback']
    }),
    postFeedback: builder.mutation({
        query: (data) => {
            return {
                url: '/feedback/create-feedback',
                method: "POST",
                body: data
            }
        }, invalidatesTags: ['feedback']
    }),


    updateFeedback: builder.mutation({
        query: ({ id, replyMessage }) => ({
          url: `/feedback/reply-feedback/${id}`, 
          method: "PUT",
          body:  {replyMessage }, 
        }),
        invalidatesTags: ["feedback"], 
      }),


      deleteFeedback :  builder.mutation({
        query : (id)=>{
            return {
                url : `/feedback/delete-feedback/${id}`,
                method : 'DELETE'
            }
        },
        invalidatesTags :['feedback']
    }),
  }),
});

export const {
useGetFeedbackQuery,
useUpdateFeedbackMutation,
usePostFeedbackMutation,
useDeleteFeedbackMutation

 
} = feedback;
