
import { TQueryPrams, TResponseRedux, TSemesterRegistration } from "../../../types";

import { baseApi } from "../../api/baseApi";

const courseManageMentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesterRegistration: builder.query({
      query: (args) => {

        const params = new URLSearchParams()
        if (args) {

          args?.forEach((item: TQueryPrams) => (params.append(item.name, item.value as string)))
        }
        console.log("args", args)

        return {
          url: "/semesterRegistration",
          method: "GET",
          params: params
        }
      },
      providesTags: ["semester"],
      transformResponse: (response: TResponseRedux<TSemesterRegistration[]>) => {
        return {
          data: response.data,
          meta: response.meta
        }
      }
    }),
    addSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semesterRegistration/create-semester",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["semester"]
    }),
    updateSemesterRegistrationStatus: builder.mutation({
      query: ({ data, semesterId }) => ({
        url: `/semesterRegistration/${semesterId}`,
        method: "PATCH",
        body: data
      }),
      invalidatesTags: ["semester"]
    }),

  })
})
export const
  {
    useAddSemesterRegistrationMutation,
    useGetAllSemesterRegistrationQuery,
    useUpdateSemesterRegistrationStatusMutation

  } = courseManageMentApi;