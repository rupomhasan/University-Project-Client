import { z } from "zod";

export const semesterValidationSchema = z.object({
  name: z.string({ required_error: "Please select a Name" }),
  year: z.string({ required_error: "Please select a Name" }),
  startMonth: z.string({ required_error: "Please select a Name" }),
  endMonth: z.string({ required_error: "Please select a Name" }),
});