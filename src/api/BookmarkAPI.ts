import { httpDelete, httpGet, httpPost, httpPut } from '../helpers/http'
import { BASE_BACKEND_URL } from './AuthAPI'

const hardCodedtoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhNGVjMWIwNC0zMjZiLTQ1ZmUtYjEyMC0yY2FjZDA2NmU5YWQiLCJlbWFpbCI6ImNoZWVuYTk0c2luZ0BnbWFpbC5jb20iLCJpYXQiOjE2ODg1NjUwMzAsImV4cCI6MTY4ODU5MzgzMH0.8oLqAFpqVraXR4otwtFjNDDg3JluoBNiAF2QLtbJymw'

class BookmarkAPI {
  static getAllBookmark = async (page = 1, limit = 10) => {
    return httpGet(
      `${BASE_BACKEND_URL}/bookmark`,
      {
        Authorization: `Bearer ${hardCodedtoken}/?page=${page}&limit=${limit}`,
      },
      true
    )
  }

  static addBookmark = async ({ link }: { link: string }) => {
    return httpPost(
      `${BASE_BACKEND_URL}/bookmark`,
      {
        Authorization: `Bearer ${hardCodedtoken}`,
      },
      {
        link,
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
