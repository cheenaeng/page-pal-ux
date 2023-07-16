export interface IAccessToken {
  accessToken: string
  expiresIn: number
  tokenType: string
  expiresAt?: number
}
