import * as yup from "yup";

export const updateJobSchema = yup.object({
  title: yup.string().optional().min(3, "Title must be greater than 3 characters."),
  companyName: yup.string().optional(),
  description: yup.string().optional(),
  location: yup.string().optional(),
  salary: yup.string().optional(),
  jobType: yup.string().optional(),
  contactEmail: yup.string().email("Invalid Email format").optional(),
  category: yup.string().optional(),
  isFeatured: yup.boolean().default(false),
});
