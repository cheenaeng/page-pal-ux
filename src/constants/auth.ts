import { IAccessToken } from '../types/index'

export interface AuthI extends IAccessToken {
  getToken: () => string | null
  isTokenValid: () => boolean
}

class Auth implements AuthI {
  accessToken!: string
  expiresIn!: number
  tokenType!: string
  expiresAt!: number

  getToken(): string | null {
    const fetchedToken = localStorage.getItem('token')
    if (fetchedToken) {
      const access_token: string = JSON.parse(fetchedToken).accessToken
      return access_token
    }
    return null
  }

  isTokenValid(): boolean {
    // TODO: implement me
    return true
  }
}

export default Auth
