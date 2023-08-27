import { useContext, useEffect, useState } from 'react'
import { MdSort } from 'react-icons/md'
import { Flex, Text, Box, Divider } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import Pagination from '../../components/Pagination'
import { Layout } from '../../components/Layout'
import { CardTiles } from '../../components/CardTiles'
import { GenericResponseBookmark } from '../../types/saves'
import BookmarkAPI from '../../api/BookmarkAPI'
import { AuthContext } from '../../api/context/authContext'
import { BookmarkChangeContext } from '../../api/context/bookmarkChangeContext'

function SavePage() {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(12) // default 12 doc per page
  const [bookmarkData, setBookmarkData] = useState<GenericResponseBookmark>()
  const { authToken } = useContext(AuthContext)
  const { bookmarkChange } = useContext(BookmarkChangeContext)

  // fetch data on first render
  const { data: fetchedData } = useQuery({
    queryKey: ['getAllBookmark', page, pageSize, bookmarkChange],
    queryFn: (): Promise<GenericResponseBookmark> => {
      return BookmarkAPI.getAllBookmark(
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
          {/* temp commented out till functionality is implemented */}
          {/* <Box>
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
          </Box> */}
        </Flex>

        <Divider my={2} mx='auto' />

        {/* search bar here  */}

        {/* main card tiles */}
        <CardTiles pages={bookmarkData?.data} />

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

export default SavePage
