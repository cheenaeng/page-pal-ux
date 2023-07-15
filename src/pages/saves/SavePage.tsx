import React, { useEffect } from 'react'
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
  MenuItem
} from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import BookmarkAPI from '../../api/BookmarkAPI'
import { useLocation } from 'react-router-dom'
import { IAccessToken } from '../../types/index'

function parseTokenFromUrlHash(urlHash: string): IAccessToken | null {
  const fragments = urlHash.substring(urlHash.indexOf('#') + 1)
  const params = new URLSearchParams(fragments)
  const result: { [key: string]: any } = {}
  params.forEach((value, key) => {
    if (key === 'expires_in') {
      result[key] = Number(value)
    } else {
      result[key] = value
    }
  })

  return result
}

function parseTokenFromUrlAndStoreInLocalStorage(hashUrl: string) {
  const parsedToken = parseTokenFromUrlHash(hashUrl)

  if (
    parsedToken?.access_token &&
    parsedToken.expires_in &&
    parsedToken.token_type
  ) {
    const calculatedExpiresAt =
      Number(Math.round(Date.now() / 1000)) + parsedToken.expires_in
    parsedToken.expires_at = calculatedExpiresAt
    localStorage.setItem('token', JSON.stringify(parsedToken))
  }
}

function SavePage() {
  const location = useLocation()
  parseTokenFromUrlAndStoreInLocalStorage(location.hash)

  const { data: bookmarks } = useQuery(['getAllBookmark'], () => {
    return BookmarkAPI.getAllBookmark()
  })

  return (
    <Layout>
      {/* card tiles  */}
      <Box
        maxH='80%'
        overflowY={'auto'}
        mx='auto'
        maxWidth={{
          base: '100%',
          '2xl': '80%'
        }}
      >
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Text textStyle='body2Semi' color='brand.main'>
            Articles ({bookmarks?.total_records ?? 0})
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
        <Divider my={4} mx='auto' />
        {/* search bar here  */}
        <CardTiles pages={bookmarks?.data ?? []} />
      </Box>
    </Layout>
  )
}

export default SavePage
