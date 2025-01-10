
import { TQueryPrams, TResponseRedux } from "../../../types";
import { TStudent } from "../../../types/userManagement.type";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStudent: builder.query({
      query: (args) => {

        const params = new URLSearchParams()
        if (args) {

          args?.forEach((item: TQueryPrams) => (params.append(item.name, item.value as string)))
        }
        console.log("args", args)

        return {
          url: "/students",
          method: "GET",
          params: params
        }
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta
        }
      }
    }),
    addStudent: builder.mutation({
      query: (data) => ({
        url: "/users/create-student",
        method: "POST",
        body: data
      })
    }),
    updateStudent: builder.mutation({
      query: ({ studentData, id }) => {

        console.log("studentData  : ", studentData)
        console.log("id  : ", id)

        return ({
          url: `students/update-student/${id}`,
          method: "PATCH",
          body: studentData
        })
      }
    }),
    getSingleStudent: builder.query({
      query: (studentId) => ({
        url: `/students/${studentId}`,
        method: "GET",
      })
    }),
    getAllFaculty: builder.query({
      query: (args) => {
        console.log("args : ", args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryPrams) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: '/faculties',
          method: 'GET',
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    getSingleFaculty: builder.query({
      query: (facultyId) => ({
        url: `/faculties/${facultyId}`,
        method: "GET",
      })
    }),
    updateFaculty: builder.mutation({
      query: ({ facultyData, id }) => {


        return ({
          url: `faculties/${id}`,
          method: "PATCH",
          body: facultyData
        })
      }
    }),
    addFaculty: builder.mutation({
      query: (data) => ({
        url: "/users/create-faculty",
        method: "POST",
        body: data
      })
    }),

    getAllAdmin: builder.query({
      query: (args) => {

        const params = new URLSearchParams()
        if (args) {

          args?.forEach((item: TQueryPrams) => (params.append(item.name, item.value as string)))
        }
        console.log("args", args)

        return {
          url: "/admin",
          method: "GET",
          params: params
        }
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta
        }
      }
    }),
    addAdmin: builder.mutation({
      query: (data) => ({
        url: "/users/create-admin",
        method: "POST",
        body: data
      })
    }),

  })
})
export const
  {
    useGetAllStudentQuery,
    useGetSingleStudentQuery,
    useUpdateStudentMutation,
    useAddStudentMutation,
    useGetAllFacultyQuery,
    useGetSingleFacultyQuery,
    useAddFacultyMutation,
    useUpdateFacultyMutation,
    useGetAllAdminQuery,
    useAddAdminMutation
  } = userManagementApi;