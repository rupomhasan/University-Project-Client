
import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { addUser, logout } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set("authorization", token)
    }
  }

})

const customBaseQuery: BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args,
    api,
    extraOptions);
  console.log(result)

  if (result?.error?.status === 401) {
    const res = await fetch(`http://localhost:5000/api/v1/auth/refresh-token`, {
      method: "POST",
      credentials: "include"
    })


    const data = await res.json();


    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user

      console.log("res =>", res)
      console.log("data => ", data.data.accessToken)
      api.dispatch(
        addUser({
          user,
          token: data?.data?.accessToken
        })
      )

    }
    else {
      api.dispatch(logout())
    }
    result = await baseQuery(args, api, extraOptions)


  }
  return result


}


export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseQuery,
  endpoints: () => ({})
})