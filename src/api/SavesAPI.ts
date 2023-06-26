import { httpGet } from '../helpers/http'
import BASE_BACKEND_URL from '../constants/backend'

class SavesAPI {
  static getAllSaves = async () => {
    return httpGet(`${BASE_BACKEND_URL}/saves`, {}, true)
  }
}

export default SavesAPI
