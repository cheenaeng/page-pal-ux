import React, { useContext, useState, useEffect } from 'react'
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
import { IAccessToken } from '../../types/index'
import { BookmarkContext } from '../../api/context/bookmarkContext'

export function parseTokenFromUrl(urlHash: string): IAccessToken | null {
  const fragments = urlHash.substring(urlHash.indexOf('#') + 1)
  const params = new URLSearchParams(fragments)

  const token = params.get('access_token')
  const token_type = params.get('token_type')
  const expires_in = Number(params.get('expires_in'))
  const email = params.get('email')
  const picture = params.get('picture')

  const result: IAccessToken = {
    email: email ?? '',
    accessToken: token ?? '',
    expiresIn: expires_in ?? '',
    tokenType: token_type ?? '',
    picture: picture ?? '',
  }
  return result
}

export function saveTokenFromUrl(hashUrl: string) {
  const parsedToken = parseTokenFromUrl(hashUrl)

  if (parsedToken) {
    const calculatedExpiresAt =
      Number(Math.round(Date.now() / 1000)) + parsedToken.expiresIn
    parsedToken.expiresAt = calculatedExpiresAt
    localStorage.setItem('token', JSON.stringify(parsedToken))
  }
}

function SavePage() {
  const { allData } = useContext(BookmarkContext)
  return (
    <Layout>
      <Box
        maxH="80%"
        overflowY={'auto'}
        mx="auto"
        maxWidth={{
          base: '100%',
          '2xl': '80%',
        }}
      >
        <Flex justifyContent={'space-between'} alignItems={'center'}>
          <Text textStyle="body2Semi" color="brand.main">
            Articles ({allData?.length ?? 0})
          </Text>
          <Box>
            <Menu>
              <MenuButton
                as={Button}
                fontWeight="bold"
                sx={{ borderRadius: '8px' }}
                aria-label="sort articles"
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
        <Divider my={4} mx="auto" />
        {/* search bar here  */}
        <CardTiles pages={allData} />
      </Box>
    </Layout>
  )
}

export default SavePage
