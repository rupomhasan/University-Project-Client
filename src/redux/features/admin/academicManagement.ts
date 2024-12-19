
import { TQueryPrams, TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemester: builder.query({
      query: (args) => {

        const params = new URLSearchParams()
        if (args) {

          args?.forEach((item: TQueryPrams) => (params.append(item.name, item.value as string)))
        }
        console.log("args", args)

        return {
          url: "/academic-semester",
          method: "GET",
          params: params
        }
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response.data,
          meta: response.meta
        }
      }
    }),
    addSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semester/create-semester",
        method: "POST",
        body: data
      })
    })
  })
})
export const { useGetAllSemesterQuery, useAddSemesterMutation } = academicManagementApi;