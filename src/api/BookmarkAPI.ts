import { httpDelete, httpGet, httpPost, httpPut } from '../helpers/http'
import { BASE_BACKEND_URL } from './AuthAPI'
import Auth from '../constants/auth'
class BookmarkAPI {
  static getAllBookmark = async (page = 1, limit = 10) => {
    return httpGet(
      `${BASE_BACKEND_URL}/bookmark?page=${page}&limit=${limit}`,
      {
        Authorization: `Bearer ${Auth.getAccessToken()}`
      },
      true
    )
  }

  static addBookmark = async ({ link }: { link: string }) => {
    return httpPost(
      `${BASE_BACKEND_URL}/bookmark`,
      {
        Authorization: `Bearer ${Auth.getAccessToken()}`
      },
      {
        link
      },
      true
    )
  }

  static delBookmark = async ({ id }: { id: string }) => {
    return httpDelete(
      `${BASE_BACKEND_URL}/bookmark/${id}`,
      {
        Authorization: `Bearer ${Auth.getAccessToken()}`
      },
      true
    )
  }

  static archiveBookmark = async ({ id }: { id: string }) => {
    return httpPut(
      `${BASE_BACKEND_URL}/bookmark/${id}`,
      {
        Authorization: `Bearer ${Auth.getAccessToken()}`
      },
      true
    )
  }
}

export default BookmarkAPI
