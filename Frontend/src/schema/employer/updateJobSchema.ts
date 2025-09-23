import * as yup from "yup";

export const updateJobSchema = yup.object({
  title: yup.string().min(3, "Title must be greater than 3 characters."),
  companyName: yup.string(),
  description: yup.string(),
  location: yup.string(),
  salary: yup.string(),
  jobType: yup.string(),
  contactEmail: yup.string().email("Invalid Email format"),
  category: yup.string(),
  isFeatured: yup.boolean().default(false),
});
