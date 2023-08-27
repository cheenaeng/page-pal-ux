import React, { useContext, useEffect, useMemo, useState } from 'react'
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
import { useQuery } from '@tanstack/react-query'

import { BookmarkContext } from '../../api/context/bookmarkContext'
import Pagination from '../../components/Pagination'
import { Layout } from '../../components/Layout'
import { CardTiles } from '../../components/CardTiles'
import { GenericResponseBookmark } from '../../types/saves'
import BookmarkAPI from '../../api/BookmarkAPI'
import { AuthContext } from '../../api/context/authContext'

function SavePage() {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(12) // default 12 doc per page

  const { authToken } = useContext(AuthContext)
  // const { refetchBookmarkData } = useContext(BookmarkContext)

  // fetch data on first render
  const { data: bookmarkData } = useQuery({
    queryKey: ['getAllBookmark', page, pageSize],
    queryFn: (): Promise<GenericResponseBookmark> => {
      console.log('🚀  useQuery:')
      return BookmarkAPI.getAllBookmark(
        page + 1, // library is 0-index, API is 1-index
        pageSize,
        authToken.accessToken ?? '',
      )
    },
    retry: false,
  })

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
