import { createContext, useMemo } from "react"
import { parseTokenFromUrl, saveTokenFromUrl } from "../../pages/saves/SavePage"
type AuthDataType = {
  accessToken: string
  email: string
  picture: string
  expiresIn: number
  tokenType: string
}

const allData = {
  accessToken: "",
  email: "",
  picture: "",
  expiresIn: 0,
  tokenType: "",
}

export const AuthContext = createContext<AuthDataType>(allData)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useMemo(() => {
    const url = window.location.href
    if (url.includes("access_token")) {
      saveTokenFromUrl(url)
      const userData = parseTokenFromUrl(url)
      return userData
    }

    const localStorageTokenRaw = localStorage.getItem("token")
    if (localStorageTokenRaw) {
      // TODO: @sb, add validation + error handling
      const localStorageTokenObj = JSON.parse(localStorageTokenRaw)
      return localStorageTokenObj
    }
  }, [])

  const authData = useMemo(() => {
    return {
      accessToken: accessToken.accessToken,
      email: accessToken.email,
      picture: accessToken.picture,
      expiresIn: accessToken.expiresIn,
      tokenType: accessToken.tokenType,
    }
  }, [accessToken])

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  )
}
