import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";



export type TUser = {
  id: string,
  role: string,
  iat: number,
  exp: number
}

type TAuthSlice = {
  user: null | TUser;
  token: null | string;
};



const initialState: TAuthSlice = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload.user,
        state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { addUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;