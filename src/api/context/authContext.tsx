import { createContext, useMemo } from "react"
import { parseTokenFromUrl, saveTokenFromUrl } from "../../pages/saves/SavePage"
type AuthDataType = {
  accessToken: string | null | undefined
}

const allData = {
  accessToken: "",
}

export const AuthContext = createContext<AuthDataType>(allData)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const accessToken = useMemo(() => {
    const url = window.location.href
    if (url.includes("access_token")) {
      saveTokenFromUrl(url)
      return parseTokenFromUrl(url)?.accessToken
    }

    const localStorageTokenRaw = localStorage.getItem("token")
    if (localStorageTokenRaw) {
      // TODO: @sb, add validation + error handling
      const localStorageTokenObj = JSON.parse(localStorageTokenRaw)
      return localStorageTokenObj.accessToken
    }
  }, [])

  const authData = useMemo(() => {
    return {
      accessToken: accessToken,
    }
  }, [accessToken])

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  )
}
