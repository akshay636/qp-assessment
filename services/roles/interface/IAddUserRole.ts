export interface IAddUserRole {
  userType: string,
  name: string,
  description: string,
  privileges: [string]
}
