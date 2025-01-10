import { TAcademicSemester } from "./academicManagement.type"

export type TSemesterRegistration = {
  _id: string
  academicSemester: TAcademicSemester
  status: string
  startDate: string
  endDate: string
  minCredit: number
  maxCredit: number
  createdAt: string
  updatedAt: string
}


export type TCourse = {
  _id: string
  title: string
  prefix: string
  code: number
  credits: number
  preRequisiteCourse: TPreRequisiteCourse[]
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}


export type TPreRequisiteCourse = {
  course: TCourse
  isDeleted: boolean
}