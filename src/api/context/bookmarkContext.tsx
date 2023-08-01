import { createContext, useContext, useMemo, useState } from "react"
import { GenericResponseBookmark, IBookmark } from "../../types/saves"
import { useQuery } from "@tanstack/react-query"
import BookmarkAPI from "../BookmarkAPI"
import { AuthContext } from "./authContext"

interface BookmarkDataContextType {
  allData: IBookmark[] | undefined
  refetchBookmarkData: () => void
}

export const contextData = {
  allData: undefined,
  refetchBookmarkData: () => void {},
}

export const BookmarkContext =
  createContext<BookmarkDataContextType>(contextData)

export const BookmarkProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { accessToken } = useContext(AuthContext)
  const [page] = useState(1)
  const [limit] = useState(10)

  const { data: bookmarkData, refetch: refetchBookmarkData } = useQuery(
    ["getAllBookmark"],
    (): Promise<GenericResponseBookmark> => {
      return BookmarkAPI.getAllBookmark(page, limit, accessToken ?? "")
    },
  )
  const bookmarkMemoisedData = useMemo(() => {
    return {
      allData: bookmarkData?.data,
      refetchBookmarkData: () => refetchBookmarkData(),
    }
  }, [bookmarkData?.data, refetchBookmarkData])

  return (
    <BookmarkContext.Provider value={bookmarkMemoisedData}>
      {children}
    </BookmarkContext.Provider>
  )
}
