import { useContext, useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Layout } from '../../components/Layout'
import { CardTiles } from '../../components/CardTiles'
import { MdSort } from 'react-icons/md'
import {
  Flex,
  Text,
  Box,
  Divider,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { GenericResponseBookmark } from '../../types/saves'
import Pagination from '../../components/Pagination'
import BookmarkAPI from '../../api/BookmarkAPI'
import { AuthContext } from '../../api/context/authContext'
import { BookmarkChangeContext } from '../../api/context/bookmarkChangeContext'

function ArchivePage() {
  const [bookmarkData, setBookmarkData] = useState<GenericResponseBookmark>()
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(12) // default 12 doc per page

  const { authToken } = useContext(AuthContext)
  const { bookmarkChange } = useContext(BookmarkChangeContext)

  // fetch data on first render
  const { data: fetchedData, isLoading } = useQuery({
    queryKey: ['getAllArchiveBookmark', page, pageSize, bookmarkChange],
    queryFn: (): Promise<GenericResponseBookmark> => {
      return BookmarkAPI.getAllArchivedBookmark(
        page + 1, // library is 0-index, API is 1-index
        pageSize,
        authToken.accessToken ?? '',
      )
    },
    retry: false,
  })

  useEffect(() => {
    if (fetchedData) {
      setBookmarkData(fetchedData)
    }
  }, [fetchedData])

  return (
    <Layout>
      <Box
        maxH='80%'
        mx='auto'
        maxWidth={{
          base: '100%',
          '2xl': '80%',
        }}
      >
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Text textStyle='headerBold' color='brand.main'>
            Articles ({bookmarkData?.total_records || 0})
          </Text>
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                fontWeight='bold'
                sx={{ borderRadius: '8px' }}
                aria-label='sort articles'
                rightIcon={<MdSort />}
              >
                Sort
              </MenuButton>
              <MenuList>
                <MenuItem>By date</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>

        {/* search bar here  */}

        <Divider my={2} mx='auto' />

        {/* main card tiles */}
        <CardTiles pages={bookmarkData?.data} isLoading={isLoading} />

        {/* pagination at footer */}
        <Flex justifyContent={'center'}>
          <Pagination
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            count={bookmarkData?.total_records || 0}
          />
        </Flex>
      </Box>
    </Layout>
  )
}

export default ArchivePage
