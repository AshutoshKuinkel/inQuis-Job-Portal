import * as yup from "yup";

export const applicationSchema = yup.object({
  firstName: yup.string().required("First Name is required."),
  lastName: yup.string().required("Last Name is required."),
  contactEmail: yup
    .string()
    .required("Contact Email is required.")
    .email("Invalid Email Format"),
  phoneNumber: yup.string().required("Phone Number is required."),
  linkedinProfile: yup.string(),
  relevantExperience: yup.string().required("Relevant Experience is required."),
  coverLetter: yup.string().required("Cover Letter is required."),
  availability: yup.string().required("Availability is required."),
  resume: yup.mixed().required("Resume is required"),
});

export const updateApplicationSchema = yup.object({
  firstName: yup.string().optional(),
  lastName: yup.string().optional(),
  contactEmail: yup.string().email("Invalid Email Format").optional(),
  phoneNumber: yup.string().optional(),
  linkedinProfile: yup.string().optional(),
  relevantExperience: yup.string().optional(),
  coverLetter: yup.string().optional(),
  availability: yup.string().optional(),
  resume: yup.mixed().optional(),
});
