import { TAcademicDepartment, TAcademicFaculty, TAcademicSemester, } from "./academicManagement.type"

export type TStudent = {
  _id: string
  user: TUser
  id: string
  name: TName
  gender: string
  dateOfBirth: string
  contactNo: string
  emergencyContactNo: string
  email: string
  bloodGroup: string
  permanentAddress: string
  presentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg: string
  admissionSemester: TAcademicSemester
  academicDepartment: TAcademicDepartment
  academicFaculty: TAcademicFaculty
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

export type TUser = {
  _id: string
  id: string
  email: string
  needPasswordChange: boolean
  role: string
  status: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export type TName = {
  firstName: string
  middleName: string
  lastName: string
  _id: string
}

export type TGuardian = {
  fatherName: string
  fatherContactNo: string
  fatherOccupation: string
  motherName: string
  motherContactNo: string
  motherOccupation: string
  _id: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  address: string
  _id: string
}


