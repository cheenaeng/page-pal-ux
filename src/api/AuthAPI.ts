import { httpGet } from '../helpers/http'
import BackendPath from '../constants/backend'

export const BASE_BACKEND_URL = new BackendPath().getBackendPath()

class AuthAPI {
  static loginWithGoogle = async () => {
    return httpGet(`${BASE_BACKEND_URL}/google`, {}, true)
  }

  static getGoogleLoginUrl = () => {
    return `${BASE_BACKEND_URL}/google`
  }
}

export default AuthAPI
