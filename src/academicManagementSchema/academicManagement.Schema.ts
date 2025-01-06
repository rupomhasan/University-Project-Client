import { z } from "zod";

export const semesterValidationSchema = z.object({
  name: z.string({ required_error: "Please select a Name" }),
  year: z.string({ required_error: "Please select a Name" }),
  startMonth: z.string({ required_error: "Please select a Name" }),
  endMonth: z.string({ required_error: "Please select a Name" }),
});

export const academicFacultyValidationSchema = z.object({
  name: z.string({ required_error: "Please input academic faculty name " })
})


export const academicDepartmentValidationSchema = z.object({
  name: z.string({ required_error: "Please input academic department name " }),
  academicFaculty: z.string({ required_error: "Please select academic faculty name " })


})

