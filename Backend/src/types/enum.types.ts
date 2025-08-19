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

export const seeker = [Role.SEEKER]
export const employer = [Role.EMPLOYER]