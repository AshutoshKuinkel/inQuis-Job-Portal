export interface IApplicationResponse {
  firstName: string;
  lastName: string;
  contactEmail: string;
  phoneNumber: string;
  linkedinProfile: string;
  resume:{
    path:string,
    public_id:string
  };
  relevantExperience: string;
  coverLetter: string;
  availability: string;
}

export interface IApplicationData {
  firstName: string;
  lastName: string;
  contactEmail: string;
  phoneNumber: string;
  linkedinProfile?: string;
  resume:File | FileList,
  relevantExperience: string;
  coverLetter: string;
  availability: string;
}
