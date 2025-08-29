export enum Role{
  SEEKER='SEEKER',
  EMPLOYER='EMPLOYER',
  ADMIN='ADMIN'
}

export enum job_type{
  FULL_TIME = 'Full Time',
  PART_TIME = 'Part Time',
  CASUAL = 'Casual'
}

export enum applicationStatus{
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED'
}

export enum categories{
  Technology = 'Technology',
  Design = 'Design',
  Marketing = 'Marketing',
  Sales = 'Sales',
  Mobile = 'Mobile',
  Security = 'Security',
  Healthcare = 'Healthcare',
  Engineering = 'Engineering'

}

export const seeker = [Role.SEEKER]
export const employer = [Role.EMPLOYER]
export const admin = [Role.ADMIN]

export const everyone = [...seeker,...employer,...admin]