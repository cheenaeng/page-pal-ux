import React from 'react'
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
import { savedPages } from '../../data/mock/saves'

function SavePage() {
  return (
    <Layout>
      {/* card tiles  */}
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
            Articles ({savedPages.length})
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
        <CardTiles pages={savedPages} />
      </Box>
    </Layout>
  )
}

export default SavePage
