import { httpDelete, httpGet, httpPost, httpPut } from "../helpers/http"
import { BASE_BACKEND_URL } from "./AuthAPI"

class BookmarkAPI {
  static getAllBookmark = async (page = 1, limit = 10, token: string) => {
    return httpGet(
      `${BASE_BACKEND_URL}/bookmark/?page=${page}&limit=${limit}`,
      {
        Authorization: `Bearer ${token}`,
      },
      true,
    )
  }

  static getAllArchivedBookmark = async (
    page = 1,
    limit = 10,
    token: string,
  ) => {
    return httpGet(
      `${BASE_BACKEND_URL}/bookmark/archive?page=${page}&limit=${limit}`,
      {
        Authorization: `Bearer ${token}`,
      },
      true,
    )
  }

  static addBookmark = async ({
    link,
    token,
  }: {
    link: string
    token: string
  }) => {
    return httpPost(
      `${BASE_BACKEND_URL}/bookmark`,
      {
        Authorization: `Bearer ${token}`,
      },
      {
        link,
      },
      true,
    )
  }

  static delBookmark = async ({ id, token }: { id: string; token: string }) => {
    return httpDelete(
      `${BASE_BACKEND_URL}/bookmark/${id}`,
      {
        Authorization: `Bearer ${token}`,
      },
      true,
    )
  }

  static archiveBookmark = async ({
    id,
    token,
  }: {
    id: string
    token: string
  }) => {
    return httpPut(
      `${BASE_BACKEND_URL}/bookmark/${id}`,
      {
        Authorization: `Bearer ${token}`,
      },
      true,
    )
  }
}

export default BookmarkAPI
