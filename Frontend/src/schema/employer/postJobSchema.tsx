import * as yup from 'yup';

export const createJobSchema = yup.object({
  title:yup.string().required('Title required').min(3,'Title must be greater than 3 characters.'),
  companyName:yup.string().required('Company Name required'),
  description:yup.string().required('Description required'),
  location:yup.string().required('Location required'),
  salary:yup.string().required('Salary required'),
  jobType:yup.string(),
  contactEmail:yup.string().required('Contact Email requried'),
  category:yup.string().required('Category required'),
  isFeatured:yup.boolean().default(false)
})