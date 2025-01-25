import { baseApi } from "./baseApi";

const admin = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdmin: builder.query({
      query: () => ({
        url: '/user/get-my-profile',
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),

    updateProfilee: builder.mutation({
        query: (data) => {
          return {
            url: "/super-admin/update-profile",
            method: "PATCH",
            body: data,
          };
        },
        invalidatesTags: ["ADMIN"],
      }),

      
      
  }),
});

export const {
 useGetAdminQuery,
 useUpdateProfileeMutation
 
} = admin;
