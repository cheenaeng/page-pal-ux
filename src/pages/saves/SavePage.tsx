import React from 'react'
import { Layout } from '../../components/Layout'
import { CardTiles } from '../../components/CardTiles'
import { MdSort } from 'react-icons/md'
import { Flex, Text, Box, Icon, Divider } from '@chakra-ui/react'
import { savedPages } from '../../data/mock/saves'

function SavePage() {
  return (
    <Layout>
      {/* <Flex justifyContent={'space-between'}>
        <Box>
          <Text fontSize="lg" as="b">
            Sort
          </Text>
          <Icon as={MdSort} ml="5" />
        </Box>
      </Flex>{' '} */}
      <Divider my={4} />
      {/* card tiles  */}
      <Box
        maxH="80%"
        overflowY={'auto'}
        mx="auto"
        maxWidth={{
          base: '100%',
          xl: '80%',
        }}
      >
        {/* search bar here  */}
        <CardTiles pages={savedPages} />
      </Box>
    </Layout>
  )
}

export default SavePage
