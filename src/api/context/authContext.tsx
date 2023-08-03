import { createContext, useMemo, useState } from "react"
import { IAccessToken } from "../../types/index"

type AuthDataType = {
  accessToken: string
  email: string
  picture: string
  expiresIn: number
  expiresAt: number
  tokenType: string
}

const defaultAuthData: AuthDataType = {
  accessToken: "",
  email: "",
  picture: "",
  expiresIn: 0,
  expiresAt: 0,
  tokenType: "",
}

export function parseTokenFromUrl(urlHash: string): IAccessToken {
  const fragments = urlHash.substring(urlHash.indexOf("#") + 1)
  const params = new URLSearchParams(fragments)

  const token = params.get("access_token")
  const token_type = params.get("token_type")
  const expires_in = Number(params.get("expires_in"))
  const email = params.get("email")
  const picture = params.get("picture")

  const result: IAccessToken = {
    email: email ?? "",
    accessToken: token ?? "",
    expiresIn: expires_in ?? 0,
    expiresAt: expires_in ?? 0,
    tokenType: token_type ?? "",
    picture: picture ?? "",
  }
  return result
}

export function saveTokenFromUrl(hashUrl: string) {
  const parsedToken = parseTokenFromUrl(hashUrl)

  if (parsedToken) {
    const calculatedExpiresAt =
      Number(Math.round(Date.now() / 1000)) + parsedToken.expiresIn
    parsedToken.expiresAt = calculatedExpiresAt
    localStorage.setItem("token", JSON.stringify(parsedToken))
  }
}

export const AuthContext = createContext<{
  authToken: AuthDataType
  setAuthToken: React.Dispatch<React.SetStateAction<IAccessToken>>
}>({
  authToken: defaultAuthData,
  setAuthToken: () => {},
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authToken, setAuthToken] = useState<IAccessToken>({
    accessToken: "",
    email: "",
    picture: "",
    expiresIn: 0,
    expiresAt: 0,
    tokenType: "",
  })

  useMemo(() => {
    const url = window.location.href
    if (url.includes("access_token")) {
      saveTokenFromUrl(url)
      const userData = parseTokenFromUrl(url)
      setAuthToken(userData)
    } else {
      const localStorageTokenRaw = localStorage.getItem("token")
      if (localStorageTokenRaw) {
        // TODO: @sb, add validation + error handling
        const localStorageTokenObj = JSON.parse(localStorageTokenRaw)
        setAuthToken(localStorageTokenObj)
      }
    }
  }, [])

  const authCtx = useMemo(
    () => ({ authToken, setAuthToken }),
    [authToken, setAuthToken],
  )
  return <AuthContext.Provider value={authCtx}>{children}</AuthContext.Provider>
}
