
import { TQueryPrams, TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
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
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semester/create-semester",
        method: "POST",
        body: data
      })
    }),
    getAcademicFaculty: builder.query({
      query: () => {
        return {
          url: "/academic-faculty",
          method: "GET",
        }
      },

    }),
    getSingleAcademicFaculty: builder.query({
      query: (id) => {
        return {
          url: `/academic-faculty/${id}`,
          method: "GET",

        }
      },

    }),

    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-fa/create-faculty",
        method: "POST",
        body: data
      })
    }),
    getAcademicDepartment: builder.query({
      query: () => {
        return {
          url: "/academic-department",
          method: "GET",
        }
      },

    }),
    addAcademicDepartment: builder.mutation({
      query: (data) => {


        return {
          url: "/academic-department/create-department",
          method: "POST",
          body: data
        }
      }
    }),
  })
})
export const
  {
    useGetAllAcademicSemesterQuery,
    useAddAcademicSemesterMutation,
    useGetAcademicFacultyQuery,
    useAddAcademicFacultyMutation,
    useGetAcademicDepartmentQuery,
    useAddAcademicDepartmentMutation,
    useGetSingleAcademicFacultyQuery
  } = academicManagementApi;