import * as yup from "yup";

export const userProfileSchema = yup.object({
  first_name: yup.string(),
  last_name: yup.string(),
  email: yup
    .string()
    .email(`Invalid Email Format.`),
  password: yup
    .string()
});
