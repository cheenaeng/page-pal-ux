import { httpDelete, httpGet, httpPost, httpPut } from '../helpers/http'
import { BASE_BACKEND_URL } from './AuthAPI'
class BookmarkAPI {
  static getAllBookmark = async (page = 1, limit = 10) => {
    return httpGet(`${BASE_BACKEND_URL}/bookmark`, {}, true)
  }

  static addBookmark = async ({ link }: { link: string }) => {
    return httpPost(
      `${BASE_BACKEND_URL}/bookmark`,
      {},
      {
        link
      },
      true
    )
  }

  static delBookmark = async ({ id }: { id: string }) => {
    return httpDelete(`${BASE_BACKEND_URL}/bookmark/${id}`, {}, true)
  }

  static changeBookmark = async ({ id }: { id: string }) => {
    return httpPut(`${BASE_BACKEND_URL}/bookmark/${id}`, {}, true)
  }
}

export default BookmarkAPI
