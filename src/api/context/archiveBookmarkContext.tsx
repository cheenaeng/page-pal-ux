import { createContext, useContext, useMemo, useState } from "react"
import { GenericResponseBookmark, IBookmark } from "../../types/saves"
import { useQuery } from "@tanstack/react-query"
import BookmarkAPI from "../BookmarkAPI"
import { AuthContext } from "./authContext"

interface BookmarkDataContextType {
  allData: IBookmark[] | undefined
  refetchData: () => void
}

export const contextData = {
  allData: undefined,
  refetchData: () => void {},
}

export const ArchiveBookmarkContext =
  createContext<BookmarkDataContextType>(contextData)

export const ArchiveBookmarkProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { accessToken } = useContext(AuthContext)
  const [page] = useState(1)
  const [limit] = useState(10)

  const { data: bookmarkData, refetch: refetchBookmarkData } = useQuery(
    ["getAllArchivedBookmark"],
    (): Promise<GenericResponseBookmark> => {
      return BookmarkAPI.getAllArchivedBookmark(page, limit, accessToken ?? "")
    },
  )
  const bookmarkMemoisedData = useMemo(() => {
    return {
      allData: bookmarkData?.data,
      refetchData: () => refetchBookmarkData(),
    }
  }, [bookmarkData?.data, refetchBookmarkData])

  return (
    <ArchiveBookmarkContext.Provider value={bookmarkMemoisedData}>
      {children}
    </ArchiveBookmarkContext.Provider>
  )
}
