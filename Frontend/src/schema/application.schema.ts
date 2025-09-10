import * as yup from "yup";

export const applicationSchema = yup.object({
  firstName:yup.string().required('First Name is required.'),
  lastName:yup.string().required('Last Name is required.'),
  contactEmail: yup.string().required('Contact Email is required.').email(),
  phoneNumber: yup.string().required('Phone Number is required.'),
  linkedinProfile: yup.string(),
  relevantExperience: yup.string().required('Relevant Experience is required.'),
  coverLetter: yup.string().required('Cover Letter is required.'),
  availability: yup.string().required('Availability is required.'),
  resume:yup.mixed().required("Resume is required")
});
