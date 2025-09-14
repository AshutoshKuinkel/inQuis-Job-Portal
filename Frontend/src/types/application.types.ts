export interface IApplicationResponse {
  _id:string
  firstName:string;
  lastName:string;
  contactEmail:string;
  phoneNumber:string;
  resume:File | FileList
  relevantExperience:string;
  coverLetter:string;
  availability:string;
  status:string;
  createdAt:string;
}

export interface IApplicationData {
  firstName: string;
  lastName: string;
  contactEmail: string;
  phoneNumber: string;
  linkedinProfile?: string;
  resume: File | FileList;
  relevantExperience: string;
  coverLetter: string;
  availability: string;
  createdAt: string;
}
