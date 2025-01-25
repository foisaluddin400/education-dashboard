import { baseApi } from "./baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
 
     getUserManage: builder.query({
        query: () => {
            return {
                url: '/normal-user/get-normal-users',
                method: 'GET'
            }
        },
        providesTags: ['user']
    }),


 
    blockUser: builder.mutation({
        query: ({ id, status }) => ({
          url: `/user/change-status/${id}`, 
          method: "PATCH",
          body: { status },
        }),
        invalidatesTags: ["user"],
      }),
      

    

    
      
  }),
});

export const {


useGetUserManageQuery,
useBlockUserMutation


 
} = settingApi;
