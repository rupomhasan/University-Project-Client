import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TAdminSideBarItem = {
  key: string | undefined;
  label: ReactNode;
  children?: TAdminSideBarItem[];
} | undefined;

export type TUserPath = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: TUserPath[]

}

