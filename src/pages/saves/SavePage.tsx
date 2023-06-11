import React from 'react'
import { Layout } from '../../components/Layout'
import { CardTiles } from '../../components/CardTiles'
import { MdSort } from 'react-icons/md'
import { Flex, Text, Box, Icon, Divider } from '@chakra-ui/react'
import { savedPages } from '../../data/mock/saves'

function SavePage() {
  return (
    <Layout>
      <Flex justifyContent={'space-between'}>
        <Text align="start" fontSize="lg" as="b">
          Saves
        </Text>
        <Box>
          <Text fontSize="lg" as="b">
            Sort
          </Text>
          <Icon as={MdSort} ml="5" />
        </Box>
      </Flex>{' '}
      <Divider />
      {/* card tiles  */}
      <Box maxH="75vh" overflowY={'auto'}>
        <CardTiles pages={savedPages} />
      </Box>
    </Layout>
  )
}

export default SavePage
