import axios from 'axios'
import axiosRetry from 'axios-retry'
import FileDownload from 'js-file-download'
import { v4 as uuidv4 } from 'uuid'

/**
 * https://stackoverflow.com/questions/25433258/what-is-the-x-request-id-http-header
 * When you're operating a webservice that is accessed by clients, it might be difficult to correlate requests (that a client can see) with server logs (that the server can see).
 *
 * The idea of the X-Request-ID is that a client can create some random ID and pass it to the server. The server then include that ID in every log statement that it creates. If a client receives an error it can include the ID in a bug report, allowing the server operator to look up the corresponding log statements (without having to rely on timestamps, IPs, etc).
 *
 * As this ID is generated (randomly) by the client it does not contain any sensitive information, and should thus not violate the user's privacy. As a unique ID is created per request it does also not help with tracking users.
 * @param {*} headers
 * @param {*} isExternalApi
 * @returns { headers, x-request-id?}
 */
function getHeaders(headers, isExternalApi = false) {
  if (isExternalApi) {
    return headers
  }

  return {
    ...headers,
    'x-request-id': uuidv4(),
  }
}

// If no headers then it will use the default headers. Dont pass {} to headers as it will cause a CORS issue
export const httpGet = async (
  url,
  headers,
  isExternalApi,
  options,
  retries = 1
) => {
  axiosRetry(axios, { retries: retries })
  return axios({
    method: 'get',
    url,
    timeout: 10000,
    headers: getHeaders(headers, isExternalApi),
    options,
    withCredentials: true,
  }).then((response) => {
    return response.data
  })
}

export const httpPost = async (
  url,
  headers,
  data,
  isExternalApi,
  retries = 1
) => {
  axiosRetry(axios, { retries: retries })
  return axios({
    method: 'post',
    url,
    timeout: 10000,
    headers: getHeaders(headers, isExternalApi),
    data,
    withCredentials: true,
  }).then((response) => response.data)
}

export const httpPut = async (url, headers, data, isExternalApi) =>
  axios({
    method: 'put',
    url,
    headers: getHeaders(headers, isExternalApi),
    data,
    withCredentials: true,
  })

export const httpDelete = async (url, headers, isExternalApi) =>
  axios({
    method: 'delete',
    url,
    headers: getHeaders(headers, isExternalApi),
    withCredentials: true,
  })

export const httpPatch = async (url, headers, data, isExternalApi) =>
  axios({
    method: 'patch',
    url,
    headers: getHeaders(headers, isExternalApi),
    data,
    withCredentials: true,
  }).then((response) => response.data)

export const httpDownload = async (url, filename) =>
  axios({
    method: 'get',
    url,
    responseType: 'blob',
    withCredentials: true,
  }).then((response) => {
    FileDownload(response.data, filename)
  })
