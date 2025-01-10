

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
    getAllCourses: builder.query({
      query: (args) => {

        const params = new URLSearchParams()
        if (args) {

          args?.forEach((item: TQueryPrams) => (params.append(item.name, item.value as string)))
        }


        return {
          url: "/course",
          method: "GET",
          params: params
        }
      },
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta
        }
      }
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/course/create-course",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["courses"]
    }),
    addFacultiesInCourse: builder.mutation({
      query: ({ faculties, courseId }) => {

        console.log(faculties)


        return ({
          url: `/course/${courseId}/assign-faculties`,
          method: "PUT",
          body: { faculties }
        })
      },
      invalidatesTags: ["courses"]
    }),
    addOffered: builder.mutation({
      query: (data) => ({
        url: "/offered-course/create",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["courses"]
    }),
    getCoursesFaculties: builder.query({
      query: (courseId) =>
      ({
        url: `/course/${courseId}/get-faculties`,
        method: "GET",
      }),
      providesTags: ["courses"],
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta
        }
      }
    }),
  })
})
export const
  {
    useAddSemesterRegistrationMutation,
    useGetAllSemesterRegistrationQuery,
    useUpdateSemesterRegistrationStatusMutation,
    useGetAllCoursesQuery,
    useAddFacultiesInCourseMutation,
    useAddCourseMutation,
    useAddOfferedMutation,
    useGetCoursesFacultiesQuery
  } = courseManageMentApi;