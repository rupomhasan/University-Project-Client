export type TAcademicSemester = {
  key: string;
  _id: string;
  name: string;
  year: string;
  code: string;
  startMonth: string;
  endMonth: string;
  updatedAt: string;
  _v: string;
}

export type TAcademicDepartment = {
  _id: string
  name: string
  academicFaculty: TAcademicFaculty
  createdAt: string
  updatedAt: string
  __v: number
}

export type TAcademicFaculty = {
  _id: string
  name: string
  createdAt: string
  updatedAt: string
  __v: number
}