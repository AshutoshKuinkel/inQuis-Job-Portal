export enum Role {
  ADMIN = "ADMIN",
  EMPLOYER = "EMPLOYER",
  SEEKER = "SEEKER",
}

export const seeker = [Role.SEEKER]
export const employer = [Role.EMPLOYER]
export const admin = [Role.ADMIN]

export const everyone = [...seeker,...employer,...admin]