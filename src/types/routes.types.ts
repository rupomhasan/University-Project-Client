import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TAdminSideBarItem = {
  key: string;
  label: ReactNode;
  children?: TAdminSideBarItem[];
};

export type TUserPath = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[]

}

