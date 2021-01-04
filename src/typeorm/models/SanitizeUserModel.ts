import { UserRoles } from '../entity/auth/UserRoles'

export interface SanitizeUserModel {
  username: string
  password: string
  roles: UserRoles[]
}
